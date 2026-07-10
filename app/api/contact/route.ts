import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { inquiryPayloadSchema, MIN_SUBMIT_TIME_MS } from "@/lib/schemas";
import { sendInquiry } from "@/lib/mail";

/**
 * Contact pipeline (Phase 8 as-built; reconstructed 2026-07-09 after a
 * build-script mishap — behavior per Build Book §4 "ContactForm + pipeline"):
 * - Re-validates with the shared schema; the server never trusts the client.
 * - Honeypot filled or submit under MIN_SUBMIT_TIME_MS → logged, answered
 *   with FAKE success (bots learn nothing).
 * - Rate limit 5/hour/IP, in-memory (upgrade path: Vercel KV/Upstash when
 *   multi-instance) → honest 429.
 * - Delivery failure → honest 502 with request id; UI offers direct email.
 * - Every branch logs with the request id.
 */

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const requestId = randomUUID().slice(0, 8);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    console.warn(`[contact ${requestId}] malformed JSON from ${ip}`);
    return NextResponse.json(
      { ok: false, error: "invalid-payload", requestId },
      { status: 400 }
    );
  }

  const parsed = inquiryPayloadSchema.safeParse(json);
  if (!parsed.success) {
    console.warn(
      `[contact ${requestId}] validation failed from ${ip}:`,
      parsed.error.flatten().fieldErrors
    );
    return NextResponse.json(
      { ok: false, error: "validation", requestId },
      { status: 400 }
    );
  }

  const { website, elapsedMs, ...inquiry } = parsed.data;

  // Quiet spam layers: answer bots with a believable success.
  if (website && website.length > 0) {
    console.warn(`[contact ${requestId}] honeypot filled from ${ip} — dropped`);
    return NextResponse.json({ ok: true, requestId });
  }
  if (elapsedMs < MIN_SUBMIT_TIME_MS) {
    console.warn(
      `[contact ${requestId}] submitted in ${elapsedMs}ms from ${ip} — dropped`
    );
    return NextResponse.json({ ok: true, requestId });
  }

  if (rateLimited(ip)) {
    console.warn(`[contact ${requestId}] rate limit hit from ${ip}`);
    return NextResponse.json(
      { ok: false, error: "rate-limited", requestId },
      { status: 429 }
    );
  }

  const result = await sendInquiry(inquiry);
  if (!result.ok) {
    console.error(`[contact ${requestId}] delivery failed: ${result.error}`);
    return NextResponse.json(
      { ok: false, error: "delivery", requestId },
      { status: 502 }
    );
  }

  console.log(
    `[contact ${requestId}] delivered (provider id: ${result.providerId ?? "n/a"})`
  );
  return NextResponse.json({ ok: true, requestId });
}

import type { Inquiry } from "@/lib/schemas";
import { SERVICES } from "@/lib/services";

/**
 * Mail delivery interface (Phase 8) — thin seam so Resend ↔ client-controlled
 * SMTP is a one-file swap. The standing open item (Build Book §7 item 8) is
 * unresolved, so Resend is configured as the default; if the client requires
 * their own SMTP, only this file changes.
 *
 * Env (documented in .env.example — names only, never values):
 *   RESEND_API_KEY      — Resend secret
 *   CONTACT_TO_EMAIL    — inquiry destination inbox
 *   CONTACT_FROM_EMAIL  — verified sender, e.g. inquiries@<domain>
 */

export type MailResult =
  | { ok: true; providerId?: string }
  | { ok: false; error: string };

function renderPlainText(inquiry: Inquiry): string {
  const serviceTitle =
    SERVICES.find((s) => s.slug === inquiry.service)?.title ?? "Not sure yet";
  return [
    "New inquiry — sankhya website contact form",
    "",
    `Name:         ${inquiry.name}`,
    `Organization: ${inquiry.organization || "—"}`,
    `Email:        ${inquiry.email}`,
    `Interest:     ${serviceTitle}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}

export async function sendInquiry(inquiry: Inquiry): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Local/dev without credentials: log instead of silently dropping,
    // and report failure honestly so the UI offers the direct-email fallback.
    console.warn(
      "[mail] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not set — inquiry NOT delivered:",
      renderPlainText(inquiry)
    );
    return { ok: false, error: "mail-not-configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: inquiry.email,
      subject: `Inquiry — ${inquiry.name}${inquiry.organization ? ` (${inquiry.organization})` : ""}`,
      text: renderPlainText(inquiry),
    });
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true, providerId: data?.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "unknown-mail-error",
    };
  }
}

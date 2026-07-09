import { z } from "zod";
import { SERVICES } from "@/lib/services";

/**
 * Contact inquiry schema (Phase 8) — single source, shared verbatim by the
 * client form and the server route. The server never trusts the client.
 */

const serviceSlugs = ["not-sure", ...SERVICES.map((s) => s.slug)] as [
  string,
  ...string[],
];

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  organization: z
    .string()
    .trim()
    .max(150, "Please keep the organization name under 150 characters.")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Please enter a working email address so we can reply."),
  service: z.enum(serviceSlugs, {
    errorMap: () => ({ message: "Please pick the closest option — “Not sure yet” is fine." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more — a couple of sentences helps us reply usefully.")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type Inquiry = z.infer<typeof inquirySchema>;

/**
 * The wire payload adds two quiet spam signals (Phase 8 §C.3):
 * - `website`: honeypot — real users never see or fill it
 * - `elapsedMs`: time from form mount to submit; bots submit instantly
 */
export const inquiryPayloadSchema = inquirySchema.extend({
  // Accept any string here — a FILLED honeypot must pass validation so the
  // route can answer with a fake success instead of a revealing 400.
  website: z.string().optional(),
  elapsedMs: z.number().int().nonnegative(),
});

export type InquiryPayload = z.infer<typeof inquiryPayloadSchema>;

/** Minimum plausible time (ms) for a human to complete the form */
export const MIN_SUBMIT_TIME_MS = 3000;

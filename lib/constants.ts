/**
 * Site-wide constants. Contact facts confirmed by client 2026-07-09
 * (Build Book §7, open item 6 — resolved). Remaining placeholder:
 * LinkedIn URL (client said skip for now); it's listed in the launch
 * placeholder sweep (Phase 10 §C.4).
 */

export const SITE_NAME = "Sankhya AI";

/** Production domain unknown until Phase 10 fill-in. Env-driven. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const CONTACT = {
  email: "info@sankhyai.com",
  emailIsPlaceholder: false,
  phone: "+977-9856077413",
  phoneIsPlaceholder: false,
  city: "Putalisadak, Kathmandu, Nepal",
  /** [PLACEHOLDER] — LinkedIn URL pending; footer hides the link while empty */
  linkedin: "",
} as const;

/** Legal entity name for the copyright line (confirmed 2026-07-09) */
export const LEGAL_ENTITY = "Sankhya AI";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

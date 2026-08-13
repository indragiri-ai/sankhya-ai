/**
 * UPDATES CONTENT MODEL (2026-08-13) — the only source of homepage update
 * copy. Added for the "Our latest updates" section modelled on
 * Fuse_machine.txt §4.
 *
 * Evidence status: Sankhya has no blog, insights site, or press archive yet,
 * so there is nothing real to list. The entries below are [SAMPLE] shapes so
 * the section can be reviewed with the rest of the page, following the same
 * convention as lib/cases.ts. They are plausible *kinds* of update for this
 * company, not claims about anything that happened.
 *
 * Before launch, one of two things must happen:
 *   1. Replace these with real posts and point `href` at where they live, or
 *   2. Set SHOW_LATEST_UPDATES = false in lib/flags.ts and the section
 *      disappears cleanly.
 * The Phase 10 placeholder grep will keep flagging this file until then.
 */

export type Update = {
  slug: string;
  /** Small tag above the title: "Blog", "Article", "Note", "Event" */
  category: string;
  title: string;
  /** ISO date — formatted for display at render, never hand-typed twice */
  date: string;
  /** Where the card goes. External links open in a new tab. */
  href: string;
  /** Optional cover photograph under /public; falls back to a generated cover */
  image?: string;
};

/** [SAMPLE] — replace with real posts, or switch the section off. */
export const UPDATES: Update[] = [
  {
    slug: "sample-what-your-data-can-support",
    category: "[SAMPLE] Blog",
    title:
      "Before you buy AI, find out what your data can actually support",
    date: "2026-07-28",
    href: "/contact",
  },
  {
    slug: "sample-field-research-to-pipeline",
    category: "[SAMPLE] Article",
    title:
      "From questionnaire to pipeline: keeping field data clean between the two",
    date: "2026-07-02",
    href: "/approach",
  },
  {
    slug: "sample-ai-literacy-nepal",
    category: "[SAMPLE] Note",
    title:
      "What we learned running AI literacy sessions for Nepali institutions",
    date: "2026-06-14",
    href: "/about",
  },
];

/** "14 JUNE 2026" — the reference sets dates small, uppercase and muted. */
export function formatUpdateDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

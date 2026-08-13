/**
 * Evidence gates (Phase 4 / Phase 7).
 *
 * Sections that exist purely to carry proof render only when real,
 * defensible facts have been supplied. Each flag flips to `true` the day
 * the corresponding fill-in arrives — the components are already built
 * and drop in with no further work (Build Book §5, re-insertion plan).
 */

/** Phase 4 — credibility strip. ON since 2026-07-09: client supplied four real partner names (Variant A). */
export const SHOW_CRED_STRIP = true;

/** Phase 7 — outcomes section. ON for full-site preview with [SAMPLE] cases (lib/cases.ts); real facts still owed before launch. */
export const SHOW_OUTCOMES = true;

/** Phase 7 — institutions marks row. ON for full-site preview with [SAMPLE] marks; real certifications still owed before launch. */
export const SHOW_INSTITUTION_MARKS = true;

/**
 * "Our latest updates" (2026-08-13). OFF since 2026-08-13: the section was
 * built and reviewed, but its entries are [SAMPLE] (lib/updates.ts) and this
 * site is published to a public URL — the cards rendered "[SAMPLE] BLOG" to
 * anyone holding the link. There is no blog yet, and a section advertising
 * thinking the company has not published is worse than no section.
 *
 * Re-insertion plan: put real posts in lib/updates.ts and flip this to true.
 * The component (components/home/LatestUpdates.tsx) is finished and still
 * mounted on the homepage; it renders nothing while this is false.
 */
export const SHOW_LATEST_UPDATES = false;

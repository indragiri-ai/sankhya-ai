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
 * "Our latest updates" (2026-08-13). ON for preview with [SAMPLE] entries
 * (lib/updates.ts). There is no blog yet — a section advertising thinking
 * the company has not published is worse than no section, so this goes OFF
 * at launch unless real posts exist by then.
 */
export const SHOW_LATEST_UPDATES = true;

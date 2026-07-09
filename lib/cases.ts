/**
 * CASE STUDY CONTENT MODEL (Phase 7) — the only source of outcome evidence.
 *
 * Evidence gate outcome: ZERO real case studies provided → `CASES` is empty
 * and the Outcomes section is feature-flagged off (lib/flags.ts). The type
 * below enforces the evidence rules at build time:
 *  - `basis` is mandatory on every metric: a number without a stated
 *    measurement basis is a type error, so it can never render.
 *  - `anonymized` is explicit: anonymization is stated, never hidden.
 *
 * Re-insertion plan: when the first defensible case arrives, add it here,
 * flip SHOW_OUTCOMES in lib/flags.ts, and the homepage slot fills itself.
 */

export type CaseMetric = {
  /** The figure, e.g. 96 (renders via Counter, mono tabular) */
  value: number;
  /** e.g. "%", "hrs", "×" — rendered after the figure */
  unit: string;
  /** Plain label, e.g. "reduction in reporting time" */
  label: string;
  /** MANDATORY: how it was measured, e.g. "measured over Q1 2026" */
  basis: string;
};

export type CaseStudy = {
  slug: string;
  /** Real name (with permission) or honest anonymization, e.g. "A national commercial bank" */
  client: string;
  anonymized: boolean;
  sector: string;
  /** The problem, one sentence */
  problem: string;
  /** What was built, one sentence */
  built: string;
  metrics: CaseMetric[];
  quote?: { text: string; attribution: string };
};

/**
 * [PLACEHOLDER] — SAMPLE CASES FOR FULL-SITE PREVIEW ONLY (2026-07-09).
 * The client asked to see every section rendered with dummy content while
 * their real project document is prepared. Every figure below is invented
 * illustrative shape, marked [SAMPLE] where it renders. MUST be replaced
 * with facts from the client's project document before launch — the Phase 10
 * placeholder grep will catch this file until then.
 */
export const CASES: CaseStudy[] = [
  {
    slug: "sample-analytics-bank",
    client: "[SAMPLE] A national commercial bank",
    anonymized: true,
    sector: "Banking — sample entry for preview",
    problem:
      "Branch performance reporting was compiled by hand from dozens of spreadsheets every month, arriving too late to act on.",
    built:
      "A central reporting warehouse with automated dashboards covering every branch, refreshed daily instead of monthly.",
    metrics: [
      {
        value: 85,
        unit: "%",
        label: "reduction in report preparation time",
        basis: "[SAMPLE] illustrative figure — replace with measured value",
      },
      {
        value: 40,
        unit: "+",
        label: "branches on one live dashboard",
        basis: "[SAMPLE] illustrative figure — replace with measured value",
      },
    ],
  },
  {
    slug: "sample-ai-integration-logistics",
    client: "[SAMPLE] A logistics and distribution company",
    anonymized: true,
    sector: "Logistics — sample entry for preview",
    problem:
      "Routine order-status inquiries consumed most of the support team's day, and answers depended on who picked up the phone.",
    built:
      "An AI assistant integrated into the existing order system, answering routine inquiries directly and escalating the rest.",
    metrics: [
      {
        value: 70,
        unit: "%",
        label: "of routine inquiries resolved without staff",
        basis: "[SAMPLE] illustrative figure — replace with measured value",
      },
    ],
  },
  {
    slug: "sample-data-engineering-public",
    client: "[SAMPLE] A public-sector services office",
    anonymized: true,
    sector: "Public sector — sample entry for preview",
    problem:
      "Records lived in disconnected spreadsheets across departments; answering a citizen's question meant searching several of them.",
    built:
      "A unified database with clean intake pipelines, so every department reads and writes one consistent record.",
    metrics: [
      {
        value: 12,
        unit: "×",
        label: "faster record retrieval",
        basis: "[SAMPLE] illustrative figure — replace with measured value",
      },
    ],
  },
];

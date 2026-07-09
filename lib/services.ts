/**
 * SERVICE CONTENT MODEL (Phase 5) — the only source of service copy in the
 * codebase. Homepage cards, /services sections, footer links, the contact
 * form's service-interest select, and structured data all read from here.
 * No service string may be duplicated in a component.
 *
 * Copy status: capability-honest (what we do), not track-record (what we've
 * done) — no client examples were supplied, so `examples` arrays are empty
 * rather than invented (Phase 5 §C.2).
 */

export type Service = {
  /** Mono index 01–05 — fixed pillar order, used site-wide */
  index: string;
  slug: string;
  title: string;
  /** Card body, ≤ 20 words */
  oneLiner: string;
  /** 2–3 sentences, rendered on /services */
  body: string;
  /** Real delivered examples only — empty until fill-ins arrive */
  examples: string[];
};

export const SERVICES: Service[] = [
  {
    index: "01",
    slug: "data-analytics",
    title: "Data Analytics",
    oneLiner:
      "Dashboards, reporting, and forecasting that turn the data you already have into decisions you can defend.",
    body: "Most organizations collect more data than they use. We build the reporting layer that closes that gap: dashboards people actually open, forecasts with stated assumptions, and metrics defined precisely enough to argue about. You receive working analytics on your own data — not a slide deck about analytics.",
    examples: [],
  },
  {
    index: "02",
    slug: "ai-solutions",
    title: "AI Solutions",
    oneLiner:
      "Custom models built for one specific problem in your organization — scoped, tested, and measured against it.",
    body: "We build applied AI for named problems: classification, prediction, document processing, language tasks. Every engagement starts by defining what the model must do and how its accuracy will be measured. You receive a working system with its evaluation results, not a proof of concept that dies in a folder.",
    examples: [],
  },
  {
    index: "03",
    slug: "data-engineering",
    title: "Database & Data Engineering",
    oneLiner:
      "The pipelines, warehouses, and data models underneath — built so everything above them stops breaking.",
    body: "Analytics and AI fail quietly when the data underneath is unreliable. We design and build that foundation: database architecture, ingestion pipelines, warehousing, and the documentation to run it all. You receive infrastructure your own team can operate, with every schema and job written down.",
    examples: [],
  },
  {
    index: "04",
    slug: "ai-assessment",
    title: "AI Assessment",
    oneLiner:
      "An honest audit of your data and readiness, ending in a ranked list of what is worth building.",
    body: "Before spending on AI, find out what your data can actually support. We audit your systems, data quality, and workflows, then map the opportunities against cost and risk. You receive a written report with a ranked list — including, where it is the honest answer, the recommendation to build nothing yet.",
    examples: [],
  },
  {
    index: "05",
    slug: "ai-integration",
    title: "AI Integration",
    oneLiner:
      "AI embedded into the tools and workflows your teams already use — with the training to run it.",
    body: "A model that lives outside your daily tools does not get used. We integrate AI into the systems your organization already runs — existing databases, internal tools, office workflows — and train the people who will work with it. You receive a running integration and the handover documentation to keep it running.",
    examples: [],
  },
];

/** Contact-form select options: the five slugs plus an honest escape hatch */
export const SERVICE_INTEREST_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

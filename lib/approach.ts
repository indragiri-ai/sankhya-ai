/**
 * METHOD CONTENT MODEL (Phase 6) — the only source of method copy in the
 * codebase. The homepage ApproachSequence and /approach both read from here.
 *
 * The five-step sequence is the blueprint's working version — the founder
 * fill-in (Phase 6 §B) has not arrived, so step names, order, and
 * deliverables are [PLACEHOLDER — verify against how Sankhya actually works].
 * Entry-point framing: written neutrally (clients can enter at any step)
 * until the fill-in decides otherwise.
 */

export type ApproachStep = {
  index: string;
  slug: string;
  title: string;
  /** ≤ 14 words, active voice */
  verbLine: string;
  /** ≤ 8 words — the concrete artifact the client receives */
  deliverable: string;
  /** 2–3 sentences, rendered on /approach */
  body: string;
};

export const APPROACH_STEPS: ApproachStep[] = [
  {
    index: "01",
    slug: "assess",
    title: "Assess",
    verbLine: "Audit your data, systems, and readiness before anything gets built.",
    deliverable: "ranked opportunity report",
    body: "Every recommendation starts with evidence. We examine your data sources, their quality, the systems that hold them, and the decisions they are supposed to serve. The output is a written report that ranks opportunities by value and feasibility — honest enough to say when the answer is not yet.",
  },
  {
    index: "02",
    slug: "architect",
    title: "Architect",
    verbLine: "Design the target system: data models, pipelines, and model choices.",
    deliverable: "build plan others could execute",
    body: "Before code, a design: data models, pipeline architecture, technology choices, and the reasoning behind each. The plan is written so that any competent engineering team could execute it — including one that is not us. That is deliberate; it keeps the design honest.",
  },
  {
    index: "03",
    slug: "build",
    title: "Build",
    verbLine: "Engineer the pipelines, dashboards, models, and integrations to the plan.",
    deliverable: "working, documented system",
    body: "The engineering itself: pipelines that run on schedule, dashboards wired to live data, models trained and evaluated against the criteria set in the plan. Everything ships with documentation as it is built, not reconstructed afterward.",
  },
  {
    index: "04",
    slug: "integrate",
    title: "Integrate",
    verbLine: "Embed the system into the tools and workflows you already run.",
    deliverable: "running integration, trained team",
    body: "A system that sits beside your workflows gets abandoned; one inside them gets used. We connect what we built to the tools your organization already operates and train the people who will use and maintain it, with written handover material.",
  },
  {
    index: "05",
    slug: "operate",
    title: "Operate",
    verbLine: "Monitor, maintain, and improve the system after it ships.",
    deliverable: "monitoring and maintenance record",
    body: "Data systems drift: sources change, volumes grow, models age. We stay to watch for that — monitoring, maintenance, and periodic review against the original success criteria. It is the step most vendors omit, which is why we name it in the method.",
  },
];

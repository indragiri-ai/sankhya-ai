import type { Metadata } from "next";
import { APPROACH_STEPS } from "@/lib/approach";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { CtaBand } from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Assess, architect, build, integrate, operate — Sankhya AI's five-step method, each step ending in a named deliverable.",
};

/**
 * /approach (Phase 9) — the five steps from lib/approach.ts expanded.
 * The homepage's scroll-linked progress line is NOT reprised here: a static
 * left rule serves the reading experience at zero ScrollTrigger cost
 * (decision recorded — implementation cost, not appetite).
 */
export default function ApproachPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] pb-[var(--s-24)] md:pb-[var(--s-32)]">
        <PageHeader
          eyebrow="Approach"
          title="One method, five deliverables."
          lead="Every step ends in an artifact you keep — a report, a plan, a running system. Engagements can enter at any step."
        />

        <div className="px-[var(--s-6)]">
          <ol className="flex flex-col gap-[var(--s-16)] border-l border-rule pl-[var(--s-8)] md:pl-[var(--s-12)]">
          {APPROACH_STEPS.map((step) => (
            <li key={step.slug} id={step.slug} className="relative">
              <span
                aria-hidden="true"
                className="absolute left-[calc(-1*var(--s-8)-4px)] top-[8px] block h-[7px] w-[7px] bg-violet md:left-[calc(-1*var(--s-12)-4px)]"
              />
              <Reveal step={0}>
                <p className="text-index text-ember-text">{step.index}</p>
                <h2 className="text-h2 mt-[var(--s-4)] text-violet">{step.title}</h2>
                <p className="text-body-lg measure-lead mt-[var(--s-4)] text-grey-600">
                  {step.body}
                </p>
                <p className="mt-[var(--s-6)] border-t border-rule pt-[var(--s-3)] font-mono text-small text-grey-600">
                  You receive: {step.deliverable}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
      <CtaBand heading="Start with the assessment." />
    </>
  );
}

import type { Metadata } from "next";
import { APPROACH_STEPS } from "@/lib/approach";
import { Reveal } from "@/components/motion/Reveal";
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
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-24)] pt-[calc(var(--nav-h)+var(--s-16))] md:pb-[var(--s-32)]">
        <Reveal step={0}>
          <p className="text-eyebrow text-grey-600">Approach</p>
        </Reveal>
        <Reveal step={1}>
          <h1 className="text-h1 mt-[var(--s-4)] max-w-[20ch] text-ink">
            One method, five deliverables.
          </h1>
        </Reveal>
        <Reveal step={2}>
          <p className="text-body-lg measure mt-[var(--s-4)] text-grey-600">
            Every step ends in an artifact you keep — a report, a plan, a
            running system. Engagements can enter at any step.
          </p>
        </Reveal>

        <ol className="mt-[var(--s-24)] flex flex-col gap-[var(--s-16)] border-l border-grey-200 pl-[var(--s-8)] md:pl-[var(--s-12)]">
          {APPROACH_STEPS.map((step) => (
            <li key={step.slug} id={step.slug} className="relative">
              <span
                aria-hidden="true"
                className="absolute left-[calc(-1*var(--s-8)-5px)] top-[8px] block h-[9px] w-[9px] rounded-full bg-violet md:left-[calc(-1*var(--s-12)-5px)]"
              />
              <Reveal step={0}>
                <p className="text-figure text-small text-grey-400">{step.index}</p>
                <h2 className="text-h2 mt-[var(--s-2)] text-ink">{step.title}</h2>
                <p className="text-body-lg measure mt-[var(--s-4)] text-grey-600">
                  {step.body}
                </p>
                <p className="mt-[var(--s-4)] font-mono text-small text-grey-600">
                  <span aria-hidden="true">→ </span>
                  You receive: {step.deliverable}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
      <CtaBand heading="Start with the assessment." />
    </>
  );
}

import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { CtaBand } from "@/components/site/CtaBand";
import { MissionVision } from "@/components/site/MissionVision";
import { TeamGrid } from "@/components/about/TeamGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sankhya AI — a data and AI company based in Nepal, named for the ancient school of systematic enumeration.",
};

/**
 * /about (Phase 9; amended 2026-07-09) — type-led. The original standing
 * law (no placeholder avatars) was relaxed on client request for a
 * full-site preview: TeamGrid renders 6 members + 4 advisors with dummy
 * names and geometric portrait marks until real names/photos arrive.
 * Founding story is [SAMPLE COPY] awaiting the founder's real account.
 */
export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] pb-[var(--s-24)] md:pb-[var(--s-32)]">
        <PageHeader eyebrow="About" title="A data company with an old name." />

        {/* Founding story — [PLACEHOLDER] sample copy for full-site preview;
            replace with the founder's real account, edited for craft. */}
        <Reveal step={2}>
          <div className="max-w-[68ch] px-[var(--s-6)]">
            <p className="text-eyebrow border-t border-rule pt-[var(--s-4)] text-grey-600">
              How it started
            </p>
            <p className="text-body-lg mt-[var(--s-6)] text-ink">
              [SAMPLE COPY] Sankhya AI was founded in Kathmandu by a small
              team who kept meeting the same problem in different rooms:
              organizations rich in records and poor in answers. Reports took
              weeks, decisions took longer, and the data that could have
              settled an argument sat unread in a spreadsheet.
            </p>
            <p className="text-body mt-[var(--s-4)] text-grey-600">
              [SAMPLE COPY] We started the company to close that gap —
              building the systems that turn what an organization already
              knows into something it can act on, and doing it here, in
              Nepal, to an international standard.
            </p>
          </div>
        </Reveal>

        {/* The name, told in full — the Phase 4 band grows into a passage */}
        <section className="mt-[var(--s-24)] grid grid-cols-1 items-start gap-[var(--s-12)] px-[var(--s-6)] md:grid-cols-2">
          <Reveal step={0}>
            <p className="devanagari text-[clamp(4rem,8vw,7rem)] leading-[1.15] text-violet">
              <span lang="sa" aria-hidden="true">
                संख्या
              </span>
              <span className="sr-only">Sankhya</span>
            </p>
          </Reveal>
          <div className="flex flex-col gap-[var(--s-4)]">
            <Reveal step={1}>
              <p className="text-eyebrow text-grey-600">The name</p>
            </Reveal>
            <Reveal step={2}>
              <p className="text-body-lg measure text-ink">
                Sankhya (संख्या) means “number.” The method the name points
                to is old and simple: understand the world by counting and
                categorizing it — list what exists, order it, reason from
                the inventory.
              </p>
            </Reveal>
            <Reveal step={3}>
              <p className="text-body-lg measure text-grey-600">
                That is a fair description of data work. A company in Nepal
                building research, analytics, and AI systems claims that
                discipline deliberately: measure first, conclude second.
                The name is a standard to be held to.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Team + advisors — dummy entries until real names/photos arrive */}
        <TeamGrid />

        {/* Location — concrete, not aspirational */}
        <Reveal step={0} className="mt-[var(--s-24)]">
          <p className="text-body-lg measure text-grey-600">
            We are based in Kathmandu and work with organizations in Nepal —
            businesses, institutions, and the public sector — as well as
            international clients. Being local matters here: the data,
            the systems, and the constraints are ours too.
          </p>
        </Reveal>
      </div>

      {/* Mission & vision — shared component with the homepage;
          [DRAFT] copy pending the re-uploaded company profile deck */}
      <MissionVision />

      <CtaBand />
    </>
  );
}

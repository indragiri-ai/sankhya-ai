import { Reveal } from "@/components/motion/Reveal";
import { ArrowButton, GhostButton } from "@/components/site/Buttons";
import { StatsRow } from "@/components/home/StatsBand";
import { HeroViz } from "@/components/home/HeroViz";

/**
 * Hero (rebuilt 2026-08-13, third pass — the reference pass).
 *
 * Built against the category rather than from taste. Fusemachines opens on a
 * deep field with a node-and-edge constellation, a coloured eyebrow, a very
 * heavy sans headline, a short bold subhead, and a pill CTA with a circled
 * arrow; C3.ai and Scale run the same dark-field-and-heavy-type structure.
 * That is what this now is, in Sankhya's own violet and ember rather than
 * Fusemachines' navy and yellow.
 *
 * What changed from the previous attempt:
 *   - The plot panel is gone. It was a nice idea and it read as a chart
 *     pinned to a slide, not as a hero.
 *   - The headline is a heavy grotesque, not a light serif, and it is the
 *     largest thing on the page by a wide margin.
 *   - Copy is tighter. The reference set runs 15-20px body against a 56px+
 *     headline; the contrast is the point.
 */
export function Hero() {
  return (
    <section
      data-surface="dark"
      className="relative isolate overflow-hidden bg-violet-deep"
    >
      {/* Constellation, full-bleed behind everything */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-90">
        <HeroViz />
      </div>
      {/* Depth: brand violet lifting from the lower left, ink at the edges,
          so the headline always has a dark field under it */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 80% at 12% 88%, rgb(52 0 111 / 0.75) 0%, transparent 62%), linear-gradient(90deg, rgb(20 8 46 / 0.92) 0%, rgb(20 8 46 / 0.35) 55%, rgb(20 8 46 / 0.75) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-8)] pt-[calc(var(--nav-h)+var(--s-12))] md:pb-[var(--s-12)] md:pt-[calc(var(--nav-h)+var(--s-16))]">
        <div className="max-w-[52rem]">
          <Reveal step={0}>
            <p className="text-eyebrow text-ember">Your Intelligence Partner</p>
          </Reveal>

          <Reveal step={1}>
            <h1 className="text-hero mt-[var(--s-4)] text-bone">
              Turn what you can count into what you can decide.
            </h1>
          </Reveal>

          <Reveal step={2}>
            <p className="text-body-lg mt-[var(--s-6)] max-w-[46ch] text-bone/70">
              Sankhya AI is a research and data company in Kathmandu. Field
              research, data engineering, and applied AI — one team, from the
              questionnaire to the system that runs on the answers.
            </p>
          </Reveal>

          <Reveal step={3}>
            <div className="mt-[var(--s-8)] flex flex-wrap items-center gap-[var(--s-4)]">
              <ArrowButton href="/contact">Start your AI journey</ArrowButton>
              <GhostButton href="/services" onDark>
                Explore our services
              </GhostButton>
            </div>
          </Reveal>
        </div>

        {/* Proof, above the fold */}
        <div className="mt-[var(--s-12)] border-t border-bone/12 pt-[var(--s-6)] md:mt-[var(--s-16)]">
          <StatsRow startStep={4} onDark />
        </div>
      </div>
    </section>
  );
}

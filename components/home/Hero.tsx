import { Reveal } from "@/components/motion/Reveal";
import { ArrowButton, GhostButton } from "@/components/site/Buttons";
import { StatsRow } from "@/components/home/StatsBand";
import { HeroViz } from "@/components/home/HeroViz";

/**
 * Hero (fourth pass, 2026-08-13 — Fusemachines reference, see Fuse_machine.txt).
 *
 * The previous pass took the register from the reference (dark field, heavy
 * grotesque, pill CTA) but kept a left-aligned column. The reference hero is
 * axially centered on a full-bleed background: eyebrow in the accent, one
 * very heavy headline, one bold subtitle, one pill CTA. That symmetry is what
 * makes it read as a front door rather than a page of copy, so this now
 * matches it — in Sankhya's violet and ember rather than navy and yellow.
 *
 * Structural parity with the spec:
 *   eyebrow (accent) → headline (heaviest thing on the page) → bold subtitle
 *   → primary pill CTA. Everything centered, over a dark full-bleed field.
 *
 * Two deliberate departures:
 *   - Fusemachines backs this with an mp4. We have no footage, and a stock
 *     loop would cheapen it, so the constellation stays as the moving field.
 *     Drop a video in later and it takes the same layer.
 *   - The reference runs a single CTA and no proof in the fold. Fusemachines
 *     is a known name; Sankhya is not. One muted line of description and the
 *     5/3/6 figures stay, because an unknown company has to say what it is.
 */
export function Hero() {
  return (
    // min-h is 86svh, not the 92 first tried: the reference hero fills the
    // fold, but at 92svh the figures below the rule were pushed off every
    // laptop screen. 86 still reads as a full-height front door and keeps the
    // numbers in view on a ~800px viewport.
    <section
      data-surface="dark"
      className="relative isolate flex min-h-[min(86svh,820px)] items-center overflow-hidden bg-violet-deep"
    >
      {/* Constellation, full-bleed behind everything */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-90">
        <HeroViz />
      </div>
      {/* Depth. Centered copy needs a centered scrim: brand violet lifting from
          below, ink closing in at every edge, so the headline sits on its own
          dark field wherever the constellation happens to be bright. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 100%, rgb(52 0 111 / 0.72) 0%, transparent 66%), radial-gradient(70% 60% at 50% 45%, rgb(20 8 46 / 0.72) 0%, rgb(20 8 46 / 0.34) 55%, rgb(20 8 46 / 0.86) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-[var(--s-6)] pb-[var(--s-12)] pt-[calc(var(--nav-h)+var(--s-12))] md:pb-[var(--s-16)] md:pt-[calc(var(--nav-h)+var(--s-16))]">
        <div className="mx-auto flex max-w-[56rem] flex-col items-center text-center">
          <Reveal step={0}>
            <p className="text-eyebrow text-ember">Your Intelligence Partner</p>
          </Reveal>

          <Reveal step={1}>
            <h1 className="text-hero mt-[var(--s-4)] text-bone">
              Turn what you can count into what you can decide.
            </h1>
          </Reveal>

          {/* The reference's bold subtitle line — the one-breath statement of
              what the company sells, set heavy and white directly under the
              headline rather than folded into body copy. */}
          <Reveal step={2}>
            <p className="text-h3 mt-[var(--s-4)] font-[600] text-bone">
              Field research · Data engineering · Applied AI
            </p>
          </Reveal>

          <Reveal step={3}>
            <p className="text-body mt-[var(--s-4)] max-w-[52ch] text-bone/65">
              A research and data company in Kathmandu — one team, from the
              questionnaire to the system that runs on the answers.
            </p>
          </Reveal>

          <Reveal step={4}>
            <div className="mt-[var(--s-8)] flex flex-wrap items-center justify-center gap-[var(--s-4)]">
              <ArrowButton href="/contact">Start your AI journey</ArrowButton>
              <GhostButton href="/services" onDark>
                Explore our services
              </GhostButton>
            </div>
          </Reveal>
        </div>

        {/* Proof, at the bottom of the fold. Centered to sit under the axis
            rather than fighting it, and held to a narrower measure than the
            container so three figures do not spread across 1200px. */}
        <div className="mx-auto mt-[var(--s-12)] max-w-[46rem] border-t border-bone/12 pt-[var(--s-6)]">
          <StatsRow startStep={5} onDark centered />
        </div>
      </div>
    </section>
  );
}

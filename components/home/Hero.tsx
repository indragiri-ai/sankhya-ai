import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, OutlineButton } from "@/components/site/Buttons";
import { StatsRow } from "@/components/home/StatsBand";
import { HeroViz } from "@/components/home/HeroViz";

/**
 * Hero (rebuilt 2026-08-13, second pass).
 *
 * The previous two attempts both failed the same test: no visual. The first
 * had a gradient and a particle field that read as a crypto template; the
 * second stripped those out and put a wordmark in their place, which is
 * typography, not a hero.
 *
 * Checked against the category before rebuilding — Fractal, C3.ai and Scale
 * AI all open on a dark full-bleed panel, very large light type, and a real
 * graphic. That convention exists because it works for enterprise buyers, so
 * this follows it, with two deliberate differences:
 *
 *   - The dark is --violet-deep, the brand's own colour, not the generic
 *     near-black every AI site uses. It is recognisably Sankhya at a glance.
 *   - The graphic is a plot rather than an abstract field. The company sells
 *     measurement; a scatter with a fitted trend says that literally, and it
 *     is honest about being illustrative (see HeroViz — no numbers, no
 *     units, no implied dataset).
 *
 * The fold carries the headline, the visual, the 5/3/6 figures and the
 * partner logos. Nothing about this company's credibility is below it.
 */
export function Hero() {
  return (
    <section data-surface="dark" className="relative overflow-hidden bg-violet-deep">
      {/* A single soft lift behind the plot. One gradient, no glow, no
          particles — enough to give the panel depth without the template
          look the first version had. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 70% at 78% 38%, rgb(52 0 111 / 0.85) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-8)] pt-[calc(var(--nav-h)+var(--s-8))] md:pb-[var(--s-12)] md:pt-[calc(var(--nav-h)+var(--s-12))]">
        <div className="grid grid-cols-1 items-center gap-[var(--s-8)] lg:grid-cols-12 lg:gap-[var(--s-12)]">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal step={0}>
              <div className="flex items-center gap-[var(--s-3)]">
                <span aria-hidden="true" className="tick" />
                <span className="text-eyebrow text-bone/60">Your Intelligence Partner</span>
              </div>
            </Reveal>

            <Reveal step={1}>
              <h1 className="text-hero mt-[var(--s-6)] text-bone">
                Decisions, made <em>measurable</em>.
              </h1>
            </Reveal>

            <Reveal step={2}>
              <p className="text-body-lg measure-lead mt-[var(--s-6)] text-bone/75">
                Sankhya AI is a research and data company in Kathmandu. We run
                field research, build analytics, and apply AI so organizations
                in Nepal can decide from evidence.
              </p>
            </Reveal>

            <Reveal step={3}>
              <div className="mt-[var(--s-8)] flex flex-wrap items-center gap-[var(--s-4)]">
                <PrimaryButton href="/contact" onDark>
                  Start a conversation
                </PrimaryButton>
                <OutlineButton href="/services" onDark>
                  Explore our services
                </OutlineButton>
              </div>
            </Reveal>
          </div>

          {/* The panel */}
          <div className="lg:col-span-5">
            <Reveal step={2}>
              <figure className="border border-bone/15 bg-bone/[0.04] p-[var(--s-6)] text-bone backdrop-blur-[2px]">
                <HeroViz />
                <figcaption className="mt-[var(--s-4)] flex items-center gap-[var(--s-3)] border-t border-bone/15 pt-[var(--s-3)] font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-bone/50">
                  <span aria-hidden="true" className="h-[6px] w-[6px] flex-none bg-ember" />
                  Measure first, conclude second
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* Proof bar — figures and partners, both above the fold. */}
        <div className="mt-[var(--s-12)] border-t border-bone/15 pt-[var(--s-6)]">
          <StatsRow startStep={4} onDark />
        </div>
      </div>
    </section>
  );
}

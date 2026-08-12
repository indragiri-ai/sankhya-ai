import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, SecondaryLink } from "@/components/site/Buttons";
import { StatsRow } from "@/components/home/StatsBand";

/**
 * Hero (rebuilt 2026-08-13).
 *
 * The 2026-08-12 version removed the gradient and the particle canvas for
 * good reasons and then put nothing in their place: 714px tall, 26% text
 * coverage, no visual element of any kind. Restraint only reads as
 * confidence when what remains is worth looking at; an empty hero reads as
 * unfinished.
 *
 * Two things fix it, and neither needs an asset the client hasn't supplied:
 *
 *  1. संख्या becomes the visual anchor. The brand's own Devanagari, set very
 *     large in violet and bled off the right edge of its panel, is a stronger
 *     and more ownable image than any stock photograph. It also states the
 *     company's whole thesis — the name means "number" — before a word of
 *     copy is read. If real photography arrives later it drops into this
 *     same right-hand panel.
 *
 *  2. The fold fills with proof instead of air. The 5/3/6 figures moved up
 *     from their old position 03, and the partner logos now sit directly
 *     under the hero rather than below the fold. World Vision, Kathmandu
 *     University, Nepal Bank and Pitt are the most persuasive thing on this
 *     site and a visitor should not have to scroll to find them.
 */
export function Hero() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-12)] pt-[calc(var(--nav-h)+var(--s-8))] md:pb-[var(--s-16)] md:pt-[calc(var(--nav-h)+var(--s-12))]">
        <Reveal step={0}>
          <div className="flex items-center gap-[var(--s-3)] border-t border-rule-strong pt-[var(--s-3)]">
            <span className="text-index text-ember-text">01</span>
            <span className="text-eyebrow text-grey-600">Your Intelligence Partner</span>
          </div>
        </Reveal>

        <div className="mt-[var(--s-8)] grid grid-cols-1 items-center gap-[var(--s-8)] lg:grid-cols-12 lg:gap-[var(--s-12)]">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal step={1}>
              <h1 className="text-display text-violet">
                Decisions, made <em>measurable</em>.
              </h1>
            </Reveal>

            <Reveal step={2}>
              <p className="text-body-lg measure-lead mt-[var(--s-6)] text-grey-600">
                Sankhya AI is a research and data company in Kathmandu. We run
                field research, build analytics, and apply AI so organizations
                in Nepal can decide from evidence.
              </p>
            </Reveal>

            <Reveal step={3}>
              <div className="mt-[var(--s-8)] flex flex-wrap items-center gap-x-[var(--s-8)] gap-y-[var(--s-4)]">
                <PrimaryButton href="/contact">Start a conversation</PrimaryButton>
                <SecondaryLink href="/services">Explore our services</SecondaryLink>
              </div>
            </Reveal>
          </div>

          {/* The mark. Cropped deliberately: a letterform running off its own
              panel reads as a printed cover rather than a centred logo, and
              the overflow is clipped so it can never cause a scrollbar. */}
          <div className="lg:col-span-5">
            <Reveal step={2}>
              <div className="relative overflow-hidden border-l-2 border-ember py-[var(--s-6)] pl-[var(--s-6)]">
                <p
                  aria-hidden="true"
                  className="devanagari select-none whitespace-nowrap text-[clamp(4.5rem,13vw,7.5rem)] leading-[1.1] text-violet"
                >
                  संख्या
                </p>
                <p className="text-small mt-[var(--s-3)] max-w-[26ch] text-grey-600">
                  <span className="font-mono text-ember-text">sankhya</span>{" "}
                  &mdash; Sanskrit for <em className="not-italic text-ink">number</em>: the
                  discipline of counting, ordering, and reasoning from what is
                  counted.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Proof, above the fold. */}
        <div className="mt-[var(--s-12)] md:mt-[var(--s-16)]">
          <StatsRow startStep={4} />
        </div>
      </div>
    </section>
  );
}

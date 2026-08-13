"use client";

import { useState } from "react";
import { APPROACH_STEPS } from "@/lib/approach";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ApproachSequence — "How we work" (rebuilt 2026-08-13, third pass).
 *
 * What this replaces: five equal columns on a pale grey band, under a
 * hairline that a GSAP ScrollTrigger scrubbed left-to-right as you passed.
 * The scrub was the only thing moving, you could not interact with it, and
 * five columns of small text on near-white read like a printed table — the
 * least premium block on the page.
 *
 * This version:
 *   - Sits on the deep violet field. Dark surfaces are what the reference
 *     set uses when it wants a block to feel considered, and it gives the
 *     page a second dark beat between the hero and the footer.
 *   - Is actually interactive. The five steps are buttons; the selected one
 *     expands to show what the step does and what you receive at the end of
 *     it. Hover selects too, so the section responds before you commit to a
 *     click, and the numeral of the active step is drawn very large behind
 *     the panel.
 *   - Has no GSAP. The scrub bought one animation for a ScrollTrigger
 *     instance, a plugin registration and a cleanup path; a progress rail
 *     tied to the selected index does the same job in CSS and now means
 *     something the reader controls.
 *
 * Keyboard: the steps are real buttons in a list, so tab and enter work
 * without any key handling of our own. Hover-to-select is layered on top of
 * click-to-select rather than replacing it, so nothing depends on a pointer.
 */
export function ApproachSequence() {
  const [active, setActive] = useState(0);
  const step = APPROACH_STEPS[active];

  return (
    <section data-surface="dark" className="bg-violet-deep">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] section-pad">
        <SectionHeading
          onDark
          eyebrow="How we work"
          title="One method, run in the open" /* [PLACEHOLDER — verify] */
          lead="Five steps, each ending in something you can hold. Engagements can enter at any step."
        />

        <div className="mt-[var(--heading-gap)] grid gap-[var(--s-8)] lg:grid-cols-12 lg:gap-[var(--s-16)]">
          {/* The rail. Each step is a button; the active one is marked by an
              ember bar in the gutter rather than a fill, so the list stays
              quiet until you touch it. */}
          <ol className="lg:col-span-5">
            {APPROACH_STEPS.map((s, i) => {
              const on = i === active;
              return (
                <Reveal as="li" key={s.slug} step={i}>
                  <button
                    type="button"
                    aria-current={on ? "step" : undefined}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-baseline gap-[var(--s-4)] border-t border-bone/12 py-[var(--s-4)] text-left"
                  >
                    {/* Gutter marker: 2px ember bar that grows in on select */}
                    <span
                      aria-hidden="true"
                      className={`mt-[0.4em] block h-[2px] flex-none bg-ember transition-[width,opacity] duration-[var(--dur-fast)] ease-[var(--ease-out)] motion-reduce:transition-none ${
                        on ? "w-[var(--s-8)] opacity-100" : "w-[var(--s-3)] opacity-40"
                      }`}
                    />
                    <span
                      className={`text-index transition-colors duration-[var(--dur-fast)] ${
                        on ? "text-ember" : "text-bone/45"
                      }`}
                    >
                      {s.index}
                    </span>
                    <span
                      className={`text-h2 transition-colors duration-[var(--dur-fast)] ${
                        on ? "text-bone" : "text-bone/55 group-hover:text-bone/80"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                </Reveal>
              );
            })}
            <li aria-hidden="true" className="border-t border-bone/12" />
          </ol>

          {/* The panel. Keyed on the slug so React remounts it and the
              entrance animation replays on every change — without the key it
              would swap text in place and the section would feel inert. */}
          <div className="relative lg:col-span-7">
            {/* Ghost numeral. Decorative; hidden from assistive tech since
                the rail already announces the step number. It is parked in
                the panel's top-right and the copy below is held to a measure
                that stops short of it — at full width the paragraph ran
                under the glyph and the two fought each other. */}
            <span
              aria-hidden="true"
              className="text-figure pointer-events-none absolute -top-[0.18em] right-0 hidden select-none text-[7rem] leading-none text-bone/[0.07] md:block md:text-[9rem]"
            >
              {step.index}
            </span>

            <div
              key={step.slug}
              className="relative animate-in fade-in slide-in-from-bottom-2 duration-[var(--dur-base)] motion-reduce:animate-none"
            >
              <p className="text-quote max-w-[26ch] text-bone">
                {step.verbLine}
              </p>
              <p className="text-body mt-[var(--s-6)] max-w-[46ch] text-bone/70">
                {step.body}
              </p>

              <div className="mt-[var(--s-8)] border-t border-bone/12 pt-[var(--s-4)]">
                <p className="text-eyebrow text-bone/45">You receive</p>
                <p className="text-body mt-[var(--s-2)] font-mono text-ember">
                  {step.deliverable}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, SecondaryLink } from "@/components/site/Buttons";
import { CONTACT } from "@/lib/constants";

/**
 * Hero (Editorial Institute, 2026-08-12).
 *
 * Three things were deliberately removed from the previous version:
 *   - the violet→ink radial gradient,
 *   - the BinduField particle canvas,
 *   - the full-ember second line of the headline.
 * Together they read as a generic SaaS landing page and worked against the
 * client list sitting directly beneath them. What replaces them is nothing:
 * a light paper field, a rule, and the headline set in the display serif at
 * a size the old bold grotesque could never have carried without shouting.
 *
 * The hero is no longer a dark full-bleed surface, so the nav rides light on
 * every route from first paint — Nav.tsx's dark-hero mode was removed with
 * this change rather than left switched off.
 *
 * Height is content-driven rather than 100svh: an editorial page should show
 * the reader that it continues below, and a forced viewport-height hero on a
 * laptop pushed the credibility strip off-screen.
 */
export function Hero() {
  return (
    <section className="relative bg-bone">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-24)] pt-[calc(var(--nav-h)+var(--s-16))] md:pb-[var(--s-32)] md:pt-[calc(var(--nav-h)+var(--s-24))]">
        {/* Index line: the document's opening mark */}
        <Reveal step={0}>
          <div className="flex items-center gap-[var(--s-3)] border-t border-rule-strong pt-[var(--s-4)]">
            <span className="text-index text-ember-text">01</span>
            <span className="text-eyebrow text-grey-600">Your Intelligence Partner</span>
          </div>
        </Reveal>

        <div className="mt-[var(--s-12)] grid grid-cols-1 gap-[var(--s-12)] lg:grid-cols-12 lg:gap-[var(--s-8)]">
          <div className="lg:col-span-8">
            <Reveal step={1}>
              {/* One emphasis, and it is the serif italic rather than a block
                  of ember. The accent colour is reserved for the tick. */}
              <h1 className="text-display text-violet">
                Decisions, made <em>measurable</em>.
              </h1>
            </Reveal>

            <Reveal step={2}>
              <p className="text-body-lg measure-lead mt-[var(--s-8)] text-grey-600">
                Sankhya AI is a research and data company in Kathmandu. We run
                field research, build analytics, and apply AI so organizations
                in Nepal — and the institutions that work here — can decide
                from evidence.
              </p>
            </Reveal>

            <Reveal step={3}>
              <div className="mt-[var(--s-12)] flex flex-wrap items-center gap-x-[var(--s-8)] gap-y-[var(--s-4)]">
                <PrimaryButton href="/contact">Start a conversation</PrimaryButton>
                <SecondaryLink href="/services">Explore our services</SecondaryLink>
              </div>
            </Reveal>
          </div>

          {/* The right rail carries the one piece of hard information a first
              time visitor needs: what this company actually is, and how to
              reach a human. Set small, in mono, like a masthead. */}
          <div className="lg:col-span-4 lg:pl-[var(--s-8)]">
            <Reveal step={4}>
              <div className="border-t border-rule pt-[var(--s-4)] lg:border-l lg:border-t-0 lg:pl-[var(--s-8)] lg:pt-0">
                <span aria-hidden="true" className="tick mb-[var(--s-6)]" />
                <dl className="flex flex-col gap-[var(--s-6)]">
                  <div>
                    <dt className="text-eyebrow text-grey-600">Based in</dt>
                    <dd className="mt-[var(--s-2)] font-mono text-small text-ink">
                      {CONTACT.city}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-grey-600">Practice</dt>
                    <dd className="mt-[var(--s-2)] text-small text-ink">
                      Field research · Data engineering · Applied AI
                    </dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-grey-600">Enquiries</dt>
                    <dd className="mt-[var(--s-2)]">
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="link-sweep font-mono text-small text-ember-text"
                      >
                        {CONTACT.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

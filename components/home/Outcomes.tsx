import { CASES } from "@/lib/cases";
import { SHOW_OUTCOMES } from "@/lib/flags";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";

/**
 * Outcomes (Phase 7) — evidence gate outcome: ZERO case studies provided,
 * so this section is feature-flagged OFF (lib/flags.ts) and renders nothing.
 * The component is complete: when the first real case lands in lib/cases.ts,
 * flip SHOW_OUTCOMES and the slot fills itself (re-insertion plan).
 *
 * Evidence rules enforced here:
 *  - metrics render with their `basis` line visibly (small, --grey-400) —
 *    visible methodology is the trust signal; `basis` is type-mandatory.
 *  - one ember-highlighted figure maximum across the whole section
 *    (the first metric of the featured case).
 *  - anonymization is stated in words, never a blurred logo.
 */
export function Outcomes() {
  if (!SHOW_OUTCOMES || CASES.length === 0) return null;

  const [featured, ...rest] = CASES;
  const compact = rest.slice(0, 2);

  return (
    <section className="border-t border-grey-200">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
        <SectionHeading eyebrow="Outcome" title="Measured, not claimed" />

        <Reveal className="mt-[var(--s-12)]">
          <article className="rounded-[var(--r-md)] border border-grey-200 bg-surface p-[var(--s-8)]">
            <p className="text-h3 text-ink">{featured.client}</p>
            <p className="mt-[var(--s-1)] text-small text-grey-400">{featured.sector}</p>
            <p className="mt-[var(--s-4)] text-body measure text-grey-600">{featured.problem}</p>
            <p className="mt-[var(--s-2)] text-body measure text-grey-600">{featured.built}</p>

            <dl className="mt-[var(--s-8)] flex flex-wrap gap-[var(--s-12)]">
              {featured.metrics.map((m, i) => (
                <div key={m.label}>
                  <dd
                    className={`text-figure text-[2.5rem] ${i === 0 ? "text-ember" : "text-ink"}`}
                  >
                    <Counter value={m.value} suffix={m.unit} />
                  </dd>
                  <dt className="mt-[var(--s-1)] text-small text-grey-600">{m.label}</dt>
                  <p className="mt-[var(--s-1)] text-small text-grey-400">{m.basis}</p>
                </div>
              ))}
            </dl>

            {featured.quote ? (
              <blockquote className="mt-[var(--s-8)] border-t border-grey-200 pt-[var(--s-6)]">
                <p className="text-h3 text-ink">“{featured.quote.text}”</p>
                <footer className="mt-[var(--s-3)] font-mono text-small text-grey-600">
                  {featured.quote.attribution}
                </footer>
              </blockquote>
            ) : null}
          </article>
        </Reveal>

        {compact.length > 0 ? (
          <div className="mt-[var(--s-6)] grid gap-[var(--s-6)] md:grid-cols-2">
            {compact.map((c, i) => (
              <Reveal key={c.slug} step={i + 1}>
                <article className="h-full rounded-[var(--r-md)] border border-grey-200 bg-surface p-[var(--s-6)]">
                  <p className="text-h3 text-ink">{c.client}</p>
                  <p className="mt-[var(--s-2)] text-body text-grey-600">{c.problem}</p>
                  <dl className="mt-[var(--s-6)] flex flex-wrap gap-[var(--s-8)]">
                    {c.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <dd className="text-figure text-[1.75rem] text-ink">
                          {m.value}
                          {m.unit}
                        </dd>
                        <dt className="text-small text-grey-600">{m.label}</dt>
                        <p className="text-small text-grey-400">{m.basis}</p>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

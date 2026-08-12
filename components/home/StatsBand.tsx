import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

/**
 * StatsBand (new 2026-07-10) — the numbers section, split out of the hero
 * at the client's request. Figures supplied verbatim by the client in chat
 * (2026-07-10): 5 completed projects, 3 ongoing projects, 6 institutions
 * collaborated & partnered. Update here only — no other section shows them.
 * Counters tick up on first viewport entry (components/motion/Counter).
 */

const STATS = [
  { value: 5, label: "Projects completed" },
  { value: 3, label: "Projects ongoing" },
  { value: 6, label: "Institutions collaborated & partnered" },
];

export function StatsBand() {
  return (
    <section aria-label="Sankhya AI in numbers" className="bg-bone">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)]">
        {/* Numbered 03 so the home page's index runs contiguously: the
            reader should never see a gap in the sequence. */}
        <Reveal step={0}>
          <div className="mb-[var(--s-16)] flex items-center gap-[var(--s-3)] border-t border-rule-strong pt-[var(--s-4)]">
            <span className="text-index text-ember-text">03</span>
            <span className="text-eyebrow text-grey-600">By the numbers</span>
          </div>
        </Reveal>

        {/* Each figure sits in its own ruled column, like a statistical
            appendix. The rule is the divider — no card, no fill, no shadow. */}
        <dl className="grid grid-cols-1 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              step={i + 1}
              className="flex flex-col border-t border-rule-strong pt-[var(--s-6)] sm:pr-[var(--s-8)]"
            >
              <dd className="text-figure text-[clamp(3.25rem,7vw,4.5rem)] font-[400] leading-none text-violet">
                <Counter value={s.value} />
              </dd>
              <dt className="text-small mt-[var(--s-4)] max-w-[22ch] text-grey-600">
                {s.label}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

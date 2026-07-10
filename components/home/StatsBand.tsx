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
    <section
      aria-label="Sankhya AI in numbers"
      className="border-y border-grey-200 bg-surface"
    >
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-16)]">
        <dl className="grid grid-cols-1 gap-[var(--s-12)] sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              step={i}
              className="flex flex-col items-center gap-[var(--s-2)] text-center sm:items-start sm:text-left"
            >
              <dd className="text-figure text-[clamp(3rem,6vw,4.5rem)] leading-none text-violet">
                <Counter value={s.value} />
              </dd>
              <dt className="text-body text-grey-600">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

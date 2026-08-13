import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The numbers. Figures supplied verbatim by the client in chat (2026-07-10):
 * 5 completed projects, 3 ongoing projects, 6 institutions collaborated &
 * partnered. Update here only — no other component holds these values.
 * Counters tick up on first viewport entry (components/motion/Counter).
 *
 * 2026-08-13: this stopped being its own full-width section and moved into
 * the hero. It sat at position 03, a long scroll down, while being the
 * hardest proof on the page — and the hero needed content more than the
 * middle of the page did. What remains here is a bare row with no section
 * padding of its own, so the hero controls its own rhythm.
 */

const STATS = [
  { value: 5, label: "Projects completed" },
  { value: 3, label: "Projects ongoing" },
  { value: 6, label: "Institutions partnered" },
];

export function StatsRow({
  startStep = 0,
  onDark = false,
  centered = false,
}: {
  startStep?: number;
  /** the hero is a dark surface as of 2026-08-13 */
  onDark?: boolean;
  /** the hero is axially centered as of the Fusemachines pass — match it */
  centered?: boolean;
}) {
  return (
    <dl className="grid grid-cols-3 gap-x-[var(--s-4)] sm:gap-x-[var(--s-8)]">
      {STATS.map((s, i) => (
        <Reveal
          key={s.label}
          step={startStep + i}
          className={`flex flex-col ${centered ? "items-center text-center" : ""}`}
        >
          <dd
            className={`text-figure text-[clamp(1.75rem,4vw,2.5rem)] font-[400] leading-none ${
              onDark ? "text-bone" : "text-violet"
            }`}
          >
            <Counter value={s.value} />
          </dd>
          <dt
            className={`text-small mt-[var(--s-2)] max-w-[18ch] ${
              onDark ? "text-bone/60" : "text-grey-600"
            }`}
          >
            {s.label}
          </dt>
        </Reveal>
      ))}
    </dl>
  );
}

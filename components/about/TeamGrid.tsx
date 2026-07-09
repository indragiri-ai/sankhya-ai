import { Reveal } from "@/components/motion/Reveal";
import { asset } from "@/lib/asset";
import { SectionHeading } from "@/components/site/SectionHeading";

/**
 * TeamGrid (About page, added 2026-07-09 on client request) — 6 team
 * members + 4 advisors/mentors.
 *
 * [PLACEHOLDER] — every name and bio line below is dummy content for the
 * full-site preview. The client will supply real names, roles, and photos;
 * until then each card renders a token-true geometric portrait mark (violet
 * ring + ember bindu, rotated per index — same family as app/icon.svg), NOT
 * a fake photo. When real photos arrive, drop them in /public/team and set
 * `photo` on each entry.
 */

type Person = {
  name: string;
  role: string;
  /** path under /public/team once the real photo arrives; null → geometric mark */
  photo: string | null;
};

// [PLACEHOLDER] — dummy names; replace with real people, keep order = seniority.
const TEAM: Person[] = [
  { name: "[Full Name]", role: "Founder & Chief Executive", photo: null },
  { name: "[Full Name]", role: "Co-founder & Technical Lead", photo: null },
  { name: "[Full Name]", role: "Lead Data Engineer", photo: null },
  { name: "[Full Name]", role: "Machine Learning Engineer", photo: null },
  { name: "[Full Name]", role: "Data Analyst", photo: null },
  { name: "[Full Name]", role: "Product & Operations", photo: null },
];

// [PLACEHOLDER] — dummy advisor entries; replace with real names + one-line affiliations.
const ADVISORS: Person[] = [
  { name: "[Full Name]", role: "Advisor — Data & AI", photo: null },
  { name: "[Full Name]", role: "Advisor — Banking & Finance", photo: null },
  { name: "[Full Name]", role: "Academic Mentor", photo: null },
  { name: "[Full Name]", role: "Advisor — Public Sector", photo: null },
];

/** Geometric stand-in portrait: violet ring, ember bindu rotated per index. */
function PortraitMark({ index }: { index: number }) {
  const angle = (index * 36) % 360;
  return (
    <div className="aspect-square w-full overflow-hidden rounded-[var(--r-md)] border border-grey-200 bg-surface">
      <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
        <circle
          cx="48"
          cy="48"
          r="26"
          fill="none"
          stroke="var(--violet)"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <g transform={`rotate(${angle} 48 48)`}>
          <circle cx="48" cy="22" r="4" fill="var(--ember)" />
        </g>
        <text
          x="48"
          y="86"
          textAnchor="middle"
          fontSize="8"
          fill="var(--grey-400)"
          fontFamily="var(--font-geist-mono)"
        >
          {String(index + 1).padStart(2, "0")}
        </text>
      </svg>
    </div>
  );
}

function PersonCard({
  person,
  index,
  step,
}: {
  person: Person;
  index: number;
  step: number;
}) {
  return (
    <Reveal as="li" step={step}>
      {person.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(person.photo)}
          alt={person.name}
          className="aspect-square w-full rounded-[var(--r-md)] border border-grey-200 object-cover"
        />
      ) : (
        <PortraitMark index={index} />
      )}
      <p className="mt-[var(--s-3)] text-body font-[500] text-ink">
        {person.name}
      </p>
      <p className="mt-[var(--s-1)] text-small text-grey-600">{person.role}</p>
    </Reveal>
  );
}

export function TeamGrid() {
  return (
    <section className="mt-[var(--s-24)]" aria-label="Team">
      <SectionHeading
        eyebrow="Team"
        title="The people doing the counting" /* [PLACEHOLDER — verify] */
      />
      <ul className="mt-[var(--s-12)] grid grid-cols-2 gap-x-[var(--s-6)] gap-y-[var(--s-8)] sm:grid-cols-3">
        {TEAM.map((p, i) => (
          <PersonCard key={`team-${i}`} person={p} index={i} step={i} />
        ))}
      </ul>

      <p className="mt-[var(--s-16)] text-eyebrow text-grey-600">
        Advisors &amp; mentors
      </p>
      <ul className="mt-[var(--s-6)] grid grid-cols-2 gap-x-[var(--s-6)] gap-y-[var(--s-8)] sm:grid-cols-4">
        {ADVISORS.map((p, i) => (
          <PersonCard
            key={`advisor-${i}`}
            person={p}
            index={i + TEAM.length}
            step={i}
          />
        ))}
      </ul>
    </section>
  );
}

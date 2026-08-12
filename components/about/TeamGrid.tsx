import { Reveal } from "@/components/motion/Reveal";
import { asset } from "@/lib/asset";
import { SectionHeading } from "@/components/site/SectionHeading";

/**
 * TeamGrid (About page) — real profiles since 2026-07-10, from the client's
 * Team_profile.docx (edited for length; every credential as supplied).
 * Photos pending: cards render a token-true geometric mark until the client
 * uploads photos to /public/team (then set `photo` per entry).
 * Advisors section awaits the re-uploaded company profile deck —
 * [PLACEHOLDER] entries until then.
 */

type Person = {
  name: string;
  role: string;
  credential: string;
  affiliation: string;
  /** path under /public/team once the real photo arrives; null → geometric mark */
  photo: string | null;
};

const TEAM: Person[] = [
  {
    name: "Bishu Giri",
    role: "Public Policy & Data Analytics",
    credential: "MS Public Policy & Data Analytics, Carnegie Mellon University",
    affiliation: "Consultant, World Bank — Washington, DC",
    photo: null,
  },
  {
    name: "Dr. Ram Narayan Shrestha",
    role: "Economist & Research Specialist",
    credential: "PhD Economics, South Asian University",
    affiliation: "Sankhya — formerly UNDP, ILO, IWMI",
    photo: null,
  },
  {
    name: "Indra Giri",
    role: "Data Analyst & Research Lead",
    credential: "MA Economics, South Asian University",
    affiliation: "Sankhya — formerly World Vision International",
    photo: null,
  },
  {
    name: "Dr. Krishna Sharma",
    role: "Economist & Policy Analyst",
    credential: "PhD Economics, Clemson University",
    affiliation: "Postdoctoral Fellow, Hoover Institution, Stanford",
    photo: null,
  },
  {
    name: "Dr. Praval Sharma",
    role: "Computer Scientist — NLP & Data Mining",
    credential: "PhD Computer Science, University of Nebraska–Lincoln",
    affiliation: "University of Nebraska at Omaha",
    photo: null,
  },
  {
    name: "Sumit Sharma",
    role: "Economist & Data Analytics",
    credential: "Economics, Delhi School of Economics",
    affiliation: "ICICI Bank — formerly EY, Capgemini",
    photo: null,
  },
];

// [PLACEHOLDER] — advisors/mentors arrive with the re-uploaded company
// profile deck; dummy entries hidden until then.
const ADVISORS: Person[] = [];

/** Geometric stand-in portrait: violet ring, ember bindu rotated per index.
 *  Near-square corners as of the 2026-08-12 redesign — see --r-* in
 *  globals.css; the site no longer rounds anything meaningfully. */
function PortraitMark({ index }: { index: number }) {
  const angle = (index * 36) % 360;
  return (
    <div className="aspect-square w-full overflow-hidden rounded-[var(--r-sm)] border border-rule bg-paper-2">
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
          className="aspect-square w-full rounded-[var(--r-sm)] border border-rule object-cover"
        />
      ) : (
        <PortraitMark index={index} />
      )}
      <p className="mt-[var(--s-4)] border-t border-rule pt-[var(--s-3)] text-body font-[550] text-ink">
        {person.name}
      </p>
      <p className="mt-[var(--s-1)] text-small text-grey-600">{person.role}</p>
      <p className="mt-[var(--s-2)] text-small text-grey-600">
        {person.credential}
      </p>
      <p className="text-small text-grey-600">{person.affiliation}</p>
    </Reveal>
  );
}

export function TeamGrid() {
  return (
    <section className="mt-[var(--s-24)]" aria-label="Team">
      <SectionHeading
        index="03"
        eyebrow="Team"
        title="The people doing the counting"
        lead="Economists, data scientists, and researchers — trained at Carnegie Mellon, Clemson, Stanford, Nebraska, and South Asian University, working across Nepal, India, and the United States."
      />
      <ul className="mt-[var(--s-16)] grid grid-cols-2 gap-x-[var(--s-8)] gap-y-[var(--s-12)] sm:grid-cols-3">
        {TEAM.map((p, i) => (
          <PersonCard key={p.name} person={p} index={i} step={i} />
        ))}
      </ul>

      {ADVISORS.length > 0 ? (
        <>
          <p className="mt-[var(--s-16)] text-eyebrow text-grey-600">
            Advisors &amp; mentors
          </p>
          <ul className="mt-[var(--s-6)] grid grid-cols-2 gap-x-[var(--s-6)] gap-y-[var(--s-8)] sm:grid-cols-4">
            {ADVISORS.map((p, i) => (
              <PersonCard
                key={p.name}
                person={p}
                index={i + TEAM.length}
                step={i}
              />
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}

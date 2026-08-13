import Link from "next/link";
import { SERVICES, type Service } from "@/lib/services";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ServicesGrid (Editorial Institute, 2026-08-12).
 *
 * Was five floating cards with borders, lift-on-hover and drop shadows. Now
 * a ruled index: one row per service, divided by hairlines, read top to
 * bottom like a contents page. Cards fragment the eye and read like an app
 * store; a ruled list reads like a document, which is the whole point of the
 * direction — and it lets the service names sit at a larger size without the
 * layout collapsing.
 *
 * Icons are retained (inline line-SVGs on the 24px grid, stroke 1.75) but
 * demoted to a quiet mark at the left of each row rather than a filled tile.
 */

function ServiceIcon({ slug }: { slug: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true as const,
  };
  switch (slug) {
    case "data-analytics": // bar chart rising
      return (
        <svg {...common}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20H2" />
        </svg>
      );
    case "ai-solutions": // node spark
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
        </svg>
      );
    case "data-engineering": // database stack
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      );
    case "ai-assessment": // clipboard check
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4a3 3 0 0 1 6 0" />
          <path d="M9 13l2 2 4-4" />
        </svg>
      );
    case "ai-integration": // plug into socket
      return (
        <svg {...common}>
          <path d="M9 7V3M15 7V3" />
          <path d="M6 7h12v4a6 6 0 0 1-12 0V7z" />
          <path d="M12 17v4" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Card, not a ruled row. The ruled index belonged to the editorial pass; the
 * reference set presents capabilities as a grid of bordered cards with an
 * icon, a heading, a line of copy and an arrow — scannable at a glance,
 * which is what a buyer does on a services section.
 */
function ServiceCard({ service, step }: { service: Service; step: number }) {
  return (
    <Reveal step={step} as="li" className="h-full">
      <Link
        href={`/services#${service.slug}`}
        className="group flex h-full flex-col rounded-[var(--r-lg)] border border-rule bg-surface p-[var(--s-6)] transition-[border-color,box-shadow,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-[3px] hover:border-violet/40 hover:shadow-[var(--shadow-card)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-[var(--r-md)] bg-violet-wash text-violet transition-colors duration-[var(--dur-fast)] group-hover:bg-violet group-hover:text-bone">
          <ServiceIcon slug={service.slug} />
        </span>

        <h3 className="text-h3 mt-[var(--s-6)] text-ink">{service.title}</h3>
        <p className="text-body mt-[var(--s-3)] text-grey-600">{service.oneLiner}</p>

        <span className="mt-auto inline-flex items-center gap-[var(--s-2)] pt-[var(--s-6)] text-[0.875rem] font-[600] text-ember-text">
          Learn more
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[3px] motion-reduce:group-hover:translate-x-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h9" />
            <path d="M8.5 4.5 12 8l-3.5 3.5" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <section className="bg-paper-2">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] section-pad">
        <SectionHeading
          eyebrow="Core services"
          title="What we build"
          lead="Five ways in — from a first honest assessment to systems running in production."
        />
        <ul className="mt-[var(--heading-gap)] grid grid-cols-1 gap-[var(--s-4)] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} step={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

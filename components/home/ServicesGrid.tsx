import Link from "next/link";
import { SERVICES, type Service } from "@/lib/services";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ServicesGrid (redesigned 2026-07-10).
 * Layout: 2 + 3 on desktop (kept from Phase 5 — the 2/3 split never orphans
 * a card). Card anatomy now: icon tile → mono index → h3 → oneLiner →
 * "Explore" arrow. Hover: border → violet, card lifts 2px with the token
 * shadow, icon tile floods violet and the glyph goes bone.
 * Icons are inline line-SVGs on the 24px grid, stroke 1.75 — one per pillar.
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

function ServiceCard({ service, step }: { service: Service; step: number }) {
  return (
    <Reveal step={step} as="li" className="h-full">
      <Link
        href={`/services#${service.slug}`}
        className="group flex h-full flex-col gap-[var(--s-4)] rounded-[var(--r-lg)] border border-grey-200 bg-surface p-[var(--s-8)] transition-[border-color,transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-[2px] hover:border-violet hover:shadow-[var(--shadow-card)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-[var(--r-md)] border border-grey-200 text-violet transition-[background-color,border-color,color] duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:border-violet group-hover:bg-violet group-hover:text-bone">
            <ServiceIcon slug={service.slug} />
          </span>
          <span className="text-figure text-small text-grey-400">
            {service.index}
          </span>
        </div>
        <h3 className="text-h3 text-ink">{service.title}</h3>
        <p className="text-body text-grey-600">{service.oneLiner}</p>
        <span className="mt-auto inline-flex items-center gap-[var(--s-2)] pt-[var(--s-2)] text-[0.9375rem] font-[500] text-ember-text">
          Explore
          <span
            aria-hidden="true"
            className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[4px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          >
            →
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid() {
  const firstRow = SERVICES.slice(0, 2);
  const secondRow = SERVICES.slice(2);

  return (
    <section className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
      <SectionHeading
        eyebrow="Core services"
        title="What we build"
        lead="Five ways in — from a first honest assessment to systems running in production."
      />
      <ul className="mt-[var(--s-12)] grid grid-cols-1 gap-[var(--s-6)] sm:grid-cols-2">
        {firstRow.map((s, i) => (
          <ServiceCard key={s.slug} service={s} step={i} />
        ))}
      </ul>
      <ul className="mt-[var(--s-6)] grid grid-cols-1 gap-[var(--s-6)] sm:grid-cols-2 lg:grid-cols-3 [&>li:last-child]:sm:col-span-2 [&>li:last-child]:lg:col-span-1">
        {secondRow.map((s, i) => (
          <ServiceCard key={s.slug} service={s} step={i + 2} />
        ))}
      </ul>
    </section>
  );
}

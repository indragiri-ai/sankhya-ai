import Link from "next/link";
import { SERVICES, type Service } from "@/lib/services";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ServicesGrid (Phase 5 as-built).
 * Layout: 2 + 3 on desktop (two anchor pillars full-width row, three below) —
 * five is an awkward number; the 2/3 split reads deliberate, never an
 * orphan card. Tablet: 2-col with the fifth card spanning both. Mobile: one column.
 * Card: mono index → h3 → oneLiner → "Explore" arrow. Whole card is one link.
 * Hover per spec: border --grey-200 → --violet, arrow slides 4px. No icons —
 * the mono index is the identifier.
 */

function ServiceCard({ service, step }: { service: Service; step: number }) {
  return (
    <Reveal step={step} as="li" className="h-full">
      <Link
        href={`/services#${service.slug}`}
        className="group flex h-full flex-col gap-[var(--s-4)] rounded-[var(--r-md)] border border-grey-200 bg-surface p-[var(--s-6)] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:border-violet"
      >
        <span className="text-figure text-small text-grey-400">
          {service.index}
        </span>
        <h3 className="text-h3 text-ink">{service.title}</h3>
        <p className="text-body text-grey-600">{service.oneLiner}</p>
        <span className="mt-auto inline-flex items-center gap-[var(--s-2)] pt-[var(--s-2)] text-[0.9375rem] font-[500] text-ink">
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
        eyebrow="Services"
        title="What we build" /* [PLACEHOLDER — verify] */
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

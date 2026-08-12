import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { CtaBand } from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data analytics, applied AI, data engineering, AI assessment, and AI integration — what Sankhya AI builds and what you receive.",
};

/**
 * /services (Phase 9) — editorial single column, generous rhythm.
 * Renders entirely from lib/services.ts (the Phase 5 contract) — no copy
 * duplicated. Each pillar is the anchor target the homepage cards link to;
 * scroll-margin-top for the fixed nav is set globally in globals.css.
 * Layout choice: single column (no sticky mini-index) — five short sections
 * don't need wayfinding chrome; restraint wins.
 */
export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] pb-[var(--section-y)] md:pb-[var(--section-y-lg)]">
        <PageHeader
          eyebrow="Services"
          title="What we build, and what you receive."
          lead="Five pillars, one standard: every engagement ends in something your organization can hold, run, and audit."
        />

        <div className="flex flex-col gap-[var(--s-16)] px-[var(--s-6)]">
          {SERVICES.map((service) => (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid grid-cols-1 gap-[var(--s-6)] border-t border-rule pt-[var(--s-12)] md:grid-cols-[8rem_1fr]"
            >
              <Reveal step={0}>
                <p className="text-index text-ember-text">{service.index}</p>
              </Reveal>
              <div className="flex flex-col gap-[var(--s-4)]">
                <Reveal step={1}>
                  <h2 id={`${service.slug}-title`} className="text-h2 text-violet">
                    {service.title}
                  </h2>
                </Reveal>
                <Reveal step={2}>
                  <p className="text-body-lg measure text-grey-600">{service.body}</p>
                </Reveal>
                {service.examples.length > 0 ? (
                  <Reveal step={3}>
                    <ul className="mt-[var(--s-4)] flex flex-col font-mono text-small text-grey-600">
                      {service.examples.map((ex) => (
                        <li key={ex} className="border-t border-rule py-[var(--s-3)]">
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
      <CtaBand heading="Not sure which of these you need? That's what the assessment is for." />
    </>
  );
}

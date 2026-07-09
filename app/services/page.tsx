import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/motion/Reveal";
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
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-24)] pt-[calc(var(--nav-h)+var(--s-16))] md:pb-[var(--s-32)]">
        <Reveal step={0}>
          <p className="text-eyebrow text-grey-600">Services</p>
        </Reveal>
        <Reveal step={1}>
          <h1 className="text-h1 mt-[var(--s-4)] max-w-[20ch] text-ink">
            What we build, and what you receive.
          </h1>
        </Reveal>
        <Reveal step={2}>
          <p className="text-body-lg measure mt-[var(--s-4)] text-grey-600">
            Five pillars, one standard: every engagement ends in something
            your organization can hold, run, and audit.
          </p>
        </Reveal>

        <div className="mt-[var(--s-24)] flex flex-col gap-[var(--s-24)]">
          {SERVICES.map((service) => (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid grid-cols-1 gap-[var(--s-6)] border-t border-grey-200 pt-[var(--s-12)] md:grid-cols-[8rem_1fr]"
            >
              <Reveal step={0}>
                <p className="text-figure text-[2rem] text-grey-400">{service.index}</p>
              </Reveal>
              <div className="flex flex-col gap-[var(--s-4)]">
                <Reveal step={1}>
                  <h2 id={`${service.slug}-title`} className="text-h2 text-ink">
                    {service.title}
                  </h2>
                </Reveal>
                <Reveal step={2}>
                  <p className="text-body-lg measure text-grey-600">{service.body}</p>
                </Reveal>
                {service.examples.length > 0 ? (
                  <Reveal step={3}>
                    <ul className="mt-[var(--s-2)] flex flex-col gap-[var(--s-2)] font-mono text-small text-grey-600">
                      {service.examples.map((ex) => (
                        <li key={ex}>
                          <span aria-hidden="true">→ </span>
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

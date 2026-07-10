import { PROJECTS } from "@/lib/projects";
import { SHOW_OUTCOMES } from "@/lib/flags";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Projects section (rebuilt 2026-07-10) — real engagements from the
 * client's Projects.docx replace the earlier [SAMPLE] metric cards.
 * Evidence rule holds: no outcome figures were supplied, so none are
 * shown — each card is a factual record (title · client · period · scope).
 * Status renders in mono; Ongoing gets the one ember accent per card.
 */
export function Outcomes() {
  if (!SHOW_OUTCOMES || PROJECTS.length === 0) return null;

  return (
    <section className="border-t border-grey-200">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
        <SectionHeading
          eyebrow="Projects"
          title="Recent work, real clients"
          lead="Evaluations, supply-chain studies, and survey research delivered for international NGOs, research institutions, and universities."
        />

        <ul className="mt-[var(--s-12)] grid gap-[var(--s-6)] md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal as="li" key={p.slug} step={i % 2} className="h-full">
              <article className="flex h-full flex-col rounded-[var(--r-lg)] border border-grey-200 bg-surface p-[var(--s-8)] transition-[border-color,transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-[2px] hover:border-violet hover:shadow-[var(--shadow-card)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-center justify-between gap-[var(--s-4)]">
                  <span className="font-mono text-small text-grey-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`rounded-full px-[var(--s-3)] py-[var(--s-1)] font-mono text-[0.75rem] ${
                      p.status === "Ongoing"
                        ? "bg-ember/10 text-ember-text"
                        : "bg-grey-200/60 text-grey-600"
                    }`}
                  >
                    {p.status === "Ongoing"
                      ? `${p.period.replace(" —", "")} — ongoing`
                      : "Completed"}
                  </span>
                </div>
                <h3 className="text-h3 mt-[var(--s-3)] text-ink">{p.title}</h3>
                <p className="mt-[var(--s-1)] text-small font-[500] text-grey-600">
                  {p.client}
                </p>
                <p className="mt-[var(--s-3)] text-body text-grey-600">
                  {p.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

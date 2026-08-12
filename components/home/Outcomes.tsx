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
    <section className="bg-bone">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] section-pad">
        <SectionHeading
          index="05"
          eyebrow="Projects"
          title="Recent work, real clients"
          lead="Evaluations, supply-chain studies, and survey research delivered for international NGOs, research institutions, and universities."
        />

        {/* A project register rather than a card grid: same reasoning as the
            services index. Status is a mono label with a rule under the
            ongoing ones — no pills, no tinted chips. */}
        <ul className="mt-[var(--heading-gap)] border-b border-rule">
          {PROJECTS.map((p, i) => (
            <Reveal as="li" key={p.slug} step={i % 2}>
              <article className="grid grid-cols-1 gap-x-[var(--s-8)] gap-y-[var(--s-4)] border-t border-rule py-[var(--s-8)] md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className="flex items-baseline gap-[var(--s-4)]">
                    <span className="text-index text-grey-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h3 text-ink">{p.title}</h3>
                  </div>
                  <p className="mt-[var(--s-2)] pl-[calc(var(--s-4)+1.6em)] text-small text-grey-600">
                    {p.client}
                  </p>
                </div>

                <p className="text-body text-grey-600 md:col-span-5">{p.description}</p>

                <p
                  className={`font-mono text-small md:col-span-2 md:text-right ${
                    p.status === "Ongoing"
                      ? "text-ember-text"
                      : "text-grey-600"
                  }`}
                >
                  {p.status === "Ongoing"
                    ? `${p.period.replace(" —", "")} — ongoing`
                    : "Completed"}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

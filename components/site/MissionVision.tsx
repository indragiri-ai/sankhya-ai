import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

/**
 * MissionVision (new 2026-07-10) — client asked for mission & vision from
 * the company profile deck; the uploaded Company_profile.pptx arrived
 * empty (0 bytes), so this copy is a [DRAFT] written from the supplied
 * team and project documents plus the brand tagline. Replace verbatim
 * when the deck is re-uploaded — the layout will not need to change.
 *
 * Layout (Editorial Institute, 2026-08-12): the two filled cards are gone.
 * Mission and Vision are now ruled columns and the statements are set in the
 * serif — these are the two most quotable sentences on the site and they
 * were previously sitting in a UI sub-head weight inside boxes. Type does
 * the work; no fill, no border, no radius.
 */
export function MissionVision() {
  return (
    <section className="bg-paper-2">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] section-pad">
        <SectionHeading
          index="02"
          eyebrow="Who we are"
          title="Your intelligence partner"
          lead="Sankhya AI pairs field research with data engineering and applied AI — one team from questionnaire design to the system that runs on the answers."
        />

        <div className="mt-[var(--heading-gap)] grid gap-[var(--s-8)] md:grid-cols-2 md:gap-[var(--s-12)]">
          <Reveal step={0}>
            <article className="border-t border-rule-strong pt-[var(--s-6)]">
              <p className="text-eyebrow text-ember-text">Mission</p>
              {/* [DRAFT — replace with exact wording from Company_profile.pptx] */}
              <p className="text-quote mt-[var(--s-6)] text-violet">
                To put evidence at the center of decision-making in Nepal —
                through rigorous research, dependable data systems, and applied
                AI that organizations can trust and run themselves.
              </p>
            </article>
          </Reveal>
          <Reveal step={1}>
            <article className="border-t border-rule-strong pt-[var(--s-6)]">
              <p className="text-eyebrow text-ember-text">Vision</p>
              {/* [DRAFT — replace with exact wording from Company_profile.pptx] */}
              <p className="text-quote mt-[var(--s-6)] text-violet">
                A Nepal where every institution — public or private — decides
                from data it can defend.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

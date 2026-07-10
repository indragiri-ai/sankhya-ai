import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

/**
 * MissionVision (new 2026-07-10) — client asked for mission & vision from
 * the company profile deck; the uploaded Company_profile.pptx arrived
 * empty (0 bytes), so this copy is a [DRAFT] written from the supplied
 * team and project documents plus the brand tagline. Replace verbatim
 * when the deck is re-uploaded — the layout will not need to change.
 *
 * Layout: two cards — Mission on flat violet (dark), Vision on surface
 * with a violet border. Ember eyebrows tie them to the section system.
 */
export function MissionVision() {
  return (
    <section className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
      <SectionHeading
        eyebrow="Who we are"
        title="Your intelligence partner"
        lead="Sankhya AI pairs field research with data engineering and applied AI — one team from questionnaire design to the system that runs on the answers."
      />

      <div className="mt-[var(--s-12)] grid gap-[var(--s-6)] md:grid-cols-2">
        <Reveal step={0} className="h-full">
          <article
            data-surface="dark"
            className="flex h-full flex-col gap-[var(--s-4)] rounded-[var(--r-lg)] bg-violet p-[var(--s-8)]"
          >
            <p className="text-eyebrow text-ember">Mission</p>
            {/* [DRAFT — replace with exact wording from Company_profile.pptx] */}
            <p className="text-h3 text-bone">
              To put evidence at the center of decision-making in Nepal —
              through rigorous research, dependable data systems, and applied
              AI that organizations can trust and run themselves.
            </p>
          </article>
        </Reveal>
        <Reveal step={1} className="h-full">
          <article className="flex h-full flex-col gap-[var(--s-4)] rounded-[var(--r-lg)] border-[1.5px] border-violet bg-surface p-[var(--s-8)]">
            <p className="text-eyebrow text-ember-text">Vision</p>
            {/* [DRAFT — replace with exact wording from Company_profile.pptx] */}
            <p className="text-h3 text-ink">
              A Nepal where every institution — public or private — decides
              from data it can defend.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

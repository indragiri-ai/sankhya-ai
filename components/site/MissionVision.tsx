import { Reveal } from "@/components/motion/Reveal";

/**
 * MissionVision (new 2026-07-10) — client asked for mission & vision from
 * the company profile deck; the uploaded Company_profile.pptx arrived
 * empty (0 bytes), so this copy is a [DRAFT] written from the supplied
 * team and project documents plus the brand tagline. Replace verbatim
 * when the deck is re-uploaded — the layout will not need to change.
 *
 * Compacted 2026-08-13. It was a full section: eyebrow, display heading,
 * a lead paragraph and two large serif statements over the standard section
 * padding — roughly a screen and a half for two sentences. Two things went:
 *
 *   - The heading block. "Your intelligence partner" is already the hero's
 *     eyebrow and the lead paragraph restated the hero's own description
 *     almost word for word, so the page was saying the same thing twice
 *     within one scroll.
 *   - The display type. The statements now sit at lead size in two ruled
 *     columns, which is enough for a sentence each.
 *
 * What remains is a band rather than a section: half the vertical space, no
 * repetition, and the two sentences still the only thing in it. The heading
 * is screen-reader only so the document outline stays intact.
 */
export function MissionVision() {
  return (
    <section aria-labelledby="mission-vision" className="bg-paper-2">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-12)]">
        <h2 id="mission-vision" className="sr-only">
          Mission and vision
        </h2>

        <div className="grid gap-[var(--s-8)] md:grid-cols-2 md:gap-[var(--s-16)]">
          <Reveal step={0}>
            <article className="border-t border-rule-strong pt-[var(--s-4)]">
              <h3 className="text-eyebrow text-ember-text">Mission</h3>
              {/* [DRAFT — replace with exact wording from Company_profile.pptx] */}
              <p className="text-body-lg mt-[var(--s-3)] text-ink">
                To put evidence at the center of decision-making in Nepal —
                through rigorous research, dependable data systems, and applied
                AI that organizations can trust and run themselves.
              </p>
            </article>
          </Reveal>

          <Reveal step={1}>
            <article className="border-t border-rule-strong pt-[var(--s-4)]">
              <h3 className="text-eyebrow text-ember-text">Vision</h3>
              {/* [DRAFT — replace with exact wording from Company_profile.pptx] */}
              <p className="text-body-lg mt-[var(--s-3)] text-ink">
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

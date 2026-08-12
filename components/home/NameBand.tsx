import { Reveal } from "@/components/motion/Reveal";

/**
 * NameBand (Phase 4 as-built) — the one section no competitor can copy.
 * Full-bleed flat --violet, bone text. Left: संख्या at display scale
 * (spelling corrected 2026-07-10 per client's Company Name.txt)
 * (system Devanagari fallback stack, lang="sa", visually-hidden
 * transliteration). Right: eyebrow THE NAME (ember — passes AA on violet
 * at 4.6:1) + 2–3 sentences. Reveal only; the Devanagari leads by one
 * stagger step. Restraint is the design.
 *
 * Copy: etymology draft from the blueprint.
 * [PLACEHOLDER — edit against the founder's own telling when provided.]
 */
export function NameBand() {
  return (
    <section data-surface="dark" className="bg-violet-deep">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[var(--s-12)] px-[var(--s-6)] section-pad md:grid-cols-2 md:gap-[var(--s-16)]">
        <Reveal step={0}>
          {/* Now set in Tiro Devanagari Hindi — a real Devanagari text serif
              with calligraphic contrast, loaded with the page. This was the
              site's most distinctive asset rendering in whatever the visitor's
              OS supplied; on Windows that meant Mangal. Single 400 weight. */}
          <p className="devanagari text-[clamp(3.5rem,7vw,5.5rem)] leading-[1.15] text-bone">
            <span lang="sa" aria-hidden="true">
              संख्या
            </span>
            <span className="sr-only">Sankhya</span>
          </p>
        </Reveal>
        <div className="border-t border-bone/20 pt-[var(--s-6)]">
          <Reveal step={1}>
            <p className="text-eyebrow text-bone/65">The name</p>
          </Reveal>
          <Reveal step={2}>
            <p className="text-quote measure mt-[var(--s-6)] text-bone">
              Sankhya (संख्या) is the word for “number” — the discipline of
              counting, categorizing, and reasoning from evidence. That is
              the job: turn what an organization can count into what it can
              decide.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

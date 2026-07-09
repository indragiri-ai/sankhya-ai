import { Reveal } from "@/components/motion/Reveal";

/**
 * NameBand (Phase 4 as-built) — the one section no competitor can copy.
 * Full-bleed flat --violet, bone text. Left: सांख्य at display scale
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
    <section data-surface="dark" className="bg-violet">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[var(--s-12)] px-[var(--s-6)] py-[var(--s-24)] md:grid-cols-2 md:py-[var(--s-32)]">
        <Reveal step={0}>
          <p className="devanagari text-[clamp(5rem,10vw,8.5rem)] font-[550] leading-none text-bone/90">
            <span lang="sa" aria-hidden="true">
              सांख्य
            </span>
            <span className="sr-only">Sāṅkhya</span>
          </p>
        </Reveal>
        <div className="flex flex-col gap-[var(--s-4)]">
          <Reveal step={1}>
            <p className="text-eyebrow text-ember">The name</p>
          </Reveal>
          <Reveal step={2}>
            <p className="text-body-lg measure text-bone">
              Sāṅkhya (सांख्य) means “enumeration” — the ancient Indian school
              of thought built on counting, categorizing, and reasoning from
              evidence. Twenty-five centuries later, that is still the job:
              turn what an organization can count into what it can decide.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

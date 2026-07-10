import { SHOW_INSTITUTION_MARKS } from "@/lib/flags";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * InstitutionsBlock (Phase 7 as-built) — the government/enterprise trust
 * section, speaking to a risk-averse reader. Plain beats striking here.
 *
 * Evidence gate: no certifications/partnerships were provided → the marks
 * row is flagged OFF and only the posture copy ships. Every sentence below
 * is true of how this site itself was built (the Build Book is the proof
 * of the documentation culture it describes). Data-handling claims are
 * omitted until the client states one verbatim.
 */

// [PLACEHOLDER] — populate with exact certification/partnership names from
// the client (expected in the re-uploaded company profile deck), no paraphrase.
const MARKS: string[] = [];

export function InstitutionsBlock() {
  return (
    <section className="border-t border-grey-200 bg-surface">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
        <SectionHeading
          eyebrow="For institutions"
          title="Built for organizations that answer to someone" /* [PLACEHOLDER — verify] */
        />
        <div className="mt-[var(--s-8)] grid gap-[var(--s-8)] md:grid-cols-2">
          <Reveal step={0}>
            <p className="text-body measure text-grey-600">
              We work the way institutional buyers need vendors to work:
              written scopes, named deliverables at every step, and
              documentation produced during the build — not reconstructed
              after it. This website itself was built from a specification
              document a third party could rebuild it from; client systems
              get the same treatment.
            </p>
          </Reveal>
          <Reveal step={1}>
            <p className="text-body measure text-grey-600">
              We are based in Nepal and build for organizations that operate
              here — within the systems, constraints, and procurement
              processes they actually use — while holding the work to an
              international standard. Every system is handed over with the
              material your own team needs to run it.
            </p>
          </Reveal>
        </div>

        {SHOW_INSTITUTION_MARKS && MARKS.length > 0 ? (
          <ul className="mt-[var(--s-12)] flex flex-wrap gap-[var(--s-3)]">
            {MARKS.map((mark) => (
              <li
                key={mark}
                className="rounded-[var(--r-sm)] border border-grey-200 px-[var(--s-4)] py-[var(--s-2)] font-mono text-small text-grey-600"
              >
                {mark}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

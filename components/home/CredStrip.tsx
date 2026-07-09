/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/motion/Reveal";
import { asset } from "@/lib/asset";
import { SHOW_CRED_STRIP } from "@/lib/flags";

/**
 * CredStrip (Phase 4, Variant A as-built) — partner row. Names supplied by
 * the client 2026-07-09: World Vision International Nepal, University of
 * Pittsburgh, Kathmandu University, Nepal Bank Limited. Each entry renders
 * its logo when the file exists in /public/logos (see the README there) and
 * falls back to a text wordmark until then.
 *
 * Variant B (anonymized metrics) was the previous as-built; superseded when
 * real partner names arrived. Never launch this section with invented facts.
 */

type Partner = {
  name: string;
  /** path under /public once uploaded; null → render the name as text */
  logo: string | null;
};

const PARTNERS: Partner[] = [
  // [PLACEHOLDER] — logo file not yet uploaded (public/logos/README.md)
  { name: "World Vision International Nepal", logo: null },
  {
    name: "University of Pittsburgh",
    logo: "/logos/university-of-pittsburgh.avif",
  },
  { name: "Kathmandu University", logo: "/logos/kathmandu-university.png" },
  { name: "Nepal Bank Limited", logo: "/logos/nepal-bank-limited.png" },
];

export function CredStrip() {
  if (!SHOW_CRED_STRIP) return null;

  return (
    <section aria-label="Partners" className="border-b border-grey-200">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-12)]">
        <Reveal>
          <p className="text-small text-grey-600">
            Organizations we have worked with
          </p>
        </Reveal>
        <ul className="mt-[var(--s-6)] flex flex-wrap items-center gap-x-[var(--s-12)] gap-y-[var(--s-6)]">
          {PARTNERS.map((p, i) => (
            <Reveal as="li" key={p.name} step={i + 1}>
              {p.logo ? (
                <img
                  src={asset(p.logo)}
                  alt={p.name}
                  className="h-[var(--s-12)] w-auto"
                />
              ) : (
                <span className="text-body text-grey-600">{p.name}</span>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

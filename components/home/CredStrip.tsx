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
  { name: "World Vision International Nepal", logo: "/logos/world-vision.png" },
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
    <section aria-label="Partners" className="bg-bone">
      <div className="mx-auto max-w-[1200px] border-t border-rule px-[var(--s-6)] py-[var(--s-12)]">
        <Reveal>
          <div className="flex items-center gap-[var(--s-3)]">
            <span aria-hidden="true" className="tick" />
            <p className="text-eyebrow text-grey-600">
              Trusted by partners &amp; collaborators
            </p>
          </div>
        </Reveal>
        <ul className="mt-[var(--s-8)] flex flex-wrap items-center gap-x-[var(--s-16)] gap-y-[var(--s-6)]">
          {PARTNERS.map((p, i) => (
            <Reveal as="li" key={p.name} step={i + 1}>
              {p.logo ? (
                // grayscale keeps four visually unrelated marks from fighting
                // the palette; full color returns on hover
                <img
                  src={asset(p.logo)}
                  alt={p.name}
                  className="h-[var(--s-12)] w-auto opacity-70 grayscale transition-[filter,opacity] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="text-body font-[550] text-grey-600">
                  {p.name}
                </span>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

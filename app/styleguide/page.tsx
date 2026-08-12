import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { PrimaryButton, OutlineButton, SecondaryLink } from "@/components/site/Buttons";
import { SectionHeading } from "@/components/site/SectionHeading";

export const metadata: Metadata = {
  title: "Styleguide (internal)",
  robots: { index: false, follow: false },
};

/**
 * /styleguide (Phase 1 §C.8) — TEMPORARY token proof page. noindex, excluded
 * from sitemap; REMOVED IN PHASE 10 before launch. Renders the palette with
 * measured contrast ratios, the full type scale in working copy, spacing,
 * radii, and the three motion primitives live.
 */

/* Ratios below are measured, not estimated — recomputed 2026-08-12 against
   the redesign's actual pairings. --grey-400 is DARK-SURFACES-ONLY: at
   2.98:1 on bone it fails AA, which is why every light-surface use of it was
   moved to --grey-600 during the redesign. */
const SWATCHES = [
  { name: "--violet", hex: "#34006F", note: "on bone 14.3:1 AA", fg: "#FAF7F1" },
  { name: "--violet-deep", hex: "#250050", note: "dark bands · 16.4:1 AA", fg: "#FAF7F1" },
  { name: "--ink", hex: "#160029", note: "on bone 18.4:1 AA", fg: "#FAF7F1" },
  { name: "--bone", hex: "#FAF7F1", note: "canvas", fg: "#160029" },
  { name: "--paper-2", hex: "#F4F0E8", note: "alternating band", fg: "#160029" },
  { name: "--surface", hex: "#FFFFFF", note: "panels", fg: "#160029" },
  { name: "--ember", hex: "#FE5000", note: "rules/marks ≥24px only", fg: "#160029" },
  { name: "--ember-text", hex: "#C43D00", note: "on bone 4.9:1 AA", fg: "#FAF7F1" },
  { name: "--grey-600", hex: "#5B5566", note: "on bone 6.7:1 AA", fg: "#FAF7F1" },
  { name: "--grey-400", hex: "#948DA1", note: "DARK SURFACES ONLY", fg: "#160029" },
  { name: "--rule", hex: "#DCD5C8", note: "default hairline", fg: "#160029" },
  { name: "--rule-strong", hex: "#C4BBA9", note: "section-opening rule", fg: "#160029" },
  { name: "--viz-moss", hex: "#3D7068", note: "2nd chart series", fg: "#FAF7F1" },
];

const SPACES = ["--s-1", "--s-2", "--s-3", "--s-4", "--s-6", "--s-8", "--s-12", "--s-16", "--s-24", "--s-32"];

export default function StyleguidePage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-[var(--s-24)] px-[var(--s-6)] pb-[var(--s-32)] pt-[calc(var(--nav-h)+var(--s-16))]">
      <div>
        <p className="text-eyebrow text-grey-600">Internal — removed before launch</p>
        <h1 className="text-h1 mt-[var(--s-4)] text-violet">Styleguide</h1>
      </div>

      {/* Palette */}
      <section>
        <SectionHeading index="01" eyebrow="Tokens" title="Palette" />
        <ul className="mt-[var(--s-8)] grid grid-cols-2 gap-[var(--s-4)] md:grid-cols-5">
          {SWATCHES.map((s) => (
            <li
              key={s.name}
              className="flex h-32 flex-col justify-between rounded-[var(--r-sm)] border border-rule p-[var(--s-3)]"
              style={{ background: `var(${s.name})`, color: s.fg }}
            >
              <span className="font-mono text-small">{s.name}</span>
              <span className="font-mono text-small">
                {s.hex}
                <br />
                {s.note}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Type scale — real working copy, no lorem */}
      <section className="flex flex-col gap-[var(--s-8)]">
        <SectionHeading
          index="02"
          eyebrow="Tokens"
          title="Type scale"
          lead="Newsreader (display serif, variable opsz) for display/h1/h2 and the quote style; Geist Sans for h3, body and UI; Geist Mono for every numeral, eyebrow and index label; Tiro Devanagari Hindi for संख्या."
        />
        <p className="text-display text-violet">
          Decisions, made <em>measurable</em>.
        </p>
        <p className="text-h1 text-violet">Turn what you can count into what you can decide.</p>
        <p className="text-h2 text-violet">One method, run in the open.</p>
        <p className="text-quote text-violet">
          Sankhya (संख्या) is the word for “number.”
        </p>
        <p className="text-h3 text-ink">An honest audit before anything gets built.</p>
        <p className="text-body-lg measure text-ink">
          Body large — We design and build the data systems, analytics, and
          applied AI that let organizations in Nepal decide from evidence.
        </p>
        <p className="text-body measure text-ink">
          Body — Every step of the method ends in something you can hold: a
          ranked report, a build plan, a running system with its documentation.
        </p>
        <p className="text-small text-grey-600">
          Small — measured over Q1; basis lines render visibly because visible
          methodology is the trust signal.
        </p>
        <div className="flex items-center gap-[var(--s-3)]">
          <span className="text-index text-ember-text">01</span>
          <p className="text-eyebrow text-grey-600">Eyebrow — Data · AI · Nepal</p>
        </div>
        <p className="text-figure text-[2rem] text-violet">
          Figure — 1,234,567.89
        </p>
        <p className="devanagari text-[3rem] leading-[1.15] text-violet">
          <span lang="sa">संख्या</span>
        </p>
      </section>

      {/* Spacing */}
      <section>
        <SectionHeading index="03" eyebrow="Tokens" title="Spacing" />
        <ul className="mt-[var(--s-8)] flex flex-col gap-[var(--s-2)]">
          {SPACES.map((s) => (
            <li key={s} className="flex items-center gap-[var(--s-4)]">
              <span className="w-16 font-mono text-small text-grey-600">{s}</span>
              <span className="h-4 bg-violet" style={{ width: `var(${s})` }} />
            </li>
          ))}
        </ul>
      </section>

      {/* Radii */}
      <section>
        <SectionHeading
          index="04"
          eyebrow="Tokens"
          title="Radii"
          lead="Near-square since the 2026-08-12 redesign — 2/3/4px. Pills and 16px card corners are gone site-wide."
        />
        <div className="mt-[var(--s-8)] flex gap-[var(--s-6)]">
          {["--r-sm", "--r-md", "--r-lg"].map((r) => (
            <div
              key={r}
              className="flex h-24 w-32 items-center justify-center border border-rule bg-surface font-mono text-small text-grey-600"
              style={{ borderRadius: `var(${r})` }}
            >
              {r}
            </div>
          ))}
        </div>
      </section>

      {/* Motion primitives, live */}
      <section>
        <SectionHeading
          index="05"
          eyebrow="Motion"
          title="Primitives"
          lead="Reveal (this section entered with it) and Counter. The Magnetic cursor-follow on buttons was removed in the 2026-08-12 redesign — a button that chases the pointer reads as a gadget, not as a firm."
        />
        <div className="mt-[var(--s-8)] flex flex-wrap items-center gap-[var(--s-12)]">
          <Reveal>
            <div className="rounded-[var(--r-sm)] border border-rule bg-surface p-[var(--s-6)]">
              <p className="text-small text-grey-600">Reveal — 500ms, ease-out, +12px</p>
            </div>
          </Reveal>
          <div>
            <p className="text-figure text-[2.5rem] text-violet">
              <Counter value={2500} /> <span className="text-small text-grey-600">years of enumeration</span>
            </p>
          </div>
          <PrimaryButton href="/contact">Primary button</PrimaryButton>
          <OutlineButton href="/approach">Outline button</OutlineButton>
          <SecondaryLink href="/services">Secondary link</SecondaryLink>
        </div>
      </section>
    </div>
  );
}

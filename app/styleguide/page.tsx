import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { PrimaryButton, SecondaryLink } from "@/components/site/Buttons";
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

const SWATCHES = [
  { name: "--violet", hex: "#34006F", note: "on bone 12.6:1 AA", fg: "#FAF7F1" },
  { name: "--ink", hex: "#160029", note: "on bone 16.9:1 AA", fg: "#FAF7F1" },
  { name: "--bone", hex: "#FAF7F1", note: "canvas", fg: "#160029" },
  { name: "--surface", hex: "#FFFFFF", note: "cards", fg: "#160029" },
  { name: "--ember", hex: "#FE5000", note: "graphics / ≥24px only", fg: "#160029" },
  { name: "--ember-text", hex: "#C43D00", note: "on bone 5.1:1 AA", fg: "#FAF7F1" },
  { name: "--grey-600", hex: "#5B5566", note: "secondary text", fg: "#FAF7F1" },
  { name: "--grey-400", hex: "#948DA1", note: "tertiary", fg: "#160029" },
  { name: "--grey-200", hex: "#E4E0EA", note: "hairlines", fg: "#160029" },
  { name: "--viz-moss", hex: "#3D7068", note: "2nd chart series", fg: "#FAF7F1" },
];

const SPACES = ["--s-1", "--s-2", "--s-3", "--s-4", "--s-6", "--s-8", "--s-12", "--s-16", "--s-24", "--s-32"];

export default function StyleguidePage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-[var(--s-24)] px-[var(--s-6)] pb-[var(--s-32)] pt-[calc(var(--nav-h)+var(--s-16))]">
      <div>
        <p className="text-eyebrow text-grey-600">Internal — removed before launch</p>
        <h1 className="text-h1 mt-[var(--s-4)] text-ink">Styleguide</h1>
      </div>

      {/* Palette */}
      <section>
        <SectionHeading eyebrow="Tokens" title="Palette" />
        <ul className="mt-[var(--s-8)] grid grid-cols-2 gap-[var(--s-4)] md:grid-cols-5">
          {SWATCHES.map((s) => (
            <li
              key={s.name}
              className="flex h-32 flex-col justify-between rounded-[var(--r-md)] border border-grey-200 p-[var(--s-3)]"
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
        <SectionHeading eyebrow="Tokens" title="Type scale" />
        <p className="text-display text-ink">Decisions, made measurable.</p>
        <p className="text-h1 text-ink">Turn what you can count into what you can decide.</p>
        <p className="text-h2 text-ink">One method, run in the open.</p>
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
        <p className="text-eyebrow text-grey-600">Eyebrow — Data · AI · Nepal</p>
        <p className="text-figure text-[2rem] text-ink">
          Figure — 1,234,567.89
        </p>
      </section>

      {/* Spacing */}
      <section>
        <SectionHeading eyebrow="Tokens" title="Spacing" />
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
        <SectionHeading eyebrow="Tokens" title="Radii" />
        <div className="mt-[var(--s-8)] flex gap-[var(--s-6)]">
          {["--r-sm", "--r-md", "--r-lg"].map((r) => (
            <div
              key={r}
              className="flex h-24 w-32 items-center justify-center border border-grey-200 bg-surface font-mono text-small text-grey-600"
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
          eyebrow="Motion"
          title="Primitives"
          lead="Reveal (this section entered with it), Counter, and Magnetic — the only motion vocabulary until Phase 3."
        />
        <div className="mt-[var(--s-8)] flex flex-wrap items-center gap-[var(--s-12)]">
          <Reveal>
            <div className="rounded-[var(--r-md)] border border-grey-200 bg-surface p-[var(--s-6)]">
              <p className="text-small text-grey-600">Reveal — 500ms, ease-out, +12px</p>
            </div>
          </Reveal>
          <div>
            <p className="text-figure text-[2.5rem] text-ink">
              <Counter value={2500} /> <span className="text-small text-grey-600">years of enumeration</span>
            </p>
          </div>
          <PrimaryButton href="/contact">Magnetic button</PrimaryButton>
          <SecondaryLink href="/services">Secondary link</SecondaryLink>
        </div>
      </section>
    </div>
  );
}

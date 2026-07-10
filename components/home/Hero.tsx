"use client";

import { useEffect, useRef, useState } from "react";
import { BinduField } from "@/components/home/BinduField";
import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, OutlineButton } from "@/components/site/Buttons";

/**
 * Hero (redesigned 2026-07-10, ref: Fusemachines hero language mapped onto
 * Sankhya tokens).
 * - Full-bleed dark surface: violet → ink radial gradient, BinduField in
 *   bone/ember on top, content above both.
 * - Stack: ember eyebrow (the brand tagline) → display headline with one
 *   ember word → one-sentence sub → pill CTA row → fact strip.
 * - Fact strip figures are real: Est. 2019 (company seal), six research
 *   engagements (Projects.docx), four institutional partners (CredStrip).
 * - Height: clamp(640px, 100svh, 900px); svh avoids the mobile URL-bar jump.
 */
export function Hero() {
  const hostRef = useRef<HTMLElement>(null);
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCanvasVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={hostRef}
      data-surface="dark"
      className="relative flex h-[clamp(640px,100svh,900px)] items-center overflow-hidden bg-violet"
    >
      {/* Depth: one quiet radial glow toward the top-left, ink toward the foot */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 0%, rgb(74 20 140 / 0.55) 0%, transparent 55%), linear-gradient(180deg, transparent 55%, rgb(22 0 41 / 0.65) 100%)",
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-[800ms] ease-[var(--ease-out)] motion-reduce:transition-none"
        style={{ opacity: canvasVisible ? 0.55 : 0 }}
      >
        <BinduField hostRef={hostRef} onDark />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-[var(--s-6)] pt-[var(--nav-h)]">
        <div className="flex max-w-[46rem] flex-col items-center gap-[var(--s-6)] text-center md:items-start md:text-left">
          <Reveal step={0}>
            <p className="text-eyebrow text-ember">Your Intelligence Partner</p>
          </Reveal>
          <Reveal step={1}>
            <h1 className="text-display text-bone">
              Decisions, made{" "}
              <span className="text-ember">measurable.</span>
            </h1>
          </Reveal>
          <Reveal step={2}>
            <p className="text-body-lg measure text-bone/85">
              Sankhya AI is a research and data company in Kathmandu. We run
              field research, build analytics, and apply AI so organizations
              in Nepal — and the institutions that work here — can decide
              from evidence.
            </p>
          </Reveal>
          <Reveal step={3}>
            <div className="mt-[var(--s-2)] flex flex-wrap items-center justify-center gap-[var(--s-4)] md:justify-start">
              <PrimaryButton href="/contact">Start a conversation</PrimaryButton>
              <OutlineButton href="/services">Explore our services</OutlineButton>
            </div>
          </Reveal>

          {/* Fact strip — every figure defensible, no invented metrics */}
          <Reveal step={4}>
            <dl className="mt-[var(--s-8)] flex flex-wrap items-center justify-center gap-x-[var(--s-12)] gap-y-[var(--s-6)] border-t border-bone/15 pt-[var(--s-6)] md:justify-start">
              {[
                { value: "2019", label: "Established" },
                { value: "06", label: "Research engagements" },
                { value: "04", label: "Institutional partners" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-[var(--s-1)] md:items-start">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-figure text-[1.75rem] leading-none text-bone">
                    {f.value}
                  </dd>
                  <dd className="text-small text-bone/60">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

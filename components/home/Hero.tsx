"use client";

import { useEffect, useRef, useState } from "react";
import { BinduField } from "@/components/home/BinduField";
import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, SecondaryLink } from "@/components/site/Buttons";

/**
 * Hero (Phase 3 as-built).
 * - Height: clamp(640px, 100svh, 900px) — svh avoids the mobile URL-bar jump;
 *   no unbounded 100vh (documented decision).
 * - Stack: eyebrow → display headline → one-sentence sub → CTA row.
 * - Entrance: the site's single page-load sequence — Reveal with --stagger,
 *   canvas fades in last over 800ms.
 * - No scroll affordance. The composition invites the scroll.
 */
export function Hero() {
  const hostRef = useRef<HTMLElement>(null);
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    // canvas is the last element in the load sequence
    const t = setTimeout(() => setCanvasVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={hostRef}
      className="relative flex h-[clamp(640px,100svh,900px)] items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 transition-opacity duration-[800ms] ease-[var(--ease-out)] motion-reduce:transition-none"
        style={{ opacity: canvasVisible ? 1 : 0 }}
      >
        <BinduField hostRef={hostRef} />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-[var(--s-6)]">
        <div className="flex max-w-[40rem] flex-col items-center gap-[var(--s-6)] text-center md:items-start md:text-left">
          <Reveal step={0}>
            <p className="text-eyebrow text-grey-600">Data · AI · Nepal</p>
          </Reveal>
          <Reveal step={1}>
            {/* [PLACEHOLDER — verify or replace] working headline from blueprint */}
            <h1 className="text-display max-w-[14ch] text-ink">
              Decisions, made measurable.
            </h1>
          </Reveal>
          <Reveal step={2}>
            {/* [PLACEHOLDER — capability-honest; confirm against what Sankhya has shipped] */}
            <p className="text-body-lg measure text-grey-600">
              We design and build the data systems, analytics, and applied AI
              that let organizations in Nepal decide from evidence.
            </p>
          </Reveal>
          <Reveal step={3}>
            <div className="mt-[var(--s-2)] flex flex-wrap items-center justify-center gap-[var(--s-6)] md:justify-start">
              <PrimaryButton href="/contact">Start a conversation</PrimaryButton>
              <SecondaryLink href="/services">See what we build</SecondaryLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

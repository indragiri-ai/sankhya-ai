"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APPROACH_STEPS } from "@/lib/approach";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ApproachSequence (Phase 6 as-built).
 * Desktop: five columns over a 1px --grey-200 baseline; a 2px --ember
 * progress line scrubs left→right with the section's passage through the
 * viewport. UNPINNED scrub (documented decision — pinning five short steps
 * risks scroll-jack feel). ScrollTrigger config: start "top 75%",
 * end "bottom 45%", scrub true. Node dots "light up" as the line passes.
 * Mobile: left vertical rule, line draws top→bottom, same scrub.
 * Reduced motion: line full, nodes lit, no animation.
 * Cleanup: gsap.context().revert() on unmount — the documented pattern; no
 * duplicate triggers after client-side navigation.
 */
export function ApproachSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineDesktopRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileNodesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setLit = (progress: number) => {
      const light = (el: HTMLSpanElement | null, i: number) => {
        if (!el) return;
        el.style.opacity = progress >= (i + 0.5) / APPROACH_STEPS.length ? "1" : "0.35";
      };
      nodesRef.current.forEach(light);
      mobileNodesRef.current.forEach(light);
    };

    if (reduced) {
      if (lineDesktopRef.current) lineDesktopRef.current.style.transform = "scaleX(1)";
      if (lineMobileRef.current) lineMobileRef.current.style.transform = "scaleY(1)";
      setLit(1);
      return;
    }

    const ctx = gsap.context(() => {
      const targets = [lineDesktopRef.current, lineMobileRef.current].filter(Boolean);
      gsap.fromTo(
        lineDesktopRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => setLit(self.progress),
          },
        }
      );
      gsap.fromTo(
        lineMobileRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
      void targets;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper-2">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
        <SectionHeading
          index="05"
          eyebrow="How we work"
          title="One method, run in the open" /* [PLACEHOLDER — verify] */
          lead="Five steps, each ending in something you can hold. Engagements can enter at any step."
        />

        {/* Desktop: horizontal sequence */}
        <div className="mt-[var(--s-16)] hidden lg:block">
          <div className="relative mb-[var(--s-8)]">
            <div className="h-px w-full bg-rule-strong" />
            <div
              ref={lineDesktopRef}
              className="absolute left-0 top-[-0.5px] h-[2px] w-full origin-left bg-ember"
              style={{ transform: "scaleX(0)" }}
            />
            {/* Square nodes, not dots — the editorial direction has no circles
                in it, and a 7px square reads as a printed tick mark. */}
            <div className="absolute inset-x-0 top-0 flex justify-between">
              {APPROACH_STEPS.map((step, i) => (
                <span
                  key={step.slug}
                  ref={(el) => {
                    nodesRef.current[i] = el;
                  }}
                  className="mt-[-3px] block h-[7px] w-[7px] bg-violet transition-opacity duration-[var(--dur-fast)]"
                  style={{ opacity: 0.35 }}
                />
              ))}
            </div>
          </div>
          <ol className="grid grid-cols-5 gap-[var(--s-6)]">
            {APPROACH_STEPS.map((step) => (
              <li key={step.slug} className="flex flex-col">
                <span className="text-index text-ember-text">{step.index}</span>
                <h3 className="text-h3 mt-[var(--s-4)] text-ink">{step.title}</h3>
                <p className="text-body mt-[var(--s-3)] text-grey-600">{step.verbLine}</p>
                <p className="mt-[var(--s-4)] border-t border-rule pt-[var(--s-3)] font-mono text-small text-grey-600">
                  {step.deliverable}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile/tablet: vertical rule */}
        <div className="relative mt-[var(--s-12)] lg:hidden">
          <div className="absolute bottom-0 left-[4px] top-0 w-px bg-rule-strong" />
          <div
            ref={lineMobileRef}
            className="absolute bottom-0 left-[3.5px] top-0 w-[2px] origin-top bg-ember"
            style={{ transform: "scaleY(0)" }}
          />
          <ol className="flex flex-col gap-[var(--s-12)]">
            {APPROACH_STEPS.map((step, i) => (
              <li key={step.slug} className="relative pl-[var(--s-8)]">
                <span
                  ref={(el) => {
                    mobileNodesRef.current[i] = el;
                  }}
                  className="absolute left-[1px] top-[6px] block h-[7px] w-[7px] bg-violet transition-opacity duration-[var(--dur-fast)]"
                  style={{ opacity: 0.35 }}
                />
                <Reveal step={0}>
                  <span className="text-index text-ember-text">{step.index}</span>
                  <h3 className="mt-[var(--s-3)] text-h3 text-ink">{step.title}</h3>
                  <p className="mt-[var(--s-2)] text-body text-grey-600">{step.verbLine}</p>
                  <p className="mt-[var(--s-4)] border-t border-rule pt-[var(--s-3)] font-mono text-small text-grey-600">
                    {step.deliverable}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

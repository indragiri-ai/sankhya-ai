"use client";

import { useCallback, useEffect, useRef } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { SHOW_OUTCOMES } from "@/lib/flags";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ProjectsCarousel — "Recent work" (new 2026-08-13, replaces Outcomes.tsx).
 *
 * Was a register: six rows of a ruled table, every project the same weight,
 * the whole section as tall as the six of them stacked. Now three cards in
 * view at a time on a track that advances itself, so the section is a fixed
 * height whatever the project count and each entry gets a box of its own.
 *
 * Mechanics, and why this is native scrolling rather than a transform:
 *   - The track is a real overflow-x container with CSS scroll snapping.
 *     Touch swipe, trackpad, shift-wheel, keyboard arrows and the scrollbar
 *     all work for free, and none of them have to be re-implemented or kept
 *     in sync with a transform offset.
 *   - The list is rendered twice and the scroll position wraps by exactly
 *     half the track once it passes the midpoint. Because the second half is
 *     identical to the first, the jump is invisible and the loop never ends.
 *     The wrap waits for scrolling to settle (SETTLE_MS) — moving
 *     scrollLeft during a smooth scroll cancels it mid-flight.
 *   - Slides carry their gutter as right padding instead of the list using
 *     `gap`. With `gap`, scrollWidth is 12 slides plus 11 gaps and half of
 *     that is not a whole number of slides, so the wrap drifts by half a gap
 *     every lap. Padding makes the period exactly one slide width.
 *
 * Auto-advance pauses on hover and on focus-within, and never starts under
 * prefers-reduced-motion — but the arrows still work there, so the content
 * is reachable either way. Evidence gate (SHOW_OUTCOMES) is unchanged.
 */

const ADVANCE_MS = 4000;
const SETTLE_MS = 140;

function StatusChip({ status }: { status: Project["status"] }) {
  const ongoing = status === "Ongoing";
  return (
    <span
      className={`inline-flex items-center gap-[var(--s-2)] rounded-[var(--r-pill)] px-[var(--s-3)] py-[6px] font-mono text-[0.6875rem] uppercase tracking-[0.08em] ${
        ongoing
          ? "bg-ember/12 text-ember-text"
          : "bg-violet-wash text-violet"
      }`}
    >
      <span
        aria-hidden="true"
        className={`block h-[6px] w-[6px] rounded-full ${
          ongoing ? "bg-ember" : "bg-violet"
        }`}
      />
      {ongoing ? "Ongoing" : "Completed"}
    </span>
  );
}

function ProjectCard({ project, n }: { project: Project; n: number }) {
  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-rule bg-surface transition-[border-color,box-shadow,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:-translate-y-[3px] hover:border-violet/40 hover:shadow-[var(--shadow-card)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* Accent rule across the top — the card's one piece of colour, and it
          fills in on hover. */}
      <span
        aria-hidden="true"
        className="block h-[3px] w-[var(--s-12)] bg-ember transition-[width] duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover/card:w-full motion-reduce:transition-none"
      />

      <div className="flex h-full flex-col p-[var(--s-6)]">
        <div className="flex items-center justify-between gap-[var(--s-4)]">
          <span className="text-index text-grey-400">
            {String(n).padStart(2, "0")}
          </span>
          <StatusChip status={project.status} />
        </div>

        <h3 className="text-h3 mt-[var(--s-4)] text-ink">{project.title}</h3>

        <p className="text-small mt-[var(--s-2)] font-[550] text-ember-text">
          {project.client}
        </p>

        <p className="text-body mt-[var(--s-4)] text-grey-600">
          {project.description}
        </p>

        <p className="mt-auto border-t border-rule pt-[var(--s-4)] font-mono text-small text-grey-400">
          {project.status === "Ongoing"
            ? `${project.period.replace(" —", "")} — ongoing`
            : "Completed"}
        </p>
      </div>
    </article>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous projects" : "Next projects"}
      className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-rule-strong text-ink transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:border-violet hover:bg-violet hover:text-bone motion-reduce:transition-none"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className={`h-4 w-4 ${dir === "prev" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h9" />
        <path d="M8.5 4.5 12 8l-3.5 3.5" />
      </svg>
    </button>
  );
}

export function ProjectsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Should the timer hold off this tick? Asked fresh every tick rather than
   * tracked in a ref that mouseenter/mouseleave and focus/blur write to.
   * That was the first implementation and it wedges: the pointer does not
   * have to leave the track for the track to leave the pointer — scroll the
   * page and the element slides out from under the cursor with no mouseleave
   * ever dispatched, so the flag stays true and the carousel stops for good.
   * Querying :hover and activeElement at tick time cannot get out of sync
   * with reality, because it is reality.
   */
  const shouldHold = useCallback(() => {
    const track = trackRef.current;
    if (!track || document.hidden) return true;
    if (track.matches(":hover")) return true;
    return track.contains(document.activeElement);
  }, []);

  /** One slide's outer width — the scroll period, gutter included. */
  const slideStep = useCallback(() => {
    const track = trackRef.current;
    const slide = track?.querySelector("li");
    return slide instanceof HTMLElement ? slide.offsetWidth : 0;
  }, []);

  /**
   * One lap: the distance after which the track shows the same thing again.
   * Measured as project-count × slide width, NOT scrollWidth / 2 — the track
   * carries horizontal padding to keep the first card aligned to the page
   * container, and that padding is part of scrollWidth, so half of it lands
   * mid-slide and the loop would creep by that much every time around.
   */
  const lap = useCallback(
    () => PROJECTS.length * slideStep(),
    [slideStep]
  );

  const advance = useCallback(
    (dir: 1 | -1, smooth = true) => {
      const track = trackRef.current;
      const step = slideStep();
      if (!track || step === 0) return;

      // Wrap before moving, not only after. The settle listener below is the
      // other half of this and handles manual swipes, but a scroll event is
      // not something to depend on — background tabs stop dispatching them
      // entirely — so the driven path closes its own loop. Both are
      // idempotent: whichever gets there first, the other sees a position
      // already inside the first lap and does nothing.
      if (dir === 1 && track.scrollLeft >= lap()) {
        track.scrollLeft -= lap();
      }
      // Going back from the very start would hit the wall, so hop forward a
      // full lap first — same content, so nothing is seen to move.
      if (dir === -1 && track.scrollLeft - step < 0) {
        track.scrollLeft += lap();
      }
      track.scrollBy({ left: dir * step, behavior: smooth ? "smooth" : "auto" });
    },
    [slideStep, lap]
  );

  /* Wrap once scrolling has settled, whoever caused it — the timer, the
     arrows, or the reader's own finger. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        const one = lap();
        if (one > 0 && track.scrollLeft >= one) track.scrollLeft -= one;
      }, SETTLE_MS);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [lap]);

  /* Auto-advance. Off entirely under reduced motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (shouldHold()) return;
      advance(1);
    }, ADVANCE_MS);

    return () => clearInterval(id);
  }, [advance, shouldHold]);

  if (!SHOW_OUTCOMES || PROJECTS.length === 0) return null;

  // Rendered twice: the second pass is what the wrap lands on.
  const slides = [...PROJECTS, ...PROJECTS];

  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] section-pad">
        <div className="flex flex-wrap items-end justify-between gap-[var(--s-6)]">
          <SectionHeading
            eyebrow="Projects"
            title="Recent work, real clients"
            lead="Evaluations, supply-chain studies, and survey research delivered for international NGOs, research institutions, and universities."
            className="flex-1 basis-[32rem]"
          />
          <Reveal step={2}>
            <div className="flex items-center gap-[var(--s-3)]">
              <ArrowButton dir="prev" onClick={() => advance(-1)} />
              <ArrowButton dir="next" onClick={() => advance(1)} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* The track breaks out of the centred container so cards can run to
          the right edge of the viewport as they scroll away, rather than
          stopping dead at 1200px. Padding restores the container's left
          alignment. */}
      <div className="mt-[var(--heading-gap)]">
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label="Recent projects"
          // Aligns the first card with the section heading above: the gutter
          // outside the 1200px container, PLUS that container's own --s-6
          // padding. Missing the second term left the cards flush against
          // the viewport edge. 100%, not 100vw — 100vw counts the page
          // scrollbar and would shift everything left of the heading.
          // scroll-pl must repeat the left padding. snap-start aligns a slide
          // to the scrollport edge, not the padding edge, so without it the
          // browser scrolls the padding away to satisfy the snap and the
          // first card ends up flush against the viewport.
          className="flex snap-x snap-mandatory overflow-x-auto px-[calc(max(0px,(100%-1200px)/2)+var(--s-6))] scroll-pl-[calc(max(0px,(100%-1200px)/2)+var(--s-6))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((p, i) => {
            const clone = i >= PROJECTS.length;
            return (
              <li
                key={`${p.slug}-${clone ? "b" : "a"}`}
                aria-hidden={clone || undefined}
                className="w-full flex-none snap-start pr-[var(--s-4)] sm:w-1/2 lg:w-1/3"
              >
                <ProjectCard
                  project={p}
                  n={(i % PROJECTS.length) + 1}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

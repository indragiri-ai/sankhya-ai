import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Buttons (rebuilt 2026-08-13 against the reference set).
 *
 * Fusemachines' primary action is a yellow pill with a black circled arrow
 * sitting inside the left end of it — the single most recognisable element on
 * their page. C3.ai and Scale use plain pills. The near-square 2px buttons
 * from the editorial pass read cheap on white, so the shape is a pill again,
 * and ember finally earns button scale: on a dark hero it is the one thing
 * that should catch the eye.
 *
 *  - ArrowButton   the primary CTA: ember pill, circled arrow, ink text.
 *  - PrimaryButton solid violet pill for in-page actions.
 *  - GhostButton   outline pill, adapts to dark surfaces.
 *  - SecondaryLink text + rule, unchanged in spirit.
 */

const PILL =
  "group inline-flex items-center gap-[var(--s-3)] rounded-[var(--r-pill)] " +
  "text-[0.9375rem] font-[600] leading-none tracking-[-0.01em] " +
  "transition-[background-color,border-color,color] duration-[var(--dur-fast)] ease-[var(--ease-out)] " +
  "motion-reduce:transition-none";

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-8 w-8 flex-none items-center justify-center rounded-full",
        "transition-[transform,background-color,color] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
        "group-hover:translate-x-[3px] motion-reduce:group-hover:translate-x-0",
        className
      )}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h9" />
        <path d="M8.5 4.5 12 8l-3.5 3.5" />
      </svg>
    </span>
  );
}

/** The primary call to action. One per view. */
export function ArrowButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // Ink label on ember, not white: white on #FE5000 measures 3.30:1, which
    // fails AA at this size. Ink on ember is 5.87:1. It is also what the
    // reference does — Fusemachines sets black on its yellow for the same
    // reason. Hover inverts the whole pill rather than darkening the fill,
    // which would have dragged the label back under threshold.
    <Link
      href={href}
      className={cn(
        PILL,
        "bg-ember py-[6px] pl-[6px] pr-[var(--s-6)] text-ink hover:bg-ink hover:text-white",
        className
      )}
    >
      <ArrowGlyph className="bg-ink text-white group-hover:bg-white group-hover:text-ink" />
      {children}
    </Link>
  );
}

export function PrimaryButton({
  href,
  children,
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        PILL,
        "px-[var(--s-6)] py-[var(--s-4)]",
        onDark
          ? "bg-bone text-violet-deep hover:bg-white"
          : "bg-violet text-bone hover:bg-ink",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        PILL,
        "border px-[var(--s-6)] py-[var(--s-4)]",
        onDark
          ? "border-bone/30 text-bone hover:border-bone hover:bg-bone/10"
          : "border-rule-strong text-ink hover:border-violet hover:text-violet",
        className
      )}
    >
      {children}
    </Link>
  );
}

/** Back-compat alias: several pages still import OutlineButton. */
export const OutlineButton = GhostButton;

export function SecondaryLink({
  href,
  children,
  onDark = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-[var(--s-2)] py-[var(--s-2)]",
        "text-[0.9375rem] font-[600] leading-none tracking-[-0.01em]",
        onDark ? "text-bone" : "text-ember-text",
        className
      )}
    >
      <span className="link-sweep">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-4 w-4 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[3px] motion-reduce:group-hover:translate-x-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h9" />
        <path d="M8.5 4.5 12 8l-3.5 3.5" />
      </svg>
    </Link>
  );
}

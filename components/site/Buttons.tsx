import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button patterns (Editorial Institute, 2026-08-12).
 *
 * The pills are gone. A pill is a friendly shape; this brand is selling
 * rigour to banks, universities and INGOs, so the shape is near-square
 * (--r-sm, 2px) and the fill is violet rather than ember. Ember stops being
 * a button colour entirely — at button scale it shouted, and it was the
 * single biggest reason the old site read as a startup landing page.
 *
 *  - PrimaryButton:  violet fill, bone text. The one filled style.
 *  - OutlineButton:  hairline border. Adapts to dark surfaces via onDark.
 *  - SecondaryLink:  text + rule that extends on hover. No arrow bounce.
 */

const BASE =
  "inline-flex items-center justify-center rounded-[var(--r-sm)] px-[var(--s-6)] py-[var(--s-4)] " +
  "text-[0.875rem] font-[550] leading-none tracking-[-0.005em] " +
  "transition-[background-color,border-color,color] duration-[var(--dur-fast)] ease-[var(--ease-out)] " +
  "motion-reduce:transition-none";

export function PrimaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(BASE, "bg-violet text-bone hover:bg-ink", className)}
    >
      {children}
    </Link>
  );
}

export function OutlineButton({
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
        BASE,
        "border",
        onDark
          ? "border-bone/35 text-bone hover:border-bone hover:bg-bone/10"
          : "border-rule-strong text-ink hover:border-ink hover:bg-ink/[0.04]",
        className
      )}
    >
      {children}
    </Link>
  );
}

/**
 * The quiet tertiary action. A 1px rule sits under the label and extends to
 * full width on hover — the same sweep language as body links, so the site
 * has exactly one "this is a link" gesture.
 */
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
        "group inline-flex items-center gap-[var(--s-3)] py-[var(--s-2)]",
        "text-[0.875rem] font-[550] leading-none tracking-[-0.005em]",
        onDark ? "text-bone" : "text-ink",
        className
      )}
    >
      <span className="link-sweep">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-[18px] origin-left transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          "group-hover:scale-x-[1.5] motion-reduce:transition-none motion-reduce:group-hover:scale-x-100",
          onDark ? "bg-bone/60" : "bg-ember"
        )}
      />
    </Link>
  );
}

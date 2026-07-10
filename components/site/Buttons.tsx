import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

/**
 * Button patterns (redesigned 2026-07-10, Fusemachines-inspired pill shape):
 *  - PrimaryButton: ember fill, bone text, pill radius, Magnetic. Hover
 *    deepens to --ember-text and lifts 1px. The one filled style.
 *  - OutlineButton: for dark surfaces — 1.5px bone/40 border, bone text,
 *    hover fills bone/10 and brightens the border.
 *  - SecondaryLink: ink text button, underline sweep, arrow slides 4px.
 */

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
    <Magnetic>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-ember px-[var(--s-8)] py-[var(--s-4)]",
          "text-[0.9375rem] font-[600] leading-none text-white",
          "transition-[background-color,transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          "hover:-translate-y-[1px] hover:bg-ember-text hover:shadow-[0_8px_24px_rgb(254_80_0_/_0.35)]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          className
        )}
      >
        {children}
      </Link>
    </Magnetic>
  );
}

export function OutlineButton({
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
      className={cn(
        "inline-flex items-center justify-center rounded-full border-[1.5px] border-bone/40 px-[var(--s-8)] py-[var(--s-4)]",
        "text-[0.9375rem] font-[600] leading-none text-bone",
        "transition-[border-color,background-color] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
        "hover:border-bone hover:bg-bone/10",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({
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
      className={cn(
        "group inline-flex items-center gap-[var(--s-2)] py-[var(--s-3)]",
        "text-[0.9375rem] font-[500] leading-none text-ink",
        className
      )}
    >
      <span className="link-sweep">{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[4px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        →
      </span>
    </Link>
  );
}

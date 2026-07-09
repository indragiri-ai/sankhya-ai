import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

/**
 * The site's two — and only two — button patterns (Phases 2–3, locked):
 *  - PrimaryButton: ember fill, bone text, --r-sm, Magnetic. The one filled style.
 *  - SecondaryLink: ink text button, underline sweep, arrow slides 4px on hover.
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
          "inline-flex items-center justify-center rounded-[var(--r-sm)] bg-ember px-[var(--s-6)] py-[var(--s-3)]",
          "text-[0.9375rem] font-[500] leading-none text-bone",
          "transition-opacity duration-[var(--dur-fast)] hover:opacity-90",
          className
        )}
      >
        {children}
      </Link>
    </Magnetic>
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

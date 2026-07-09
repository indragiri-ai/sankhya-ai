import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Typographic wordmark lockup. [PLACEHOLDER — awaiting SVG master of the
 * client logo, Build Book §6/§7 item 9.] Until the vector arrives, the mark
 * is set in Geist at nav weight; color inherits so it works on light (ink)
 * and dark (bone) surfaces. Swap the inner span for the SVG when supplied.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Sankhya AI — home"
      className={cn(
        "inline-flex items-baseline gap-[var(--s-2)] font-[550] tracking-[-0.02em] text-[1.25rem] leading-none",
        className
      )}
    >
      <span>Sankhya</span>
      <span className="font-[400]">AI</span>
    </Link>
  );
}

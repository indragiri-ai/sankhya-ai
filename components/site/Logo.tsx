/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Brand lockup (real mark since 2026-07-10, converted from the client's PSD:
 * सं in violet + AI in ember, transparent PNG at public/logo-nav.png).
 * The wordmark text rides alongside so first-time visitors can read the
 * name; color inherits so it works on light (ink) and dark (bone) surfaces.
 */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  /** bone-सं variant for dark surfaces (public/logo-nav-dark.png) */
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Sankhya AI — home"
      className={cn(
        "inline-flex items-center gap-[var(--s-3)] font-[550] tracking-[-0.02em] text-[1.25rem] leading-none",
        className
      )}
    >
      <img
        src={asset(onDark ? "/logo-nav-dark.png" : "/logo-nav.png")}
        alt=""
        className="h-[30px] w-auto"
      />
      <span className="inline-flex items-baseline gap-[var(--s-2)]">
        <span>Sankhya</span>
        <span className="font-[400]">AI</span>
      </span>
    </Link>
  );
}

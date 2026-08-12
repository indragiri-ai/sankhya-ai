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
        "inline-flex items-center gap-[var(--s-3)] leading-none",
        className
      )}
    >
      <img
        src={asset(onDark ? "/logo-nav-dark.png" : "/logo-nav.png")}
        alt=""
        className="h-[28px] w-auto"
      />
      {/* Wordmark in the display serif, small-caps-ish tracking. The mark and
          the name now share a typographic family instead of sitting in
          unrelated voices. */}
      <span className="inline-flex items-baseline gap-[0.3em] font-serif text-[1.1875rem] tracking-[0.01em]">
        <span className="font-[500]">Sankhya</span>
        <span className="font-[400] italic">AI</span>
      </span>
    </Link>
  );
}

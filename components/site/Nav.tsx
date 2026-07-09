"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import { Logo } from "@/components/site/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

/**
 * Nav (Build Book §4, Phase 2 as-built):
 * - Fixed. Transparent over the top of the page; after 24px of scroll:
 *   --bone background, --grey-200 bottom hairline, height 72px → 64px.
 *   Driven by scroll position (rAF-throttled listener), --dur-fast, no bounce.
 * - Active page link: 2px ember underline offset 6px. Hover: underline
 *   sweeps in left→right (the site-wide sweep pattern).
 * - CLS strategy: the nav is fixed and overlays the hero (which manages its
 *   own top offset); interior pages pad their first section by --nav-h.
 * - Mobile (<768px): hamburger → full-screen violet overlay, h2 bone links,
 *   staggered entrance, focus trap, Escape closes, body scroll locked.
 */

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll state, rAF-throttled
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close overlay on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock + focus trap while the overlay is open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const focusables = overlay?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname]
  );

  return (
    <header className="no-print">
      <nav
        aria-label="Main"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,height,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
          scrolled
            ? "h-[var(--nav-h-scrolled)] bg-bone shadow-[0_1px_0_0_var(--grey-200)]"
            : "h-[var(--nav-h)] bg-transparent"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-[var(--s-6)]">
          <Logo className="text-ink" />

          {/* Desktop links */}
          <div className="hidden items-center gap-[var(--s-8)] md:flex">
            <ul className="flex items-center gap-[var(--s-6)]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "link-sweep text-[0.9375rem] font-[500] text-ink",
                      isActive(link.href) &&
                        "underline decoration-ember decoration-2 underline-offset-6"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-[var(--r-sm)] bg-ember px-[var(--s-4)] py-[var(--s-2)] text-[0.875rem] font-[500] leading-[1.5] text-bone transition-opacity duration-[var(--dur-fast)] hover:opacity-90"
              >
                Start a conversation
              </Link>
            </Magnetic>
          </div>

          {/* Mobile toggle — two 1.5px ink lines */}
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-ink transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                open && "translate-y-[3.75px] rotate-45 bg-bone"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-ink transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                open && "-translate-y-[3.75px] -rotate-45 bg-bone"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        data-surface="dark"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[55] flex flex-col justify-between bg-violet px-[var(--s-6)] pb-[var(--s-8)] pt-[calc(var(--nav-h)+var(--s-8))] transition-opacity duration-[var(--dur-fast)] ease-[var(--ease-out)] md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ul className="flex flex-col gap-[var(--s-6)]">
          {[...NAV_LINKS].map((link, i) => (
            <li
              key={link.href}
              style={{
                transitionDelay: open ? `calc(${i} * var(--stagger))` : "0ms",
              }}
              className={cn(
                "transition-[opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:transition-none",
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[var(--reveal-y)] opacity-0 motion-reduce:translate-y-0"
              )}
            >
              <Link
                href={link.href}
                tabIndex={open ? 0 : -1}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "text-h2 text-bone",
                  isActive(link.href) &&
                    "underline decoration-ember decoration-2 underline-offset-6"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${CONTACT.email}`}
          tabIndex={open ? 0 : -1}
          className="font-mono text-small text-bone/80"
        >
          {CONTACT.email}
        </a>
      </div>
    </header>
  );
}

import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { CONTACT, LEGAL_ENTITY } from "@/lib/constants";

/**
 * Footer (Build Book §4, Phase 2 as-built): --ink background, bone/grey text.
 * Signature detail: the Devanagari wordmark सांख्य set at display scale in
 * --grey-600 — the one expressive moment. It uses the documented system
 * Devanagari fallback stack (Mukta only ships if Nepali is approved) and
 * carries lang="sa" plus a visually-hidden transliteration for screen readers.
 * Four columns desktop, plain stacked lists mobile — no accordions.
 */

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer data-surface="dark" className="bg-ink text-bone no-print">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-16)]">
        {/* Devanagari typographic object */}
        <p className="devanagari select-none text-right text-[clamp(4rem,12vw,9rem)] font-[550] leading-none text-grey-600">
          <span lang="sa" aria-hidden="true">
            सांख्य
          </span>
          <span className="sr-only">Sāṅkhya — enumeration</span>
        </p>

        <div className="mt-[var(--s-12)] grid grid-cols-1 gap-[var(--s-12)] sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Company">
            <h2 className="text-eyebrow text-grey-400">Company</h2>
            <ul className="mt-[var(--s-4)] flex flex-col gap-[var(--s-3)]">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-sweep text-small text-bone/90">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-eyebrow text-grey-400">Services</h2>
            <ul className="mt-[var(--s-4)] flex flex-col gap-[var(--s-3)]">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="link-sweep text-small text-bone/90"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow text-grey-400">Contact</h2>
            <ul className="mt-[var(--s-4)] flex flex-col gap-[var(--s-3)] font-mono text-small">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-sweep text-bone/90">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="link-sweep text-bone/90">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-grey-400">{CONTACT.city}</li>
              {CONTACT.linkedin ? (
                <li>
                  <a
                    href={CONTACT.linkedin}
                    rel="noopener noreferrer"
                    className="link-sweep text-bone/90"
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <nav aria-label="Legal">
            <h2 className="text-eyebrow text-grey-400">Legal</h2>
            <ul className="mt-[var(--s-4)] flex flex-col gap-[var(--s-3)]">
              <li>
                <Link href="/legal/privacy" className="link-sweep text-small text-bone/90">
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-[var(--s-16)] flex flex-col gap-[var(--s-3)] border-t border-bone/10 pt-[var(--s-6)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-grey-400">
            © {new Date().getFullYear()} {LEGAL_ENTITY}. All rights reserved.
          </p>
          <p className="font-mono text-small text-grey-400">Built in Nepal</p>
        </div>
      </div>
    </footer>
  );
}

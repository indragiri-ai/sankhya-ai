import type { Metadata } from "next";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Sankhya AI website handles the data you give it.",
};

/**
 * /legal/privacy (Phase 9) — the minimal, honest draft: it describes only
 * what the site actually does. No boilerplate clauses for features that
 * don't exist. The review banner stays until legal sign-off is confirmed.
 *
 * [DRAFT — REQUIRES LEGAL REVIEW]
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--section-y)] pt-[calc(var(--nav-h)+var(--s-16))]">
      <p className="inline-block rounded-[var(--r-sm)] border border-ember-text/40 px-[var(--s-3)] py-[var(--s-2)] font-mono text-small text-ember-text">
        DRAFT — REQUIRES LEGAL REVIEW
      </p>
      <h1 className="text-h1 mt-[var(--s-6)] text-violet">Privacy</h1>
      <div className="mt-[var(--s-8)] flex max-w-[68ch] flex-col gap-[var(--s-6)] text-body text-grey-600">
        <p>
          This page describes what this website actually does with data. It
          is short because the site does very little with it.
        </p>

        <h2 className="text-h3 mt-[var(--s-4)] text-ink">The contact form</h2>
        <p>
          If you submit the contact form, we receive the information you
          typed: your name, organization (if given), email address, area of
          interest, and message. It is delivered to us as an email and used
          for one purpose — replying to you. We do not add you to mailing
          lists, and we do not share this information with anyone else.
        </p>

        <h2 className="text-h3 mt-[var(--s-4)] text-ink">Analytics</h2>
        <p>
          If analytics are enabled, this site uses Plausible, a
          privacy-focused tool that counts visits without cookies and
          without identifying individual visitors. We see aggregate numbers
          — pages viewed, referral sources — not people.
        </p>

        <h2 className="text-h3 mt-[var(--s-4)] text-ink">Cookies</h2>
        <p>This site sets no advertising or tracking cookies.</p>

        <h2 className="text-h3 mt-[var(--s-4)] text-ink">Questions</h2>
        <p>
          Write to{" "}
          <a href={`mailto:${CONTACT.email}`} className="link-sweep text-ember-text">
            {CONTACT.email}
          </a>{" "}
          and a person will answer.
        </p>
      </div>
    </div>
  );
}

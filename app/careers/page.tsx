import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work at Sankhya AI — we welcome applications from people who want to build data and AI systems in Nepal.",
};

/**
 * /careers (added 2026-07-09, client decision: general-interest only).
 * No open-roles list — a single honest invitation to write in. When the
 * client starts listing specific positions, this page grows a roles list;
 * until then it stays deliberately small.
 */
export default function CareersPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-24)] pt-[calc(var(--nav-h)+var(--s-16))] md:pb-[var(--s-32)]">
      <Reveal step={0}>
        <p className="text-eyebrow text-grey-600">Careers</p>
      </Reveal>
      <Reveal step={1}>
        <h1 className="text-h1 mt-[var(--s-4)] max-w-[20ch] text-ink">
          Work with us.
        </h1>
      </Reveal>

      <div className="mt-[var(--s-12)] flex max-w-[68ch] flex-col gap-[var(--s-6)]">
        <Reveal step={2}>
          <p className="text-body-lg text-ink">
            We don&rsquo;t have specific positions listed right now — but we
            are always interested in hearing from people who want to build
            data and AI systems in Nepal to an international standard.
          </p>
        </Reveal>
        <Reveal step={3}>
          <p className="text-body text-grey-600">
            If that sounds like you — engineer, analyst, or something we
            haven&rsquo;t thought of yet — send a short note about yourself
            and what you&rsquo;d want to work on, along with anything
            you&rsquo;ve built, to{" "}
            <a
              href={`mailto:${CONTACT.email}?subject=Application — Sankhya AI`}
              className="link-sweep text-ember-text"
            >
              {CONTACT.email}
            </a>
            . A real person reads every one.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

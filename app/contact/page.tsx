import type { Metadata } from "next";
import { CONTACT } from "@/lib/constants";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Sankhya AI — tell us about your data, your systems, or the decision you need to make measurable.",
};

/**
 * /contact (Phase 8 as-built). Two columns desktop (form ~60% left, direct
 * block right); stacked mobile with the direct block FIRST — a mobile
 * visitor often just wants the phone number. No map embed (deliberate:
 * a third-party iframe is a performance and consent liability).
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-24)] pt-[calc(var(--nav-h)+var(--s-16))] md:pb-[var(--s-32)]">
      <Reveal step={0}>
        <h1 className="text-h1 max-w-[20ch] text-ink">Start a conversation.</h1>
      </Reveal>
      <Reveal step={1}>
        <p className="text-body-lg measure mt-[var(--s-4)] text-grey-600">
          Tell us what you&rsquo;re working with — your message goes straight
          to the team, not a ticket queue.
        </p>
      </Reveal>

      <div className="mt-[var(--s-16)] grid grid-cols-1 gap-[var(--s-16)] lg:grid-cols-[3fr_2fr]">
        {/* Direct block renders first in DOM order on mobile via order utilities */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
        <aside className="order-1 lg:order-2">
          <Reveal>
            <h2 className="text-eyebrow text-grey-600">Direct</h2>
            <ul className="mt-[var(--s-6)] flex flex-col gap-[var(--s-4)] font-mono text-small">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-sweep text-ember-text">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                  className="link-sweep text-ink"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-grey-600">{CONTACT.city}</li>
            </ul>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}

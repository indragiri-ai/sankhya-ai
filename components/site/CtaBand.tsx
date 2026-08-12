import { Reveal } from "@/components/motion/Reveal";
import { OutlineButton } from "@/components/site/Buttons";
import { CONTACT } from "@/lib/constants";

/**
 * CtaBand (Editorial Institute, 2026-08-12).
 *
 * Flat --violet-deep, no radial gradient. The old version borrowed the
 * hero's glow to "bookend" the page; with the gradients gone from the hero
 * there is nothing to echo, and a flat field of the brand colour under a
 * serif line is stronger than a lit one. The email sits alongside the button
 * because institutional buyers write rather than click.
 */
export function CtaBand({
  heading = "Bring us a problem with numbers in it.", // [PLACEHOLDER — verify]
  buttonLabel = "Start a conversation",
}: {
  heading?: string;
  buttonLabel?: string;
}) {
  return (
    <section data-surface="dark" className="bg-violet-deep">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
        <Reveal step={0}>
          <span aria-hidden="true" className="tick mb-[var(--s-8)]" />
        </Reveal>
        <Reveal step={1}>
          <h2 className="text-h2 max-w-[20ch] text-bone">{heading}</h2>
        </Reveal>
        <Reveal step={2}>
          <div className="mt-[var(--s-12)] flex flex-wrap items-center gap-x-[var(--s-8)] gap-y-[var(--s-4)]">
            <OutlineButton href="/contact" onDark>
              {buttonLabel}
            </OutlineButton>
            <a
              href={`mailto:${CONTACT.email}`}
              className="link-sweep font-mono text-[0.8125rem] tracking-[0.02em] text-bone/70 hover:text-bone"
            >
              {CONTACT.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

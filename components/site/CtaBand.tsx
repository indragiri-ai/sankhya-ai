import { Reveal } from "@/components/motion/Reveal";
import { OutlineButton } from "@/components/site/Buttons";
import { CONTACT } from "@/lib/constants";

/**
 * CtaBand (Editorial Institute, 2026-08-12).
 *
 * Flat field, no radial gradient. The old version borrowed the hero's glow
 * to "bookend" the page; with the gradients gone from the hero there is
 * nothing to echo, and a flat field of the brand colour under a serif line
 * is stronger than a lit one. The email sits alongside the button because
 * institutional buyers write rather than click.
 *
 * Merged into the footer 2026-08-13. It was --violet-deep, which put a hard
 * seam between it and the --ink footer directly below — two dark bands of
 * slightly different colour reading as two more sections on a page that
 * already had too many. It is now --ink with no bottom padding, and the
 * footer opens with no top padding, so the call to action and the footer
 * are one continuous closing block.
 *
 * It stays a separate component rather than moving inside Footer because
 * /approach and /services each pass their own heading, and the footer is
 * mounted once in the layout where those per-page strings cannot reach it.
 */
export function CtaBand({
  heading = "Bring us a problem with numbers in it.", // [PLACEHOLDER — verify]
  buttonLabel = "Start a conversation",
}: {
  heading?: string;
  buttonLabel?: string;
}) {
  return (
    <section data-surface="dark" className="bg-ink">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] pb-[var(--s-12)] pt-[var(--section-y)] md:pt-[var(--section-y-lg)]">
        <Reveal step={0}>
          <span aria-hidden="true" className="tick mb-[var(--s-6)]" />
        </Reveal>
        <Reveal step={1}>
          <h2 className="text-h2 max-w-[22ch] text-bone">{heading}</h2>
        </Reveal>
        <Reveal step={2}>
          <div className="mt-[var(--s-8)] flex flex-wrap items-center gap-x-[var(--s-8)] gap-y-[var(--s-4)]">
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

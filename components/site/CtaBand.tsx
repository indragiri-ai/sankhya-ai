import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton } from "@/components/site/Buttons";

/**
 * CtaBand (Build Book §4, Phase 8 as-built): flat --violet, one h2 line,
 * one ember button. Reveal entrance only — no Bindu Field reprise; the
 * band's power is its quiet (deliberate negative decision, Build Book §5).
 * Reused at the foot of interior pages with per-page copy via prop.
 */
export function CtaBand({
  heading = "Bring us a problem with numbers in it.", // [PLACEHOLDER — verify]
  buttonLabel = "Start a conversation",
}: {
  heading?: string;
  buttonLabel?: string;
}) {
  return (
    <section data-surface="dark" className="relative overflow-hidden bg-violet">
      {/* Same quiet radial depth as the hero — bookends the page */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 120% at 85% 100%, rgb(74 20 140 / 0.55) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-[var(--s-8)] px-[var(--s-6)] py-[var(--s-24)] md:py-[var(--s-32)]">
        <Reveal step={0}>
          <h2 className="text-h2 max-w-[24ch] text-bone">{heading}</h2>
        </Reveal>
        <Reveal step={1}>
          <PrimaryButton href="/contact">{buttonLabel}</PrimaryButton>
        </Reveal>
      </div>
    </section>
  );
}

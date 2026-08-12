import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * SectionHeading (Editorial Institute, 2026-08-12).
 *
 * Every section now opens with a printed index line — "01 / WHO WE ARE" —
 * sitting above a hairline, then the serif h2, then the lead. The numbering
 * is the spine of the direction: it tells the reader the page is an ordered
 * document rather than a stack of marketing blocks, and it gives the ember
 * accent a job that is structural instead of decorative.
 *
 * Pass `index` as a zero-padded string ("01"). Omit it on pages where the
 * section stands alone.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  onDark = false,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Reveal step={0}>
        <div
          className={cn(
            "flex items-center gap-[var(--s-3)] border-t pt-[var(--s-4)]",
            onDark ? "border-bone/20" : "border-rule-strong"
          )}
        >
          {index ? (
            <span className={cn("text-index", onDark ? "text-ember" : "text-ember-text")}>
              {index}
            </span>
          ) : null}
          <span className={cn("text-eyebrow", onDark ? "text-bone/65" : "text-grey-600")}>
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal step={1}>
        <h2
          className={cn(
            "text-h2 mt-[var(--s-6)] max-w-[20ch]",
            onDark ? "text-bone" : "text-violet"
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal step={2}>
          <p
            className={cn(
              "text-body-lg measure-lead mt-[var(--s-4)]",
              onDark ? "text-bone/80" : "text-grey-600"
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

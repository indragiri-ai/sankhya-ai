import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * SectionHeading (rebuilt 2026-08-13).
 *
 * The numbered index over a hairline was the signature of the editorial
 * direction — it made the page read as a printed document, which is exactly
 * the register that was wrong. The reference set opens sections with a short
 * coloured eyebrow and a heavy heading, nothing else. That is what this is.
 *
 * `index` is still accepted so call sites do not all have to change at once,
 * but it is no longer rendered.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  onDark = false,
  align = "left",
  className,
}: {
  /** @deprecated no longer rendered — kept so existing call sites compile */
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className
      )}
    >
      <Reveal step={0}>
        <p className={cn("text-eyebrow", onDark ? "text-ember" : "text-ember-text")}>
          {eyebrow}
        </p>
      </Reveal>

      <Reveal step={1}>
        <h2
          className={cn(
            "text-h2 mt-[var(--s-4)] max-w-[24ch]",
            onDark ? "text-bone" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal step={2}>
          <p
            className={cn(
              "text-body-lg mt-[var(--s-4)] max-w-[62ch]",
              onDark ? "text-bone/70" : "text-grey-600"
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

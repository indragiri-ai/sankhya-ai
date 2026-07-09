import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * SectionHeading (Build Book §4): eyebrow (mono) + h2 + optional lead.
 * Consistent stack, --s-4 gaps. The only uppercase on the site is here.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  onDark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[var(--s-4)]", className)}>
      <Reveal step={0}>
        <p
          className={cn(
            "text-eyebrow",
            onDark ? "text-ember" : "text-grey-600"
          )}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal step={1}>
        <h2 className={cn("text-h2", onDark ? "text-bone" : "text-ink")}>
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal step={2}>
          <p
            className={cn(
              "text-body-lg measure",
              onDark ? "text-bone/90" : "text-grey-600"
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

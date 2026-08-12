import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * PageHeader (Editorial Institute, 2026-08-12).
 *
 * Every interior page opened with its own hand-rolled eyebrow + h1 + lead
 * stack, which meant five near-identical blocks that had already begun to
 * drift apart in spacing. This is the single masthead: rule, eyebrow, serif
 * h1 in violet, lead. Changing the opening of the site now means changing
 * one file.
 *
 * The h1 is violet rather than ink — on interior pages the headline is the
 * only brand-coloured element above the fold, and it does the work the old
 * ember accents used to do without shouting.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "px-[var(--s-6)] pb-[var(--s-16)] pt-[calc(var(--nav-h)+var(--s-16))] md:pb-[var(--s-24)]",
        className
      )}
    >
      <Reveal step={0}>
        <div className="flex items-center gap-[var(--s-3)] border-t border-rule-strong pt-[var(--s-4)]">
          <span aria-hidden="true" className="tick" />
          <p className="text-eyebrow text-grey-600">{eyebrow}</p>
        </div>
      </Reveal>
      <Reveal step={1}>
        <h1 className="text-h1 mt-[var(--s-8)] max-w-[18ch] text-violet">{title}</h1>
      </Reveal>
      {lead ? (
        <Reveal step={2}>
          <p className="text-body-lg measure-lead mt-[var(--s-6)] text-grey-600">{lead}</p>
        </Reveal>
      ) : null}
    </header>
  );
}

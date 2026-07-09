import { Hero } from "@/components/home/Hero";
import { CredStrip } from "@/components/home/CredStrip";
import { NameBand } from "@/components/home/NameBand";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ApproachSequence } from "@/components/home/ApproachSequence";
import { Outcomes } from "@/components/home/Outcomes";
import { InstitutionsBlock } from "@/components/home/InstitutionsBlock";
import { CtaBand } from "@/components/site/CtaBand";

/**
 * Home — locked section order (Phase 4 §B):
 * Hero → Credibility strip → Name band → Services → Approach → Outcomes →
 * Institutions → CTA → Footer.
 * CredStrip and Outcomes are evidence-gated (lib/flags.ts) and render
 * nothing until real facts arrive — the order holds when they return.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CredStrip />
      <NameBand />
      <ServicesGrid />
      <ApproachSequence />
      <Outcomes />
      <InstitutionsBlock />
      <CtaBand />
    </>
  );
}

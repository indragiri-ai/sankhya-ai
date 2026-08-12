import { Hero } from "@/components/home/Hero";
import { CredStrip } from "@/components/home/CredStrip";
import { NameBand } from "@/components/home/NameBand";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ApproachSequence } from "@/components/home/ApproachSequence";
import { Outcomes } from "@/components/home/Outcomes";
import { InstitutionsBlock } from "@/components/home/InstitutionsBlock";
import { MissionVision } from "@/components/site/MissionVision";
import { CtaBand } from "@/components/site/CtaBand";

/**
 * Home — section order (amended 2026-08-13):
 * Hero (now carries the 5/3/6 figures) → Trusted-by strip → Mission/Vision →
 * Services → Approach → Projects → Name band → Institutions → CTA → Footer.
 *
 * StatsBand is gone as a standalone section: its figures moved into the hero,
 * where they fill the fold with proof. The numbered index therefore runs
 * 01–06 rather than 01–07 — contiguously, which is the whole point of
 * numbering the sections at all.
 *
 * CredStrip and Outcomes remain evidence-gated (lib/flags.ts).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CredStrip />
      <MissionVision />
      <ServicesGrid />
      <ApproachSequence />
      <Outcomes />
      <NameBand />
      <InstitutionsBlock />
      <CtaBand />
    </>
  );
}

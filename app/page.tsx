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
 * Home — section order (amended 2026-07-10 redesign):
 * Dark hero → Trusted-by strip → Mission/Vision → Services → Approach →
 * Projects → Name band → Institutions → CTA → Footer.
 * The name band moved below projects: it now acts as the brand-story
 * breath between evidence (projects) and posture (institutions).
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

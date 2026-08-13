import { Hero } from "@/components/home/Hero";
import { CredStrip } from "@/components/home/CredStrip";
import { MissionVision } from "@/components/site/MissionVision";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ApproachSequence } from "@/components/home/ApproachSequence";
import { ProjectsCarousel } from "@/components/home/ProjectsCarousel";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { CtaBand } from "@/components/site/CtaBand";

/**
 * Home — section order (amended 2026-08-13, second pass):
 * Hero → Trusted-by strip → Mission/Vision band → Services → Approach →
 * Projects → Latest updates → CTA + Footer.
 *
 * Cut this pass, on the client's instruction that the page ran to too many
 * sections. Nothing was deleted — the components still exist and each goes
 * back with one import and one line:
 *
 *   - NameBand ("The name / संख्या"). The client asked for this one by name.
 *     The Devanagari wordmark still opens the footer, so the brand's best
 *     asset has not left the page.
 *   - InstitutionsBlock ("Built for organizations that answer to someone").
 *     Two paragraphs of prose with nothing to look at, asserting a working
 *     style that Approach and Projects now demonstrate instead.
 *   - CtaBand is no longer its own band: it shares the footer's --ink
 *     surface and reads as the head of the closing block.
 *
 * Outcomes.tsx is superseded by ProjectsCarousel and no longer rendered.
 *
 * CredStrip, the projects carousel and LatestUpdates stay evidence-gated
 * (lib/flags.ts).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CredStrip />
      <MissionVision />
      <ServicesGrid />
      <ApproachSequence />
      <ProjectsCarousel />
      <LatestUpdates />
      <CtaBand />
    </>
  );
}

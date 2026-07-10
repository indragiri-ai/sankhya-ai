/**
 * PROJECTS (real, from the client's Projects.docx, 2026-07-10) — replaces
 * the earlier [SAMPLE] case-study model. Deliberately no outcome metrics:
 * none were supplied, and this site never invents figures. Each entry is a
 * factual record: what, for whom, when.
 */

export type Project = {
  slug: string;
  title: string;
  client: string;
  period: string;
  status: "Ongoing" | "Completed";
  description: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "brick-plus-endline",
    title: "Endline Evaluation of the Brick Plus Project",
    client: "World Vision International Nepal",
    period: "March 2026 —",
    status: "Ongoing",
    description:
      "Impact evaluation of the Brick Plus project across the brick-kiln industry in Lalitpur and Chandragiri municipalities.",
  },
  {
    slug: "large-cardamom-supply-chain",
    title: "Supply Chain Analysis of Large Cardamom",
    client: "Neeti Anusandhan Pratishthan",
    period: "February 2025 —",
    status: "Ongoing",
    description:
      "End-to-end analysis of Nepal's large-cardamom supply chain, tracked from farms in eastern Nepal to Siliguri, the major hub for exports.",
  },
  {
    slug: "quota-system-attitudes",
    title: "Attitudes About the Quota System Among Public-Sector Workers",
    client: "University of Pittsburgh, USA",
    period: "April 2025 —",
    status: "Ongoing",
    description:
      "Nationwide primary data collection from government officers across Nepal for a study of attitudes toward the quota system.",
  },
  {
    slug: "urbanisation-landscape",
    title: "Landscape Analysis of Urbanisation in Nepal",
    client: "World Vision International Nepal",
    period: "Completed",
    status: "Completed",
    description:
      "Examined the impact of urbanisation on children across Madhyapur Thimi, Birendranagar, Nepalgunj, and Janakpur — desk review, secondary data analysis, key-informant interviews and focus groups, national policy review, and local stakeholder mapping.",
  },
  {
    slug: "child-trafficking-research",
    title: "Internal Child Sex Trafficking in Nepal",
    client: "Anahata Nepal",
    period: "Completed",
    status: "Completed",
    description:
      "Research into the drivers of internal child sex trafficking, profiling of perpetrators, and the roles of major stakeholders.",
  },
  {
    slug: "ai-awareness-nepal",
    title: "Awareness and Use of AI Among Professionals in Nepal",
    client: "Sankhya — internal research",
    period: "Completed",
    status: "Completed",
    description:
      "Exploratory study of AI awareness and usage patterns among professionals in Nepal — survey instrument design, KoboToolbox data collection, and end-to-end data quality control.",
  },
];

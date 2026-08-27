import type { Metadata } from "next";
import { ProjectCaseStudy } from "../../case-study-page";

export const metadata: Metadata = {
  title: "Residential Exterior Design & 3D Rendering Case Study | Artimist",
  description: "Custom residential exterior design and 3D rendering case study exploring massing, material, landscape and architectural visualization for a contemporary home.",
  alternates: { canonical: "/case-studies/residential-exterior-design" },
  openGraph: {
    title: "Residential Exterior Design & 3D Rendering Case Study | Artimist",
    description: "Contemporary home exterior design developed through architecture, landscape and photoreal visualization.",
    url: "https://www.artimistproductions.com/case-studies/residential-exterior-design",
    type: "article",
  },
};

export default function ResidentialExteriorCaseStudy() {
  return <ProjectCaseStudy
    slug="residential-exterior-design"
    eyebrow="Residential / architecture / visualization"
    title="Residential Exterior Design & Visualization"
    summary="A contemporary home exterior study developed around massing, timber, glass, landscape and the experience of approach, then tested through photoreal architectural visualization."
    region="International residential"
    hero={{ src: "/img/resext03.webp", alt: "Contemporary residential exterior among pine trees", caption: "Residential exterior design and visualization / Artimist Productions" }}
    services={["Residential Design", "Exterior Design", "Landscape Direction", "3D Rendering"]}
    brief="A house exterior has to work at several distances: from the street, during approach, at the entry and from the landscape immediately around it. The design study focused on balancing a contemporary architectural language with warmth, privacy and a believable relationship to the wooded setting."
    approach={[
      "Develop the overall massing and roof/volume relationships before relying on surface materials to create character.",
      "Use timber, glazing and darker architectural elements to create contrast while keeping the exterior tied to the surrounding landscape.",
      "Test the design through carefully framed exterior renders so arrival, scale, lighting and material decisions can be evaluated together.",
    ]}
    deliverables={["Residential exterior design direction", "Massing and façade studies", "Material palette development", "Landscape relationship studies", "Photoreal exterior rendering", "Presentation imagery"]}
    gallery={[
      { src: "/img/resext01.webp", alt: "Contemporary home exterior visualization at dusk", caption: "Approach view / architecture and landscape" },
      { src: "/img/resext02.webp", alt: "Modern house exterior with timber and glass", caption: "Material and massing study" },
    ]}
    demonstrates="Artimist can connect custom home design and architectural visualization in one workflow, allowing the exterior architecture, materials and setting to be reviewed as a coherent design rather than as separate deliverables."
    related={[
      { href: "/custom-house-design", label: "Custom House Design" },
      { href: "/visualization", label: "Architectural Visualization" },
      { href: "/services/architectural-rendering", label: "Architectural Rendering" },
      { href: "/residential", label: "Residential Work" },
    ]}
  />;
}

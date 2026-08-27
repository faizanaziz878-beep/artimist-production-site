import type { Metadata } from "next";
import { ProjectCaseStudy } from "../../case-study-page";

export const metadata: Metadata = {
  title: "Whole-Home Interior Design & 3D Visualization Case Study | Artimist",
  description: "Residential interior design and 3D visualization case study covering bedrooms, dressing, media and living spaces with coordinated material, lighting and furniture planning.",
  alternates: { canonical: "/case-studies/home-interior-design" },
  openGraph: {
    title: "Whole-Home Interior Design & 3D Visualization Case Study | Artimist",
    description: "A residential interior application developed across multiple rooms through material, lighting and 3D visualization.",
    url: "https://www.artimistproductions.com/case-studies/home-interior-design",
    type: "article",
  },
};

export default function HomeInteriorCaseStudy() {
  return <ProjectCaseStudy
    slug="home-interior-design"
    eyebrow="Residential / interior design / 3D visualization"
    title="Whole-Home Interior Design & 3D Visualization"
    summary="A coordinated residential interior application developed across bedrooms, dressing, media and living spaces so material, joinery, furniture and lighting read as one home rather than a sequence of unrelated rooms."
    region="International residential"
    hero={{ src: "/img/homeint03.webp", alt: "Warm contemporary residential interior visualization", caption: "Residential interior design and visualization / Artimist Productions" }}
    services={["Interior Design", "Space Planning", "Lighting", "Joinery", "3D Visualization"]}
    brief="The challenge in a whole-home interior is consistency without repetition. Each room has a different use, level of privacy and lighting condition, but the material palette, furniture language and detailing still need to feel related. The work therefore focused on establishing a shared interior language and then adapting it room by room."
    approach={[
      "Define a restrained material and lighting language that can carry across private and social spaces without making every room identical.",
      "Resolve furniture, storage and joinery as part of the spatial design so circulation and daily use remain practical before styling is added.",
      "Use 3D visualization as a decision tool for proportion, material, lighting and atmosphere before the design moves further into procurement or construction coordination.",
    ]}
    deliverables={["Interior design direction", "Furniture and layout planning", "Joinery and material studies", "Lighting direction", "Room-by-room 3D visualization", "Presentation imagery"]}
    gallery={[
      { src: "/img/homeint01.webp", alt: "Residential bedroom interior visualization", caption: "Bedroom / material and lighting study" },
      { src: "/img/homeint04.webp", alt: "Contemporary residential interior with warm materials", caption: "Whole-home interior language / coordinated visualization" },
    ]}
    demonstrates="Artimist can take a homeowner from room planning and material direction into realistic 3D interior visualization, helping major spatial and aesthetic decisions become visible before they are expensive to change on site."
    related={[
      { href: "/3d-interior-design-service", label: "3D Interior Design Service" },
      { href: "/services/3d-interior-rendering", label: "3D Interior Rendering" },
      { href: "/custom-house-design", label: "Custom House Design" },
      { href: "/residential", label: "Residential Work" },
    ]}
  />;
}

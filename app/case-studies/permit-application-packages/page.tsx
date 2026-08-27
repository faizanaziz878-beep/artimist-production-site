import type { Metadata } from "next";
import { ProjectCaseStudy } from "../../case-study-page";

export const metadata: Metadata = {
  title: "Permit Drawing & Application Package Case Study | Artimist",
  description: "Residential and architectural permit drawing package case study showing organized plan-review documentation, schedules, egress information and coordination support.",
  alternates: { canonical: "/case-studies/permit-application-packages" },
  openGraph: {
    title: "Permit Drawing & Application Package Case Study | Artimist",
    description: "Technical drawing package organization for permit and plan-review workflows.",
    url: "https://www.artimistproductions.com/case-studies/permit-application-packages",
    type: "article",
  },
};

export default function PermitPackageCaseStudy() {
  return <ProjectCaseStudy
    slug="permit-application-packages"
    eyebrow="Technical production / permit documentation"
    title="Permit Application Drawing Packages"
    summary="A technical documentation workflow focused on making permit and plan-review information easy to navigate: clear sheets, code data, egress information, schedules and coordinated architectural content."
    region="United States / jurisdiction-specific support"
    hero={{ src: "/img/permit01.webp", alt: "Architectural permit application drawing sheet prepared by Artimist Productions", caption: "Permit documentation / sheet organization" }}
    services={["Permit Drawings", "CAD Drafting", "Construction Documentation", "Coordination Support"]}
    brief="Permit packages are judged not only by whether information exists, but by whether a reviewer can find, cross-check and understand it. The production task was to organize the architectural information into a clear submission structure while keeping coordination visible between drawings, schedules and code-related content."
    approach={[
      "Build a consistent sheet hierarchy so cover information, code data, plans, elevations, sections, schedules and details can be reviewed in a predictable order.",
      "Cross-check the drawing set for consistency between dimensions, room information, egress paths, annotations and related schedules before issue.",
      "Keep the package editable and reviewable so comments from the client, local consultant or authority can be incorporated without rebuilding the set from scratch.",
    ]}
    deliverables={["Permit-plan drafting support", "Cover and code-information sheets", "Plans, elevations and sections", "Schedules and annotations", "Redline incorporation", "PDF and editable source-file handover as scoped"]}
    gallery={[
      { src: "/img/permit02.webp", alt: "Permit drawing set with architectural plan information", caption: "Architectural plan information / review-ready layout" },
      { src: "/img/permit03.webp", alt: "Technical permit documentation sheet", caption: "Technical drawing coordination and presentation" },
    ]}
    demonstrates="Artimist can support residential and architectural drafting teams with structured permit-documentation production, redline resolution and coordinated drawing sets while preserving the distinction between production support and jurisdiction-specific professional responsibility."
    note="Permit, planning, code-compliance and professional-stamp requirements vary by jurisdiction. Artimist provides documentation and coordination support according to the agreed scope and works with locally licensed professionals where local law or the authority having jurisdiction requires them."
    related={[
      { href: "/residential-renovation-permit-drawings", label: "Renovation & Permit Drawings" },
      { href: "/permit-drawing-services", label: "Permit Drawing Services" },
      { href: "/construction-documentation-services", label: "Construction Documentation" },
      { href: "/bim-drafting", label: "BIM & Drafting" },
    ]}
  />;
}

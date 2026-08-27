import { serveLegacySeo } from "../../lib/legacy-seo-page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return serveLegacySeo({
    file: "bimdrafting.html",
    canonical: "/bim-drafting",
    title: "BIM, Revit & CAD Drafting Services | Artimist Productions",
    description: "BIM, Revit and CAD drafting services for architecture, development and construction teams worldwide, including Scan-to-BIM, drawing production, model coordination and permit documentation support.",
    serviceName: "BIM, Revit & CAD Drafting Services",
    serviceType: ["BIM Modeling", "Revit Drafting", "CAD Drafting", "Scan-to-BIM", "Model Coordination", "Construction Documentation"],
    intro: "For teams that need more technical depth, Artimist has dedicated pages for Revit production, BIM modeling, drafting and construction-documentation support.",
    related: [
      { href: "/revit-drafting-services", label: "Revit Drafting Services", note: "RVT production & drawing sets" },
      { href: "/bim-modeling-services", label: "BIM Modeling Services", note: "Models, families & coordination" },
      { href: "/architectural-drafting-services", label: "Architectural Drafting", note: "CAD plans, sections & details" },
      { href: "/construction-documentation-services", label: "Construction Documentation", note: "Technical production support" },
    ],
  });
}

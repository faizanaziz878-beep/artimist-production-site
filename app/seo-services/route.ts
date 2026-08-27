import { serveLegacySeo } from "../../lib/legacy-seo-page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return serveLegacySeo({
    file: "services.html",
    canonical: "/services",
    title: "Architecture, BIM & 3D Visualization Services | Artimist",
    description: "Explore Artimist Productions services across architecture, interiors, BIM, Revit, CAD drafting, architectural visualization, animation, Unreal Engine, branding and digital creative production.",
    serviceName: "Architecture, BIM & 3D Visualization Services",
    serviceType: ["Architecture", "Interior Design", "BIM", "Revit Drafting", "CAD Drafting", "Architectural Visualization", "3D Rendering", "Architectural Animation", "Unreal Engine", "Creative Production"],
    intro: "Use the focused pages below when the project needs a specific residential, technical or visual-production scope, or explore case studies to see how the disciplines connect in real work.",
    related: [
      { href: "/custom-house-design", label: "Residential Design", note: "Custom house plans & floor plans" },
      { href: "/bim-drafting", label: "BIM & Drafting", note: "Revit, CAD & Scan-to-BIM" },
      { href: "/visualization", label: "Visualization", note: "CGI, rendering & animation" },
      { href: "/case-studies", label: "Case Studies", note: "Project evidence across disciplines" },
    ],
  });
}

import { serveLegacySeo } from "../../lib/legacy-seo-page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return serveLegacySeo({
    file: "architecture.html",
    canonical: "/architecture",
    title: "Architecture & Interior Design Services | Artimist Productions",
    description: "International architecture and interior design services for residential, commercial, hospitality and public projects, with planning, spatial strategy, materials, visualization and documentation support.",
    serviceName: "Architecture & Interior Design Services",
    serviceType: ["Architecture", "Interior Design", "Residential Design", "Commercial Architecture", "Spatial Planning", "Documentation Support"],
    intro: "Architecture connects naturally to residential design, interior visualization, technical documentation and project evidence. These focused pages show the related expertise in greater detail.",
    related: [
      { href: "/custom-house-design", label: "Custom House Design", note: "Residential design & floor plans" },
      { href: "/3d-interior-design-service", label: "3D Interior Design", note: "Interiors & home visualization" },
      { href: "/residential-renovation-permit-drawings", label: "Renovation & Permit Drawings", note: "Remodels, additions & documentation" },
      { href: "/case-studies", label: "Architecture Case Studies", note: "Real project evidence" },
    ],
  });
}

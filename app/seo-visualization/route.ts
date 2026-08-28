import { serveLegacySeo } from "../../lib/legacy-seo-page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return serveLegacySeo({
    file: "visualization.html",
    canonical: "/visualization",
    title: "Architectural Visualization & 3D Rendering Studio | Artimist",
    description: "International architectural visualization studio creating photoreal interior and exterior CGI, architectural rendering, animation, walkthroughs and Unreal Engine real-time experiences.",
    serviceName: "Architectural Visualization & 3D Rendering Services",
    serviceType: ["Architectural Visualization", "3D Rendering", "Interior Rendering", "Exterior Rendering", "Architectural Animation", "3D Walkthrough", "Unreal Engine Visualization"],
    intro: "Explore focused rendering, animation and project-evidence pages for clients who need still imagery, interior visualization, property marketing or moving architectural stories.",
    related: [
      { href: "/services/real-estate-rendering", label: "Real Estate Rendering", note: "Property marketing imagery" },
      { href: "/services/architectural-rendering", label: "Architectural Rendering", note: "Interior & exterior CGI" },
      { href: "/services/3d-interior-rendering", label: "3D Interior Rendering", note: "Residential & commercial interiors" },
      { href: "/services/architectural-animation", label: "Architectural Animation", note: "Walkthroughs & cinematic film" },
    ],
  });
}

import type { Metadata } from "next";
import { HomeownerServicePage } from "../homeowner-service-page";

export const metadata: Metadata = {
  title: "Custom House Design Service & Floor Plans | Artimist",
  description: "Custom house design and floor plan services for homeowners: new home layouts, custom floor plans, house plan modifications and residential design support with optional 3D visualization.",
  alternates: { canonical: "/custom-house-design" },
  openGraph: {
    title: "Custom House Design Service & Floor Plans | Artimist",
    description: "Custom home design, house plans and floor plan design developed around your site, lifestyle and project goals.",
    url: "https://www.artimistproductions.com/custom-house-design",
    type: "website",
  },
};

export default function CustomHouseDesignPage() {
  return <HomeownerServicePage
    slug="custom-house-design"
    serviceName="Custom House Design"
    eyebrow="House design & floor plans"
    h1="Custom House Design & Floor Plans"
    subtitle="A home planned around the way you actually want to live."
    intro="Artimist provides a custom house design service for homeowners planning a new home, improving an existing house plan or turning early ideas into a clear residential design. We develop custom floor plans, layouts and spatial options around your site, priorities and desired architectural character instead of forcing the project into a generic stock plan."
    audience="For homeowners who need a new home design, custom house plans, a better floor plan or thoughtful changes to an existing house plan."
    image="/graphics/custom-house-floor-plan-design.svg"
    imageAlt="Custom residential floor plan design diagram showing room planning, circulation, furniture and dimensions"
    included={[
      "Custom home floor plans",
      "New home design concepts",
      "House plan modification",
      "Space planning and room relationships",
      "Residential exterior design direction",
      "Furniture-aware floor planning",
      "Plans, elevations and sections as scoped",
      "Optional 3D exterior and interior visualization",
    ]}
    deliverables={[
      "Custom floor plan package",
      "Concept plans and design options",
      "Dimensioned residential drawings as scoped",
      "PDF presentation set",
      "CAD or Revit files where included",
      "3D views or photoreal renders when commissioned",
    ]}
    steps={[
      { title: "Share the brief", text: "Send your site information, existing plans if any, inspiration images, room requirements and the problems you want the new design to solve." },
      { title: "Develop the layout", text: "We turn the brief into practical floor plan options and refine circulation, room sizes, adjacencies and architectural character with your feedback." },
      { title: "Prepare the next-stage set", text: "Once the direction is approved, we develop the agreed drawings and visualization so the project can move into permitting, engineering or construction coordination." },
    ]}
    faqs={[
      { q: "Can you design a house from scratch?", a: "Yes. We can start from a site, a room list and reference images, then develop the floor plan and architectural direction from the ground up." },
      { q: "Can you modify a house plan I already have?", a: "Yes. We can rework an existing plan for your site, lifestyle, room requirements and design preferences rather than making you start over." },
      { q: "Do you provide 3D views with the floor plans?", a: "Yes. 3D exterior views, interior visualization and photoreal rendering can be added so you can understand the design before construction." },
      { q: "Are these automatically permit-ready drawings?", a: "Not automatically. Permit requirements vary by jurisdiction. We can prepare permit documentation when that is part of the scope and coordinate with a locally licensed professional where local law requires one." },
    ]}
    related={[
      { href: "/3d-interior-design-service", label: "3D Interior Design" },
      { href: "/residential-renovation-permit-drawings", label: "Renovation & Permit Drawings" },
      { href: "/architecture", label: "Architectural Services" },
      { href: "/visualization", label: "3D Visualization" },
    ]}
    permitNotice="Residential design, permitting and professional-stamp requirements vary by state, province, city and project type. Where a locally licensed architect, engineer or other professional must review or stamp a submission, Artimist coordinates with that professional rather than representing that a remote design service replaces local licensure."
  />;
}

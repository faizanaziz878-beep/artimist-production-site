import type { Metadata } from "next";
import { HomeownerServicePage } from "../homeowner-service-page";

export const metadata: Metadata = {
  title: "Custom House Plans, Floor Plans & Home Design | Artimist",
  description: "Custom house plans, floor plans and home design for homeowners: new house layouts, plan modifications, residential drawings and optional 3D visualization.",
  alternates: { canonical: "/custom-house-design" },
  openGraph: {
    title: "Custom House Plans, Floor Plans & Home Design | Artimist",
    description: "Custom home design, house layouts and floor plans developed around your site, lifestyle and project goals.",
    url: "https://www.artimistproductions.com/custom-house-design",
    type: "website",
  },
};

export default function CustomHouseDesignPage() {
  return <HomeownerServicePage
    slug="custom-house-design"
    serviceName="Custom House Design"
    eyebrow="House plans, layouts & floor plans"
    h1="Custom House Plans & Floor Plans"
    subtitle="A home planned around the way you actually want to live."
    intro="Artimist designs custom house plans, floor plans and residential layouts for homeowners planning a new home or improving an existing idea. We develop room relationships, circulation, dimensions and architectural direction around your site and priorities instead of forcing the project into a generic stock plan. If you already have a sketch, blueprint-style drawing or house layout, we can refine that rather than making you start again."
    audience="For homeowners who need custom house plans, a new floor plan, a better house layout, residential drawings or a clear design direction before construction."
    image="/img/resext01.webp"
    imageAlt="Completed residential exterior design project by Artimist Productions"
    included={[
      "Custom house plans and layouts",
      "New home floor plan design",
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
      { q: "Can you turn my sketch into a clean floor plan?", a: "Yes. If you have a hand sketch, screenshot or rough layout, we can redraw and develop it into a clearer digital plan when enough dimensions and reference information are available." },
      { q: "Do you provide 3D views with the floor plans?", a: "Yes. 3D exterior views, interior visualization and photoreal rendering can be added so you can understand the design before construction." },
      { q: "Are these automatically permit-ready drawings?", a: "Not automatically. Permit requirements vary by jurisdiction. We can prepare permit documentation when that is part of the scope and coordinate with a locally licensed professional where local law requires one." },
    ]}
    related={[
      { href: "/plan-modification-service", label: "Plan Changes & Redraws" },
      { href: "/3d-interior-design-service", label: "3D Interior Design" },
      { href: "/residential-renovation-permit-drawings", label: "Renovation & Permit Drawings" },
      { href: "/visualization", label: "3D Visualization" },
    ]}
    permitNotice="Residential design, permitting and professional-stamp requirements vary by state, province, city and project type. Where a locally licensed architect, engineer or other professional must review or stamp a submission, Artimist coordinates with that professional rather than representing that a remote design service replaces local licensure."
  />;
}

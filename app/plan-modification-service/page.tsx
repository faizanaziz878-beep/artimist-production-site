import type { Metadata } from "next";
import { HomeownerServicePage } from "../homeowner-service-page";
import "./plan-modification-premium.css";

export const metadata: Metadata = {
  title: "House Plan Modification & Floor Plan Changes | Artimist",
  description: "Need to change an existing house plan? Artimist provides floor plan modifications, layout changes, redraws, sketch-to-plan conversion and 3D visualization for homeowners worldwide.",
  alternates: { canonical: "/plan-modification-service" },
  openGraph: {
    title: "House Plan Modification & Floor Plan Changes | Artimist",
    description: "Send your existing plan, sketch or marked-up drawing. We can improve the layout, redraw it cleanly and visualize the changes before you build.",
    url: "https://www.artimistproductions.com/plan-modification-service",
    type: "website",
  },
};

export default function PlanModificationServicePage() {
  return <div className="plan-mod-art"><HomeownerServicePage
    slug="plan-modification-service"
    serviceName="House Plan Modification"
    eyebrow="Plan changes, redraws & layout edits"
    h1="Change Your Floor Plan Without Starting Over"
    subtitle="Send the plan you already have. We help you make it work better."
    intro="If you already have a house plan, floor plan, sketch, PDF or marked-up drawing, Artimist can help you change it. We redesign room layouts, improve circulation, add or remove spaces, redraw unclear plans and prepare cleaner drawings so you can move forward with a renovation, new build, permit discussion or 3D visualization."
    audience="For homeowners who search for things like change my floor plan, modify house plans, redraw a floor plan, convert a sketch to a plan, make my layout better or visualize a renovation before building."
    image="/img/cad03.webp"
    imageAlt="Coordinated residential drawing sheet prepared by Artimist Productions"
    included={[
      "House plan modifications",
      "Floor plan layout changes",
      "Room additions or removals",
      "Kitchen and bathroom layout edits",
      "Sketch or PDF redraws",
      "Convert hand sketches into clean plans",
      "Furniture-aware space planning",
      "Optional 3D views of the revised design",
    ]}
    deliverables={[
      "Revised floor plan",
      "Before-and-after layout comparison",
      "Clean PDF drawing set",
      "Dimensioned plans where scoped",
      "CAD or Revit files where included",
      "3D visualization when commissioned",
    ]}
    steps={[
      { title: "Send what you have", text: "Upload your current plan, sketch, screenshots, measurements, photos and a simple note explaining what is not working." },
      { title: "We redesign the problem", text: "We test better room relationships, circulation and dimensions, then show you a clear revised plan instead of making you decode technical language." },
      { title: "Choose the next step", text: "Use the revised plan for design development, 3D visualization, renovation planning or permit documentation where that service is required." },
    ]}
    faqs={[
      { q: "Can you change a floor plan I bought online?", a: "Yes. If you have permission to use the plan, we can help adapt the layout to your needs, site and room requirements." },
      { q: "Can you redraw a blurry PDF, image or hand sketch?", a: "Yes. We can convert sketches, screenshots and existing plan images into clean digital drawings when enough dimensions or reference information are available." },
      { q: "Can you show the changes in 3D?", a: "Yes. Once the revised layout is agreed, we can create interior or exterior 3D views so you can judge the change before construction." },
      { q: "Does a modified plan automatically become permit-ready?", a: "No. Permit requirements vary by location and project type. If permit documentation is needed, we scope that separately and coordinate with locally licensed professionals where required." },
    ]}
    related={[
      { href: "/custom-house-design", label: "Custom House Design" },
      { href: "/3d-interior-design-service", label: "3D Interior Design" },
      { href: "/residential-renovation-permit-drawings", label: "Renovation & Permit Drawings" },
      { href: "/architectural-drafting-services", label: "Drafting Services" },
    ]}
    permitNotice="A plan modification is a design service, not an automatic permit approval or professional stamp. Local authorities determine submission requirements. Where a locally licensed architect, engineer or other professional is required, Artimist coordinates with that professional rather than representing remote design work as a substitute for local licensure."
  /></div>;
}

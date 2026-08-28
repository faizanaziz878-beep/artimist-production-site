import type { Metadata } from "next";
import { MarketServicePage } from "../market-service-page";

export const metadata: Metadata = {
  title: "Architecture, BIM, Revit & 3D Rendering Services Canada | Artimist",
  description: "Remote custom home design, renovation planning, Revit/BIM drafting, architectural visualization and 3D interior design support for Canadian homeowners and professional teams.",
  alternates: { canonical: "/canada" },
  openGraph: { title: "Architecture, BIM, Revit & 3D Rendering Services Canada | Artimist", description: "Remote architecture, BIM/Revit, drafting and 3D visualization support for projects across Canada.", url: "https://www.artimistproductions.com/canada", type: "website" },
};

export default function CanadaPage() {
  return <MarketServicePage
    slug="canada"
    country="Canada"
    kicker="Canada / remote project delivery"
    h1="Custom home design, BIM, Revit & 3D visualization for Canada"
    intro="Artimist Productions supports Canadian homeowners, builders, developers and design practices with custom home design, renovation planning, floor-plan development, BIM/Revit drafting, architectural visualization and 3D interior design."
    serviceIntro="Projects can begin from early ideas or established technical information. Artimist works from surveys, existing plans, DWGs, Revit files, point clouds, inspiration material or written briefs and develops the agreed scope through structured online review."
    terms={["Custom home design", "Renovation drawings", "Revit drafting", "BIM production", "3D interior design", "Architectural rendering"]}
    workflow={[
      { title: "Collect the base information", text: "Review the site information, existing drawings, measurements, model files, references and target deliverables." },
      { title: "Align the project scope", text: "Confirm which parts are design, technical production, visualization and any locally regulated professional work." },
      { title: "Develop through milestones", text: "Issue clear review stages for layouts, models, drawings or renders instead of waiting until the end for feedback." },
      { title: "Handover usable files", text: "Deliver the agreed PDF, CAD, Revit, image or animation outputs in an organized project package." },
    ]}
    faqs={[
      { q: "Can Artimist work with homeowners anywhere in Canada?", a: "Yes. Remote project delivery can support clients across Canada. The exact technical and permit scope is defined around the municipality, province and project type." },
      { q: "Can you help with renovation and addition drawings?", a: "Yes. Artimist can support renovation planning, layout changes, drawing development and visualization. Permit and professional-review requirements are confirmed for the relevant local jurisdiction." },
      { q: "Can you produce Revit models for Canadian architecture firms?", a: "Yes. BIM and Revit support can follow supplied templates, title blocks, model standards, naming conventions, sheet structures and coordination requirements." },
      { q: "Do you provide 3D interior design and rendering?", a: "Yes. Interior layouts, material direction, furniture planning, lighting studies and photoreal visualization can be scoped together or added to an existing architectural project." },
    ]}
    localNote="Canadian permitting, building-code review and professional-licensure requirements vary by province, municipality and project type. Where a locally licensed architect, engineer or other professional is required, Artimist works alongside that professional rather than replacing the regulated role."
  />;
}

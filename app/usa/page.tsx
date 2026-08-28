import type { Metadata } from "next";
import { MarketServicePage } from "../market-service-page";

export const metadata: Metadata = {
  title: "Architecture, BIM, Revit & 3D Rendering Services USA | Artimist",
  description: "Remote architecture support, custom house design, permit drawing support, Revit/BIM drafting and architectural visualization for homeowners and professional teams across the United States.",
  alternates: { canonical: "/usa" },
  openGraph: { title: "Architecture, BIM, Revit & 3D Rendering Services USA | Artimist", description: "Remote architecture, BIM/Revit, drafting and architectural visualization support for U.S. residential and professional projects.", url: "https://www.artimistproductions.com/usa", type: "website" },
};

export default function USAPage() {
  return <MarketServicePage
    slug="usa"
    country="United States"
    kicker="United States / remote project delivery"
    h1="Architecture, BIM, Revit & 3D Visualization for U.S. projects"
    intro="Artimist Productions supports homeowners, architects, developers and builders across the United States with custom house design, floor-plan development, residential drafting, BIM/Revit production, permit-documentation support and photoreal architectural visualization."
    serviceIntro="The workflow is remote-first and designed around the actual project stage. Artimist can begin from a sketch, survey, PDF drawing set, DWG, Revit model, point cloud, reference images or an existing design package and then build the agreed design or production scope around that material."
    terms={["Custom house plans", "Permit drawing support", "Revit drafting", "BIM modeling", "Architectural rendering", "3D interior design"]}
    workflow={[
      { title: "Receive the project information", text: "Collect the survey, existing drawings, model, design brief, jurisdiction information and required deliverables." },
      { title: "Define scope and responsibilities", text: "Separate design, drafting, BIM, visualization and any locally licensed professional responsibilities before production begins." },
      { title: "Develop and review", text: "Work through structured review packages so drawings, models and imagery can be checked before final handover." },
      { title: "Deliver organized files", text: "Provide the agreed PDFs, CAD/Revit files, models, renders or animation outputs with clear revision status." },
    ]}
    faqs={[
      { q: "Can Artimist work on residential projects anywhere in the USA?", a: "Yes, projects can be delivered remotely across the United States. The exact drawing and permitting scope is defined around the city, county or state requirements that apply to the project." },
      { q: "Do you provide permit drawings for U.S. projects?", a: "Artimist can prepare permit-documentation support where that is part of the scope. Requirements vary by jurisdiction, and any local architect, engineer or other licensed professional review or stamp is handled where legally required." },
      { q: "Can you work in a U.S. architecture firm's Revit standards?", a: "Yes. Revit and BIM production can be aligned to supplied templates, title blocks, naming conventions, model standards, sheet systems and review procedures." },
      { q: "Can a homeowner send an existing floor plan for modification?", a: "Yes. Existing plans, sketches or PDFs can be used as the starting point for layout changes, room planning, renovation design or 3D visualization when enough dimensional information is available." },
    ]}
    localNote="U.S. permitting and professional-licensure requirements vary by state, county, city and project type. Artimist does not represent remote design or drafting support as a substitute for any locally required licensed professional review, signature or seal."
  />;
}

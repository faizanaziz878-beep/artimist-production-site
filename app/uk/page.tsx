import type { Metadata } from "next";
import { MarketServicePage } from "../market-service-page";

export const metadata: Metadata = {
  title: "Architecture, BIM, Revit & CGI Services UK | Artimist",
  description: "Remote architecture support, planning and Building Regulations drawing support, BIM/Revit production, interior design and architectural CGI for UK projects.",
  alternates: { canonical: "/uk" },
  openGraph: { title: "Architecture, BIM, Revit & CGI Services UK | Artimist", description: "Remote architecture, BIM/Revit, planning drawing support and architectural visualization for UK residential and professional projects.", url: "https://www.artimistproductions.com/uk", type: "website" },
};

export default function UKPage() {
  return <MarketServicePage
    slug="uk"
    country="United Kingdom"
    kicker="United Kingdom / remote project delivery"
    h1="Architecture, BIM, Revit & architectural CGI for UK projects"
    intro="Artimist Productions supports UK homeowners, architects, developers and design teams with residential design development, planning-drawing support, BIM/Revit production, interior design, architectural CGI, animation and presentation work."
    serviceIntro="The studio can work from early sketches through to established technical packages. Surveys, PDFs, CAD files, Revit models, point clouds, planning information and supplied office standards can all form the starting point for a remote production or design scope."
    terms={["Residential design", "Planning drawing support", "Building Regulations support", "BIM / Revit", "Architectural CGI", "3D interior design"]}
    workflow={[
      { title: "Review the project stage", text: "Identify whether the immediate need is concept design, planning information, technical production, BIM coordination or visualization." },
      { title: "Confirm standards and local inputs", text: "Align drawing conventions, client templates, local consultant information and the responsibilities of appointed UK professionals." },
      { title: "Develop with staged reviews", text: "Issue drawings, models or CGI through agreed milestones so design and technical decisions remain visible." },
      { title: "Deliver editable and presentation files", text: "Provide the agreed Revit, CAD, PDF, image or animation outputs together with clear revision status." },
    ]}
    faqs={[
      { q: "Can Artimist support planning drawing packages in the UK?", a: "Yes, planning-drawing support can be scoped where appropriate. The planning strategy, local authority requirements and any professional appointments remain specific to the project and location." },
      { q: "Can you support Building Regulations drawing production?", a: "Artimist can assist with technical drawing production and coordination. Compliance responsibility, specialist design and any regulated professional role must be confirmed with the appointed UK project team." },
      { q: "Can you work inside an architecture practice's Revit standards?", a: "Yes. Revit and BIM production can follow supplied templates, families, naming conventions, sheet systems, worksharing procedures and model-delivery standards." },
      { q: "Do you create architectural CGI and animation for UK projects?", a: "Yes. Photoreal exterior and interior CGI, animation, walkthroughs and real-time visualization can be developed from CAD, Revit, SketchUp or other suitable project information." },
    ]}
    localNote="UK planning, Building Regulations, statutory approvals and professional responsibilities depend on project type and location. Artimist provides design and production support within an agreed scope and does not replace any locally appointed professional role required by law or contract."
  />;
}

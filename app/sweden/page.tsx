import type { Metadata } from "next";
import { MarketServicePage } from "../market-service-page";
import "../market-premium.css";

export const metadata: Metadata = {
  title: "Architecture, BIM, Revit & 3D Visualization Sweden | Artimist",
  description: "Remote architecture support, BIM/Revit production, interior design and high-end architectural visualization for Swedish residential and professional projects.",
  alternates: { canonical: "/sweden" },
  openGraph: { title: "Architecture, BIM, Revit & 3D Visualization Sweden | Artimist", description: "Remote architecture, BIM/Revit, interior design and visualization support for projects in Sweden.", url: "https://www.artimistproductions.com/sweden", type: "website" },
};

export default function SwedenPage() {
  return <div className="market-premium sweden-art"><MarketServicePage
    slug="sweden"
    country="Sweden"
    kicker="Sweden / remote project delivery"
    h1="Architecture, BIM, Revit & visualization for Swedish projects"
    intro="Artimist Productions supports Swedish homeowners, architects, developers and design teams with architecture development, interiors, BIM/Revit production, technical drawing support and high-end 3D visualization."
    serviceIntro="The workflow is designed for digital collaboration and clear file handover. Artimist can work from surveys, CAD, Revit, point clouds, references and established office standards, then deliver coordinated design, BIM or visualization outputs through structured milestones."
    terms={["Architecture support", "Interior design", "BIM / Revit", "Technical drafting", "Architectural visualization", "Real-time walkthroughs"]}
    workflow={[
      { title: "Receive the digital base", text: "Review the drawings, model, survey, project brief, references and any client BIM or documentation standards." },
      { title: "Define the collaboration boundary", text: "Clarify what Artimist develops and what remains with the Swedish architect, engineer, consultant or approval authority." },
      { title: "Coordinate through review rounds", text: "Develop models, drawings and imagery through visible milestones so comments are resolved before handover." },
      { title: "Provide organized source files", text: "Deliver the agreed native and exported formats with clear naming, revision status and presentation outputs." },
    ]}
    faqs={[
      { q: "Can Artimist support architecture practices in Sweden remotely?", a: "Yes. Remote BIM, Revit, drafting, visualization and design-development support can be integrated into an established office workflow when project standards and responsibilities are clearly supplied." },
      { q: "Can you create architectural visualization for Scandinavian projects?", a: "Yes. Artimist produces exterior and interior CGI, animation and real-time visualization with a focus on material realism, daylight, atmosphere and clear architectural communication." },
      { q: "Can you work with Revit models and point clouds?", a: "Yes. Revit models, CAD files and point-cloud information can be used where suitable for the agreed modeling, documentation or visualization scope." },
      { q: "Does Artimist replace the local Swedish architect or engineer?", a: "No. Where Swedish law, approvals or project contracts require locally responsible professionals, Artimist works as a design or production partner within the agreed scope rather than replacing those roles." },
    ]}
    localNote="Swedish planning, building-permit, technical-compliance and professional responsibilities are controlled locally. The project team should confirm the applicable municipal and statutory requirements; Artimist provides remote design and production support within that framework."
  /></div>;
}

import type { Metadata } from "next";
import { HomeownerServicePage } from "../homeowner-service-page";

export const metadata: Metadata = {
  title: "Residential Permit Drawings & Home Renovation Plans | Artimist",
  description: "Residential permit drawings and home renovation plans for additions, remodels, extensions, basement renovations, conversions and permit documentation support.",
  alternates: { canonical: "/residential-renovation-permit-drawings" },
  openGraph: {
    title: "Residential Permit Drawings & Home Renovation Plans | Artimist",
    description: "Drawing and documentation support for home additions, renovations, remodels and residential permit submissions.",
    url: "https://www.artimistproductions.com/residential-renovation-permit-drawings",
    type: "website",
  },
};

export default function RenovationPermitPage() {
  return <HomeownerServicePage
    slug="residential-renovation-permit-drawings"
    serviceName="Residential Renovation & Permit Drawings"
    eyebrow="Renovation & permit drawings"
    h1="Residential Permit Drawings & Renovation Plans"
    subtitle="Clear drawings for additions, remodels, conversions and the next step toward permit review."
    intro="Artimist provides residential drafting, home renovation drawings and permit documentation support for homeowners planning additions and remodeling work. We can document existing conditions, develop proposed layouts and prepare coordinated drawing sets for home additions, house extensions, basement renovations, garage conversions, kitchen remodels and bathroom remodels."
    audience="For homeowners who need clear plans for a renovation, addition, remodel, extension, basement project or garage conversion before local permit review or construction coordination."
    image="/media/atlas/atlas-16.webp"
    imageAlt="Contemporary residential architecture with landscaped lawn in evening light"
    included={[
      "Home addition plans",
      "House extension drawings",
      "Home renovation drawings",
      "Kitchen remodel drawings",
      "Bathroom remodel drawings",
      "Basement renovation plans",
      "Garage conversion plans",
      "Existing and proposed plans, elevations and sections",
    ]}
    deliverables={[
      "Existing-condition drawings as scoped",
      "Proposed renovation or addition plans",
      "Elevations and sections where required",
      "Coordinated permit-documentation package as scoped",
      "Print-ready PDF drawing set",
      "CAD or Revit source files where included",
    ]}
    steps={[
      { title: "Review the existing home", text: "We start from surveys, existing drawings, measurements, photos and your renovation brief, then identify the information needed to document the project accurately." },
      { title: "Develop the proposed work", text: "We prepare the renovation or addition layout, coordinate the affected areas and build a clear before-and-after drawing package rather than isolated sketches." },
      { title: "Prepare for local review", text: "The agreed documentation is organized for its intended submission or construction use, with local code and professional requirements confirmed by the appropriate local authority or licensed professional." },
    ]}
    faqs={[
      { q: "Can you prepare drawings for a home addition?", a: "Yes. Additions and extensions can include existing and proposed plans, elevations, sections and the other drawings agreed for the project scope." },
      { q: "Do you guarantee a permit will be approved?", a: "No responsible drafting service can guarantee an authority's approval. We prepare coordinated documentation to the agreed scope and can respond to drawing-related review comments, while approval remains with the local authority." },
      { q: "Can you stamp the drawings?", a: "Stamp and licensure requirements vary by jurisdiction and project type. Where a locally licensed architect, engineer or other professional is required, we coordinate with that professional rather than claiming authority we do not hold." },
      { q: "Can you work from old drawings or sketches?", a: "Yes. We can review existing PDFs, CAD files, sketches, surveys and photographs and explain what additional information is needed before drafting begins." },
      { q: "Do you handle renovation drawings for kitchens and bathrooms?", a: "Yes. We can document remodeling layouts and, where needed, coordinate them with broader residential drawing or permit packages." },
    ]}
    related={[
      { href: "/custom-house-design", label: "Custom House Design" },
      { href: "/3d-interior-design-service", label: "3D Interior Design" },
      { href: "/permit-drawing-services", label: "Professional Permit Documentation" },
      { href: "/architectural-drafting-services", label: "Architectural Drafting" },
    ]}
    permitNotice="Permit requirements are local. Some jurisdictions allow residential drawings to be prepared without an architect or engineer for certain project types, while others require a locally licensed professional and/or structural, energy, zoning or other specialist documentation. The local authority having jurisdiction determines what must be submitted and who may sign or stamp it."
  />;
}

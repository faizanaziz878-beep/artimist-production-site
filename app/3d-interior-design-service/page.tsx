import type { Metadata } from "next";
import { HomeownerServicePage } from "../homeowner-service-page";
import "./interior-premium.css";

export const metadata: Metadata = {
  title: "3D Interior Design Service & Home Visualization | Artimist",
  description: "3D interior design and home visualization for homeowners: room layouts, materials, lighting, furniture planning and photoreal interior renders before construction or renovation.",
  alternates: { canonical: "/3d-interior-design-service" },
  openGraph: { title: "3D Interior Design Service & Home Visualization | Artimist", description: "See your kitchen, living room, bedroom, bathroom or whole home in 3D before you build, buy or renovate.", url: "https://www.artimistproductions.com/3d-interior-design-service", type: "website" },
};

export default function InteriorDesignPage() {
  return <div className="interior-art"><HomeownerServicePage
    slug="3d-interior-design-service"
    serviceName="3D Interior Design"
    eyebrow="Interior design & 3D views"
    h1="3D Interior Design & Home Visualization"
    subtitle="Understand the space, materials and furniture before money is committed on site."
    intro="Our 3D interior design service helps homeowners make confident decisions before construction or renovation. We can develop room layouts, material directions, furniture planning and photoreal 3D home visualization for a kitchen, living room, bedroom, bathroom or an entire home, so you can judge light, finishes, proportions and furniture before anything is built."
    audience="For homeowners who want professional interior design online, realistic 3D views, furniture planning or a complete visual direction for one room or a whole home."
    image="/img/homeint01.webp"
    imageAlt="Photoreal whole-home interior design project by Artimist Productions"
    included={["Living room interior design","Kitchen design and visualization","Bedroom interior design","Bathroom design concepts","Whole-house interior design","Furniture layout and space planning","Material, finish and lighting direction","Photoreal 3D interior rendering"]}
    deliverables={["Room layout and furniture plans as scoped","Material and finish direction","3D interior views","Photoreal final renders","Presentation-ready image set","Design notes for implementation where included"]}
    steps={[
      { title: "Send the room", text: "Share plans, measurements, photographs and inspiration. We identify the key decisions and confirm which spaces and views will give you the most value." },
      { title: "Design in 3D", text: "We develop layout, materials, furniture and lighting together so the interior is solved as one composition rather than a collection of unrelated selections." },
      { title: "Review before build", text: "You review the design through 3D views and refined renders, make changes while they are still inexpensive, and receive the agreed final design package." },
    ]}
    faqs={[
      { q: "Can you design only one room?", a: "Yes. Kitchens, living rooms, bedrooms and bathrooms can be handled individually, or we can create a consistent design language across the whole home." },
      { q: "Can I use this service remotely?", a: "Yes. The process can be handled online using your drawings, measurements, photographs, video and reference images." },
      { q: "Will I see the design in realistic 3D?", a: "Yes. Photoreal interior visualization is one of Artimist's core capabilities, so you can evaluate material, lighting and spatial decisions before implementation." },
      { q: "Can you change my floor plan before designing the interior?", a: "Yes. If the room layout itself needs work, we can revise the plan first and then develop the interior and 3D visualization around the improved layout." },
      { q: "Do you help with furniture layout?", a: "Yes. Furniture placement and circulation are treated as part of the spatial design rather than added at the end." },
    ]}
    related={[
      { href: "/plan-modification-service", label: "Plan Changes & Redraws" },
      { href: "/custom-house-design", label: "Custom House Design" },
      { href: "/residential-renovation-permit-drawings", label: "Renovation & Permit Drawings" },
      { href: "/visualization", label: "Architectural Visualization" },
    ]}
  /></div>;
}

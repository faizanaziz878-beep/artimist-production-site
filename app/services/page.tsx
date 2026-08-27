import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { ServicesExperience } from "../studio-path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Architecture, BIM, Interiors & 3D Visualization Services | Artimist",
  description: "Explore Artimist Productions services across architecture, custom homes, interiors, BIM/Revit, CAD drafting, permit documentation, architectural visualization, animation and Unreal Engine.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Architecture, BIM, Interiors & 3D Visualization Services | Artimist",
    description: "Architecture, interiors, BIM/Revit, drafting, architectural visualization, animation and real-time experiences in one multidisciplinary studio.",
    url: "https://www.artimistproductions.com/services",
    type: "website",
    images: [{ url: "/media/atlas/atlas-08.webp", alt: "Artimist Productions architecture, BIM, interiors and visualization services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture, BIM, Interiors & Visualization Services | Artimist Productions",
    description: "Architecture, interiors, BIM/Revit, drafting, visualization, animation and real-time production.",
    images: ["/media/atlas/atlas-08.webp"],
  },
};

export default async function ServicesPage() {
  const { settings } = await getPublicContent();
  return <ServicesExperience settings={settings} />;
}
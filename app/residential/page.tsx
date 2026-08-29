import type { Metadata } from "next";
import { residentialChapters } from "../../lib/visual-content";
import { VisualJourney } from "../visual-journey";
import "./residential-premium.css";

export const metadata: Metadata = {
  title: "Residential 3D Rendering & Interior Visualization | Artimist",
  description: "Photorealistic residential architectural rendering: exterior and interior 3D visualization for homes, villas and residential developments by Artimist Productions.",
  alternates: { canonical: "/residential" },
  openGraph: {
    title: "Residential Rendering & Interior Visualization | Artimist Productions",
    description: "Residential exterior and interior scenes showing architecture, material, atmosphere and spatial design before construction.",
    url: "https://www.artimistproductions.com/residential",
    type: "website",
    images: [{ url: "/media/residential/residential-13.webp", alt: "Artimist Productions residential architectural visualization" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residential Rendering & Interior Visualization | Artimist Productions",
    description: "Explore residential exterior and interior visualization work by Artimist Productions.",
    images: ["/media/residential/residential-13.webp"],
  },
};

export default function ResidentialPage() {
  return <VisualJourney kind="residential" eyebrow="Residential renders / Complete collection" title="Homes, felt before they are built." intro="Nineteen exterior and interior scenes presented as two uninterrupted spatial journeys—from first arrival to the final evening room." chapters={residentialChapters} />;
}

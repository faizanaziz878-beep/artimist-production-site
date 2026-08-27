import type { Metadata } from "next";
import { atlasChapters, technicalBoards } from "../../lib/visual-content";
import { VisualJourney } from "../visual-journey";

export const metadata: Metadata = {
  title: "Architectural Rendering Portfolio | 3D Visualization Gallery",
  description: "Browse the Artimist Productions architectural rendering portfolio: 37 photorealistic visualizations across architecture, interiors, hospitality and landscape, plus full technical plates.",
  alternates: { canonical: "/visual-archive" },
  openGraph: {
    title: "Architectural Rendering Portfolio | Artimist Productions",
    description: "An image-first archive of architecture, interiors, hospitality, landscape and technical presentation work.",
    url: "https://www.artimistproductions.com/visual-archive",
    type: "website",
    images: [{ url: "/media/atlas/atlas-06.webp", alt: "Artimist Productions architectural visualization archive" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architectural Rendering Portfolio | Artimist Productions",
    description: "Explore 37 architectural visualizations plus complete technical plates.",
    images: ["/media/atlas/atlas-06.webp"],
  },
};

export default function VisualArchivePage() {
  return <VisualJourney kind="atlas" eyebrow="Render atlas / Complete visual field" title="Thirty-seven worlds. No thumbnails." intro="An image-first archive of spatial work, followed by twenty-one technical plates shown in full. Scroll downward to move through every project atmosphere." chapters={atlasChapters} technicalBoards={technicalBoards} />;
}

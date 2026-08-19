import type { Metadata } from "next";
import { atlasChapters, technicalBoards } from "../../lib/visual-content";
import { VisualJourney } from "../visual-journey";

export const metadata: Metadata = {
  title: "Architectural Rendering Portfolio | 3D Visualization Gallery",
  description: "Browse our architectural rendering portfolio: 37 photorealistic 3D visualizations across architecture, interiors, hospitality and landscape, plus full technical plates.",
};

export default function VisualArchivePage() {
  return <VisualJourney kind="atlas" eyebrow="Render atlas / Complete visual field" title="Thirty-seven worlds. No thumbnails." intro="An image-first archive of spatial work, followed by twenty-one technical plates shown in full. Scroll downward to move through every project atmosphere." chapters={atlasChapters} technicalBoards={technicalBoards} />;
}

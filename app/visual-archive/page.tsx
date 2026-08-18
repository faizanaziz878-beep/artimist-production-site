import type { Metadata } from "next";
import { atlasChapters, technicalBoards } from "../../lib/visual-content";
import { VisualJourney } from "../visual-journey";

export const metadata: Metadata = {
  title: "Render Atlas — Artimist Production",
  description: "The complete Artimist visual archive: architecture, interiors, hospitality, landscape and full technical presentation plates.",
};

export default function VisualArchivePage() {
  return <VisualJourney kind="atlas" eyebrow="Render atlas / Complete visual field" title="Thirty-seven worlds. No thumbnails." intro="An image-first archive of spatial work, followed by twenty-one technical plates shown in full. Scroll downward to move through every project atmosphere." chapters={atlasChapters} technicalBoards={technicalBoards} />;
}

import type { Metadata } from "next";
import { residentialChapters } from "../../lib/visual-content";
import { VisualJourney } from "../visual-journey";

export const metadata: Metadata = {
  title: "Residential 3D Rendering & Interior Visualization | Artimist",
  description: "Photorealistic residential architectural rendering: exterior and interior 3D visualization for homes, villas and residential developments by Artimist Production.",
};

export default function ResidentialPage() {
  return <VisualJourney kind="residential" eyebrow="Residential renders / Complete collection" title="Homes, felt before they are built." intro="Nineteen exterior and interior scenes presented as two uninterrupted spatial journeys—from first arrival to the final evening room." chapters={residentialChapters} />;
}

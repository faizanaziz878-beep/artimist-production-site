import { ArtimistExperience } from "./artimist-experience";
import type { Metadata } from "next";
import { getPublicContent } from "../lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Architecture, BIM & Visualization Services | Artimist Productions",
  description:
    "Architecture, BIM and visualization for US projects: Revit and CAD drafting, permit and construction documentation, interiors and photoreal 3D rendering.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const content = await getPublicContent();
  return <ArtimistExperience {...content} />;
}

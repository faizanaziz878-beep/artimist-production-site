import { ArtimistExperience } from "./artimist-experience";
import type { Metadata } from "next";
import { getPublicContent } from "../lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Design, House Plans, Interiors & 3D Visualization | Artimist",
  description:
    "Artimist helps homeowners and professional teams with custom house plans, floor plan changes, interior design, renovation drawings, BIM/Revit and photoreal 3D visualization worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Home Design, House Plans, Interiors & 3D Visualization | Artimist",
    description: "Design a house, improve a floor plan, visualize an interior, prepare renovation drawings or bring in Artimist for BIM and architectural visualization.",
    url: "https://www.artimistproductions.com/",
    type: "website",
  },
};

export default async function Home() {
  const content = await getPublicContent();
  return <ArtimistExperience {...content} />;
}

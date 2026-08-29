import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { UnrealEngineExperience } from "./unreal-engine-experience";
import "./unreal-engine.css";
import "./unreal-premium.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unreal Engine Architectural Visualization | Real-Time 3D",
  description: "Artimist Productions creates Unreal Engine architectural visualization, real-time 3D walkthroughs, interactive sales suites, cinematic environments and virtual tours for developers and architects.",
  alternates: { canonical: "/unreal-engine" },
  openGraph: {
    title: "Unreal Engine Architectural Visualization | Artimist Productions",
    description: "Interactive architectural worlds, cinematic environments and real-time 3D experiences for design, property and spatial storytelling.",
    url: "https://www.artimistproductions.com/unreal-engine",
    type: "website",
    images: [{ url: "/media/atlas/atlas-34.webp", alt: "Artimist Productions Unreal Engine and real-time architecture work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unreal Engine Architectural Visualization | Artimist Productions",
    description: "Real-time architectural walkthroughs, cinematic environments and interactive 3D experiences.",
    images: ["/media/atlas/atlas-34.webp"],
  },
};

export default async function UnrealEnginePage() {
  const { settings } = await getPublicContent();
  return <UnrealEngineExperience settings={settings} />;
}

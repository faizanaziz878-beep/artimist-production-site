import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { UnrealEngineExperience } from "./unreal-engine-experience";
import "./unreal-engine.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unreal Engine Architectural Visualization | Real-Time 3D",
  description: "Unreal Engine architectural visualization studio: real-time 3D walkthroughs, interactive sales suites, cinematic environments and virtual tours for developers and architects.",
  alternates: { canonical: "/unreal-engine" },
};

export default async function UnrealEnginePage() {
  const { settings } = await getPublicContent();
  return <UnrealEngineExperience settings={settings} />;
}

import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { UnrealEngineExperience } from "./unreal-engine-experience";
import "./unreal-engine.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Unreal Engine & Real-Time Experiences — Artimist Production",
  description: "High-end Unreal Engine architectural visualization, cinematic real-time environments and interactive spatial experiences by Artimist Production.",
};

export default async function UnrealEnginePage() {
  const { settings } = await getPublicContent();
  return <UnrealEngineExperience settings={settings} />;
}

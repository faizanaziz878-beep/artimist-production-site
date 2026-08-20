import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { FounderMessageExperience } from "./founder-message-experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Founder’s Message — Artimist Production",
  description: "A message from Faizan Aziz, founder and creative director of Artimist Production.",
  alternates: { canonical: "/founder-message" },
};

export default async function FounderMessagePage() {
  const { settings } = await getPublicContent();
  return <FounderMessageExperience settings={settings} />;
}

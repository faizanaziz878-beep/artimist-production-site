import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { AboutExperience } from "./about-experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About — Artimist Production",
  description: "The vision, services and multidisciplinary process behind Artimist Production.",
};

export default async function AboutPage() {
  const { settings } = await getPublicContent();
  return <AboutExperience settings={settings} />;
}

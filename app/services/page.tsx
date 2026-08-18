import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { ServicesExperience } from "../studio-path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services — Artimist Production",
  description: "Architecture, interiors, visualization, Unreal Engine real-time experiences, motion, identity, digital products, growth and research through one multidisciplinary studio.",
};

export default async function ServicesPage() {
  const { settings } = await getPublicContent();
  return <ServicesExperience settings={settings} />;
}

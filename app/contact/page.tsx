import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { ContactExperience } from "../studio-path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Artimist Production",
  description: "Start a project with Artimist Production in Vancouver, Ohio, Stockholm or Raya DHA Lahore.",
};

export default async function ContactPage() {
  const { settings } = await getPublicContent();
  return <ContactExperience settings={settings} />;
}

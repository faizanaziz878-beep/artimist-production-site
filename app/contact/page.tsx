import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { ContactExperience } from "../studio-path";
import { ContactAttribution } from "../contact-attribution";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Artimist Productions | Start an Architecture, BIM or 3D Project",
  description: "Start a project with Artimist Productions for architecture, custom homes, interiors, BIM/Revit, drafting, architectural visualization, animation or Unreal Engine. Working with clients worldwide.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Artimist Productions | Start a Project",
    description: "Discuss an architecture, interior, BIM, visualization, animation or real-time project with the Artimist team.",
    url: "https://www.artimistproductions.com/contact",
    type: "website",
  },
};

export default async function ContactPage() {
  const { settings } = await getPublicContent();
  return <><ContactExperience settings={settings} /><ContactAttribution /></>;
}

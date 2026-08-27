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
    description: "Send a project brief for architecture, interiors, BIM, visualization, animation or real-time work and continue directly with the studio.",
    url: "https://www.artimistproductions.com/contact",
    type: "website",
    images: [{ url: "/media/atlas/atlas-34.webp", alt: "Start a project with Artimist Productions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Artimist Productions | Start a Project",
    description: "Send your project brief and source-file link to the Artimist Productions studio.",
    images: ["/media/atlas/atlas-34.webp"],
  },
};

export default async function ContactPage() {
  const { settings } = await getPublicContent();
  return <><ContactExperience settings={settings} /><ContactAttribution /></>;
}

import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { AboutExperience } from "./about-experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About — Artimist Productions",
  description: "The vision, multidisciplinary services and working principles behind Artimist Productions.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Artimist Productions",
    description: "Architecture, interiors, visualization, BIM, animation and digital production connected by one studio direction.",
    url: "https://www.artimistproductions.com/about",
    type: "website",
    images: [{ url: "/media/atlas/atlas-14.webp", alt: "Artimist Productions multidisciplinary design work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Artimist Productions",
    description: "The vision and multidisciplinary practice behind Artimist Productions.",
    images: ["/media/atlas/atlas-14.webp"],
  },
};

export default async function AboutPage() {
  const { settings } = await getPublicContent();
  return <AboutExperience settings={settings} />;
}

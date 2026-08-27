import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { FounderMessageExperience } from "./founder-message-experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Faizan Aziz — Founder of Artimist Productions",
  description: "A message from Faizan Aziz, founder, architect and creative director of Artimist Productions, on the studio's multidisciplinary approach to architecture and creative production.",
  alternates: { canonical: "/founder-message" },
  openGraph: {
    title: "Faizan Aziz — Founder of Artimist Productions",
    description: "A founder's note on carrying one clear idea through architecture, visualization, identity, motion and digital work.",
    url: "https://www.artimistproductions.com/founder-message",
    type: "profile",
    images: [{ url: "/media/team/faizan-founder-hd.webp", alt: "Faizan Aziz, founder of Artimist Productions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faizan Aziz — Founder of Artimist Productions",
    description: "Founder, architect and creative director of Artimist Productions.",
    images: ["/media/team/faizan-founder-hd.webp"],
  },
};

export default async function FounderMessagePage() {
  const { settings } = await getPublicContent();
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Faizan Aziz",
      jobTitle: "Founder / Architect / Creative Director",
      worksFor: { "@id": "https://www.artimistproductions.com/#organization" },
      url: "https://www.artimistproductions.com/founder-message",
      image: "https://www.artimistproductions.com/media/team/faizan-founder-hd.webp",
    },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} /><FounderMessageExperience settings={settings} /></>;
}

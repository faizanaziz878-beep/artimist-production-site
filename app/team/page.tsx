import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { TeamExperience } from "./team-experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team — Artimist Productions",
  description: "Meet the multidisciplinary architecture, visualization, BIM, design and creative production team behind Artimist Productions.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Team — Artimist Productions",
    description: "Meet the multidisciplinary team behind Artimist Productions and the specialist network around the studio.",
    url: "https://www.artimistproductions.com/team",
    type: "website",
    images: [{ url: "/media/team/faizan.png", alt: "Artimist Productions studio team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team — Artimist Productions",
    description: "Meet the multidisciplinary team behind Artimist Productions.",
    images: ["/media/team/faizan.png"],
  },
};

export default async function TeamPage() {
  const { team, settings } = await getPublicContent();
  return <TeamExperience team={team} settings={settings} />;
}

import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { TeamExperience } from "./team-experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team — Artimist Production",
  description: "Meet the main multidisciplinary team behind Artimist Production and the wider specialist network around the studio.",
};

export default async function TeamPage() {
  const { team, settings } = await getPublicContent();
  return <TeamExperience team={team} settings={settings} />;
}

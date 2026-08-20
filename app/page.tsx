import { ArtimistExperience } from "./artimist-experience";
import type { Metadata } from "next";
import { getPublicContent } from "../lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const content = await getPublicContent();
  return <ArtimistExperience {...content} />;
}

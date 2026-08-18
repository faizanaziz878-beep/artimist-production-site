import { ArtimistExperience } from "./artimist-experience";
import { getPublicContent } from "../lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getPublicContent();
  return <ArtimistExperience {...content} />;
}

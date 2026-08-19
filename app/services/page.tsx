import type { Metadata } from "next";
import { getPublicContent } from "../../lib/data";
import { ServicesExperience } from "../studio-path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Architectural Visualization Services | 3D Rendering & CGI",
  description: "Architectural visualization services for developers, architects and brands: photoreal 3D rendering, CGI, animation, Unreal Engine real-time experiences and BIM documentation.",
};

export default async function ServicesPage() {
  const { settings } = await getPublicContent();
  return <ServicesExperience settings={settings} />;
}

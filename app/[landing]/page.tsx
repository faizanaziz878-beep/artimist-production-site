import { notFound, permanentRedirect } from "next/navigation";
import { LandingPageV2, landingMetadataV2 } from "../landing-v2";
import { LANDING_PAGES, getLandingPage } from "../../lib/landing-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ landing: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;
  return landingMetadataV2(landing);
}

export default async function Page({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;

  // /visualization is the established hub and already owns this exact search
  // intent. Keep old links working while consolidating authority on one URL.
  if (landing === "architectural-visualization-services") {
    permanentRedirect("/visualization");
  }

  if (!getLandingPage(landing)) notFound();
  return <LandingPageV2 slug={landing} />;
}

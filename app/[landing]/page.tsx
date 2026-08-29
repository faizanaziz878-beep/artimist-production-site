import { notFound, permanentRedirect } from "next/navigation";
import { LandingPageV2, landingMetadataV2 } from "../landing-v2";
import { LANDING_PAGES, getLandingPage } from "../../lib/landing-content";
import "./premium-pages.css";
import "./visualization-premium.css";
import "./specialist-premium.css";

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
  if (landing === "architectural-visualization-services") permanentRedirect("/visualization");
  if (!getLandingPage(landing)) notFound();
  return <div className={`landing-art landing-${landing}`}><LandingPageV2 slug={landing} /></div>;
}

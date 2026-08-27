import { notFound } from "next/navigation";
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
  if (!getLandingPage(landing)) notFound();
  return <LandingPageV2 slug={landing} />;
}

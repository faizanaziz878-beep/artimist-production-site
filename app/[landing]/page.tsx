import { notFound } from "next/navigation";
import { LandingPageView, landingMetadata } from "../landing";
import { LANDING_PAGES, getLandingPage } from "../../lib/landing-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ landing: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;
  return landingMetadata(landing);
}

export default async function Page({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;
  if (!getLandingPage(landing)) notFound();
  return <LandingPageView slug={landing} />;
}

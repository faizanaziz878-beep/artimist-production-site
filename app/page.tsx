import { ArtimistExperience } from "./artimist-experience";
import type { Metadata } from "next";
import { getPublicContent } from "../lib/data";
import { UiIcon } from "./ui-icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Design, House Plans, Interiors & 3D Visualization | Artimist",
  description: "Artimist Productions helps homeowners and professional teams with custom house plans, floor plan changes, interior design, renovation drawings, BIM/Revit and photoreal 3D visualization worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Home Design, House Plans, Interiors & 3D Visualization | Artimist",
    description: "Design a house, improve a floor plan, visualize an interior, prepare renovation drawings or bring in Artimist Productions for BIM and architectural visualization.",
    url: "https://www.artimistproductions.com/",
    type: "website",
    images: [{ url: "/media/hero-night.webp", alt: "Artimist Productions architecture, BIM and visualization" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Design, House Plans, Interiors & 3D Visualization | Artimist",
    description: "Architecture, interiors, BIM/Revit and visualization for homeowners and professional teams worldwide.",
    images: ["/media/hero-night.webp"],
  },
};

export default async function Home() {
  const content = await getPublicContent();
  const whatsapp = content.settings.whatsapp.replace(/\D/g, "");

  return (
    <>
      <ArtimistExperience {...content} />
      <section className="home-project-bridge" aria-labelledby="home-project-bridge-title">
        <div className="home-project-bridge-copy">
          <span>Ready when the brief is.</span>
          <h2 id="home-project-bridge-title">One clear place to start the project.</h2>
          <p>Architecture, interiors, BIM/Revit, drafting, visualization, animation or an unusual multidisciplinary brief. Send the real project information once and the studio can respond properly.</p>
        </div>
        <div className="home-project-bridge-actions">
          <a className="home-project-primary" href="/contact">
            <span>Start project intake</span>
            <UiIcon name="arrow" size={17} />
          </a>
          <a className="home-project-secondary" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">
            <span>Continue on WhatsApp</span>
            <UiIcon name="external" size={16} />
          </a>
          <small>Briefs can include Google Drive, Dropbox, OneDrive or WeTransfer links. Smaller scopes are welcome too.</small>
        </div>
      </section>
    </>
  );
}
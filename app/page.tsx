import { ArtimistExperience } from "./artimist-experience";
import type { Metadata } from "next";
import { getPublicContent } from "../lib/data";
import { UiIcon } from "./ui-icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artimist Productions — Architecture, BIM & 3D Visualization Studio",
  description: "Artimist Productions is an international architecture, design, BIM, 3D visualization and creative production studio serving homeowners, architects, developers and brands.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Artimist Productions — Architecture, BIM & 3D Visualization Studio",
    description: "Architecture, interiors, BIM and Revit, rendering, animation, branding, web design and interactive experiences from one international studio.",
    url: "https://www.artimistproductions.com/",
    type: "website",
    images: [{ url: "/media/hero-night.webp", alt: "Artimist Productions architecture, BIM and visualization" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artimist Productions — Architecture, BIM & 3D Visualization Studio",
    description: "One international studio for architecture, interiors, BIM, visualization, animation, branding, web and interactive experiences.",
    images: ["/media/hero-night.webp"],
  },
};

const inlineServiceLink = {
  color: "inherit",
  textDecorationColor: "rgba(238,234,227,.34)",
  textDecorationLine: "underline",
  textUnderlineOffset: "0.2em",
} as const;

export default async function Home() {
  const content = await getPublicContent();
  const whatsapp = content.settings.whatsapp.replace(/\D/g, "");

  return (
    <>
      <ArtimistExperience {...content} />
      <section className="home-audience-router" aria-labelledby="home-audience-title">
        <header>
          <span>Start with who you are</span>
          <h2 id="home-audience-title">One studio. Two clear ways in.</h2>
          <p>Choose the route that matches your project. The disciplines stay connected, but the information you see next stays relevant.</p>
        </header>
        <div>
          <a href="/home-design-services">
            <small>01 / Homeowners</small>
            <strong>Design, change or visualize my home</strong>
            <p>House plans, floor-plan changes, additions, renovation drawings, interiors and 3D views.</p>
            <UiIcon name="arrow" size={18} />
          </a>
          <a href="/services">
            <small>02 / Professional teams</small>
            <strong>Extend my architecture or development team</strong>
            <p>Architecture, BIM/Revit, CAD, permit documentation, rendering, animation and creative production.</p>
            <UiIcon name="arrow" size={18} />
          </a>
        </div>
      </section>
      <section className="home-project-bridge" aria-labelledby="home-project-bridge-title">
        <div className="home-project-bridge-copy">
          <span>Ready when the brief is.</span>
          <h2 id="home-project-bridge-title">One clear place to start the project.</h2>
          <p>
            Architecture, interiors, BIM/Revit, drafting, visualization, animation or an unusual multidisciplinary brief. Send the real project information once and the studio can respond properly. Explore our {" "}
            <a href="/custom-house-design" style={inlineServiceLink}>custom house design</a>, {" "}
            <a href="/plan-modification-service" style={inlineServiceLink}>plan modification</a>, {" "}
            <a href="/bim-drafting" style={inlineServiceLink}>BIM &amp; Revit drafting</a> and {" "}
            <a href="/visualization" style={inlineServiceLink}>architectural visualization</a> capabilities when you need a more focused starting point.
          </p>
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
          <small>
            Official profiles: {" "}
            <a href="https://www.instagram.com/artimist.productions/" target="_blank" rel="noreferrer" style={inlineServiceLink}>Instagram</a> · {" "}
            <a href="https://www.linkedin.com/company/artimist-productions" target="_blank" rel="noreferrer" style={inlineServiceLink}>LinkedIn</a> · {" "}
            <a href="https://www.trustpilot.com/review/www.artimistproductions.com" target="_blank" rel="noreferrer" style={inlineServiceLink}>Trustpilot</a>
          </small>
        </div>
      </section>
    </>
  );
}

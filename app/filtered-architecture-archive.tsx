"use client";

import { useState } from "react";
import { GENERATED_ARCHITECTURE_IMAGES, type GeneratedArchitectureCategory } from "../lib/generated-architecture";

const CATEGORY_LABELS: Record<GeneratedArchitectureCategory, string> = {
  architecture: "Small-scale architecture",
  interiors: "Interiors and adaptive reuse",
  drawings: "Plans, sections and spatial strategy",
  technical: "Details, assemblies and retrofit",
  landscape: "Pavilions, landscape and site planning",
};

const categories = Object.keys(CATEGORY_LABELS) as GeneratedArchitectureCategory[];
const categoryCounts = Object.fromEntries(categories.map((category) => [category, GENERATED_ARCHITECTURE_IMAGES.filter((image) => image.category === category).length])) as Record<GeneratedArchitectureCategory, number>;

export function FilteredArchitectureArchive() {
  const [activeCategory, setActiveCategory] = useState<GeneratedArchitectureCategory>("architecture");
  const [expanded, setExpanded] = useState(false);
  const images = GENERATED_ARCHITECTURE_IMAGES.filter((image) => image.category === activeCategory);
  const visibleImages = expanded ? images : images.slice(0, 12);

  return <section className="ga-archive" aria-labelledby="ga-archive-title">
    <header className="ga-archive__intro"><span>Filtered architectural study archive / 91 distinct plates</span><h2 id="ga-archive-title">Choose a field.<br/>Study it properly.</h2><p>The complete architecture-only archive remains available without forcing every visitor to download or scroll through all 91 studies at once. Select a discipline, then expand only when needed.</p></header>
    <div className="ga-archive__filters" aria-label="Filter architecture studies">{categories.map((category) => <button type="button" aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setExpanded(false); }} key={category}><span>{String(categoryCounts[category]).padStart(2, "0")}</span>{CATEGORY_LABELS[category]}</button>)}</div>
    <section className="ga-archive__group" aria-labelledby={`ga-group-${activeCategory}`}><header><small>{String(images.length).padStart(2, "0")} studies / selected field</small><h3 id={`ga-group-${activeCategory}`}>{CATEGORY_LABELS[activeCategory]}</h3></header><div className="ga-archive__grid">{visibleImages.map((image, index) => <figure key={image.src}><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw" /><figcaption><small>{String(index + 1).padStart(2, "0")}</small><span>{image.title}</span></figcaption></figure>)}</div>{images.length > 12 ? <button className="ga-archive__more" type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? "Show fewer studies" : `Show all ${images.length} studies`}</button> : null}</section>
  </section>;
}

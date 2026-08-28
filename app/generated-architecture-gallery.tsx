import {
  GENERATED_ARCHITECTURE_IMAGES,
  architectureImages,
  type GeneratedArchitectureCategory,
} from "../lib/generated-architecture";

type StudyStripProps = {
  slug: string;
  category: GeneratedArchitectureCategory;
  count?: 1 | 2;
  title?: string;
};

function offsetFor(slug: string) {
  return [...slug].reduce((total, character) => total + character.charCodeAt(0), 0);
}

export function GeneratedStudyStrip({ slug, category, count = 2, title = "Architecture in focus." }: StudyStripProps) {
  const images = architectureImages(category, count, offsetFor(slug));

  return <section className={`ga-strip ga-strip--${count}`} aria-labelledby={`ga-strip-${slug}`}>
    <header>
      <span>Spatial study / Artimist</span>
      <h2 id={`ga-strip-${slug}`}>{title}</h2>
      <p>Compact architectural studies selected to clarify material, proportion, construction and atmosphere.</p>
    </header>
    <div>
      {images.map((image) => <figure key={`${slug}-${image.src}`}>
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          sizes={count === 1 ? "(max-width: 760px) 100vw, 62vw" : "(max-width: 760px) 100vw, 50vw"}
        />
        <figcaption><small>{image.category}</small><span>{image.title}</span></figcaption>
      </figure>)}
    </div>
  </section>;
}

const CATEGORY_LABELS: Record<GeneratedArchitectureCategory, string> = {
  architecture: "Small-scale architecture",
  interiors: "Interiors and adaptive reuse",
  drawings: "Plans, sections and spatial strategy",
  technical: "Details, assemblies and retrofit",
  landscape: "Pavilions, landscape and site planning",
};

export function GeneratedArchitectureArchive() {
  const categories = Object.keys(CATEGORY_LABELS) as GeneratedArchitectureCategory[];

  return <section className="ga-archive" aria-labelledby="ga-archive-title">
    <header className="ga-archive__intro">
      <span>Architectural study archive / 91 distinct plates</span>
      <h2 id="ga-archive-title">Small buildings.<br/>Serious resolution.</h2>
      <p>Architecture-only studies spanning compact homes, conversions, interiors, technical details, drawing sets and landscape structures. Each image is loaded only when it approaches the viewport.</p>
    </header>
    {categories.map((category) => {
      const images = GENERATED_ARCHITECTURE_IMAGES.filter((image) => image.category === category);
      return <section className="ga-archive__group" key={category} aria-labelledby={`ga-group-${category}`}>
        <header><small>{String(images.length).padStart(2, "0")} studies</small><h3 id={`ga-group-${category}`}>{CATEGORY_LABELS[category]}</h3></header>
        <div className="ga-archive__grid">
          {images.map((image, index) => <figure key={image.src}>
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw" />
            <figcaption><small>{String(index + 1).padStart(2, "0")}</small><span>{image.title}</span></figcaption>
          </figure>)}
        </div>
      </section>;
    })}
  </section>;
}

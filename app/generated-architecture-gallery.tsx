import {
  architectureImages,
  type GeneratedArchitectureCategory,
} from "../lib/generated-architecture";
import { FilteredArchitectureArchive } from "./filtered-architecture-archive";

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

export function GeneratedArchitectureArchive() {
  return <FilteredArchitectureArchive />;
}

import type { MetadataRoute } from 'next'

const BASE = 'https://www.artimistproductions.com'

type Frequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

function entry(path: string, changeFrequency: Frequency, priority: number): MetadataRoute.Sitemap[number] {
  return { url: `${BASE}${path}`, changeFrequency, priority }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry('/', 'weekly', 1.0),
    entry('/home-design-services', 'monthly', 0.97),
    entry('/custom-house-design', 'monthly', 0.96),
    entry('/plan-modification-service', 'monthly', 0.96),
    entry('/3d-interior-design-service', 'monthly', 0.95),
    entry('/residential-renovation-permit-drawings', 'monthly', 0.95),

    entry('/international', 'monthly', 0.92),
    entry('/usa', 'monthly', 0.91),
    entry('/canada', 'monthly', 0.91),
    entry('/uk', 'monthly', 0.91),
    entry('/sweden', 'monthly', 0.9),

    entry('/architecture', 'monthly', 0.9),
    entry('/bim-drafting', 'monthly', 0.9),
    entry('/visualization', 'monthly', 0.9),
    entry('/architectural-drafting-services', 'monthly', 0.9),
    entry('/revit-drafting-services', 'monthly', 0.9),
    entry('/bim-modeling-services', 'monthly', 0.9),
    entry('/permit-drawing-services', 'monthly', 0.9),
    entry('/construction-documentation-services', 'monthly', 0.9),
    entry('/architectural-visualization-services', 'monthly', 0.9),
    entry('/services', 'monthly', 0.9),
    entry('/services/architectural-rendering', 'monthly', 0.9),
    entry('/services/3d-interior-rendering', 'monthly', 0.9),
    entry('/services/real-estate-rendering', 'monthly', 0.9),
    entry('/services/architectural-animation', 'monthly', 0.9),
    entry('/residential', 'monthly', 0.9),
    entry('/unreal-engine', 'monthly', 0.9),

    entry('/case-studies', 'monthly', 0.9),
    entry('/case-studies/rv-park-design', 'monthly', 0.86),
    entry('/case-studies/permit-application-packages', 'monthly', 0.86),
    entry('/case-studies/home-interior-design', 'monthly', 0.86),
    entry('/case-studies/residential-exterior-design', 'monthly', 0.86),
    entry('/case-studies/bowl-stroke', 'monthly', 0.85),
    entry('/case-studies/harmonic-horizons', 'monthly', 0.85),
    entry('/case-studies/us-permit-documentation', 'monthly', 0.87),
    entry('/case-studies/residential-visualization', 'monthly', 0.85),
    entry('/case-studies/parametric-canopy-studies', 'monthly', 0.8),
    entry('/case-studies/connected-learning-auditorium', 'monthly', 0.8),

    entry('/insights', 'weekly', 0.88),
    entry('/insights/how-much-do-custom-house-plans-cost', 'monthly', 0.84),
    entry('/insights/permit-drawings-vs-construction-drawings', 'monthly', 0.84),
    entry('/insights/how-to-modify-an-existing-floor-plan', 'monthly', 0.84),
    entry('/insights/revit-drafting-vs-cad-drafting', 'monthly', 0.84),
    entry('/insights/what-is-scan-to-bim', 'monthly', 0.84),
    entry('/insights/lod-200-vs-lod-300-vs-lod-400', 'monthly', 0.84),
    entry('/insights/how-much-does-architectural-rendering-cost', 'monthly', 0.84),
    entry('/insights/3d-rendering-vs-unreal-engine-walkthrough', 'monthly', 0.84),

    entry('/proof', 'monthly', 0.78),
    entry('/visual-archive', 'weekly', 0.8),
    entry('/process', 'monthly', 0.7),
    entry('/partners', 'monthly', 0.6),
    entry('/partners/decoding-bits', 'monthly', 0.5),
    entry('/partners/scallance', 'monthly', 0.5),
    entry('/about', 'monthly', 0.6),
    entry('/team', 'monthly', 0.5),
    entry('/founder-message', 'yearly', 0.4),
    entry('/contact', 'monthly', 0.8),
  ]
}

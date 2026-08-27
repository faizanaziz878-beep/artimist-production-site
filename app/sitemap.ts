import type { MetadataRoute } from 'next'

const BASE = 'https://www.artimistproductions.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: `${BASE}/`,                       lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/home-design-services`,   lastModified, changeFrequency: 'monthly', priority: 0.97 },
    { url: `${BASE}/custom-house-design`,    lastModified, changeFrequency: 'monthly', priority: 0.96 },
    { url: `${BASE}/plan-modification-service`, lastModified, changeFrequency: 'monthly', priority: 0.96 },
    { url: `${BASE}/3d-interior-design-service`, lastModified, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/residential-renovation-permit-drawings`, lastModified, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/international`,          lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/architecture`,                        lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/bim-drafting`,                        lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/visualization`,                       lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/architectural-drafting-services`,     lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/revit-drafting-services`,             lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/bim-modeling-services`,               lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/permit-drawing-services`,             lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/construction-documentation-services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/architectural-visualization-services`,lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services`,                lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/architectural-rendering`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/3d-interior-rendering`,  lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/real-estate-rendering`,  lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/architectural-animation`,lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/residential`,             lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/unreal-engine`,           lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/case-studies`,            lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/case-studies/rv-park-design`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/case-studies/permit-application-packages`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/case-studies/home-interior-design`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/case-studies/residential-exterior-design`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/visual-archive`,          lastModified, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/process`,                 lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/partners`,                lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/partners/decoding-bits`,  lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/partners/scallance`,      lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about`,                   lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/team`,                    lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/founder-message`,         lastModified, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/contact`,                 lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ]
}

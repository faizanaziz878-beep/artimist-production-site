import type { MetadataRoute } from 'next'

const BASE = 'https://www.artimistproductions.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: `${BASE}/`,                       lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,                lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/residential`,             lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/unreal-engine`,           lastModified, changeFrequency: 'monthly', priority: 0.9 },
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

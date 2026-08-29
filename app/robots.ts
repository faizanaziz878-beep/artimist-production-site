import type { MetadataRoute } from 'next'

const BASE = 'https://www.artimistproductions.com'

// Legacy /seo-* routes deliberately return canonical tags to their real pages.
// They must remain crawlable so search engines can actually read and consolidate
// those canonicals. Private/admin and internal API routes stay blocked.
const OPEN = { allow: '/', disallow: ['/admin', '/api/', '/__home'] }

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', ...OPEN },
      { userAgent: 'Googlebot', ...OPEN },
      { userAgent: 'Googlebot-Image', ...OPEN },
      { userAgent: 'Bingbot', ...OPEN },
      { userAgent: 'OAI-SearchBot', ...OPEN },
      { userAgent: 'ChatGPT-User', ...OPEN },
      { userAgent: 'PerplexityBot', ...OPEN },
      { userAgent: 'Applebot', ...OPEN },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}

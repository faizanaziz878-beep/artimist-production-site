import type { MetadataRoute } from 'next'

const BASE = 'https://www.artimistproductions.com'
const OPEN = { allow: '/', disallow: ['/admin', '/api/'] }

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
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}

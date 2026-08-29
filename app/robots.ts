import type { MetadataRoute } from 'next'

const BASE = 'https://www.artimistproductions.com'

// Public discovery is intentionally broad. Private/admin and internal API routes stay blocked.
// Search/answer-engine bots are named explicitly so vendor-specific robots matching cannot
// accidentally reduce discoverability even though the wildcard rule is already permissive.
const OPEN = { allow: '/', disallow: ['/admin', '/api/', '/__home'] }

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', ...OPEN },

      // Google Search, Images, AI Overviews / AI Mode, and Gemini grounding controls.
      { userAgent: 'Googlebot', ...OPEN },
      { userAgent: 'Googlebot-Image', ...OPEN },
      { userAgent: 'Google-Extended', ...OPEN },

      // Microsoft Search / Bing surfaces, including Copilot web grounding.
      { userAgent: 'Bingbot', ...OPEN },

      // OpenAI search and user-triggered retrieval.
      { userAgent: 'OAI-SearchBot', ...OPEN },
      { userAgent: 'ChatGPT-User', ...OPEN },

      // Perplexity answer engine.
      { userAgent: 'PerplexityBot', ...OPEN },

      // Anthropic search indexing and user-triggered retrieval.
      { userAgent: 'Claude-SearchBot', ...OPEN },
      { userAgent: 'Claude-User', ...OPEN },

      // Apple Search / Siri / Spotlight / Safari AI context.
      { userAgent: 'Applebot', ...OPEN },

      // Independent search indexes and broad web discovery.
      { userAgent: 'DuckDuckBot', ...OPEN },
      { userAgent: 'CCBot', ...OPEN },
    ],
    sitemap: [`${BASE}/sitemap.xml`, `${BASE}/image-sitemap.xml`],
    host: BASE,
  }
}

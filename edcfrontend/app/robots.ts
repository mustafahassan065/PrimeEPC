import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const disallowed = ['/admin/', '/api/']
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: disallowed },
      { userAgent: 'Googlebot', allow: '/', disallow: disallowed },
      { userAgent: 'Google-Extended', allow: '/', disallow: disallowed },
      { userAgent: 'Bingbot', allow: '/', disallow: disallowed },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: disallowed },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: disallowed },
      { userAgent: 'GPTBot', allow: '/', disallow: disallowed },
      { userAgent: 'PerplexityBot', allow: '/', disallow: disallowed },
      { userAgent: 'ClaudeBot', allow: '/', disallow: disallowed },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: disallowed },
    ],
    sitemap: 'https://www.primeepcdesign.co.uk/sitemap.xml',
  }
}

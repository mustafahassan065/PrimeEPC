import type { MetadataRoute } from 'next'
import { targetLocations } from '@/lib/locationData'

const BASE = 'https://www.primeepcdesign.co.uk'

// Core pages: [path, lastModified, changeFrequency, priority]
const pages: [string, string, 'weekly' | 'monthly', number][] = [
  ['/', '2026-10-20', 'weekly', 1.0],
  ['/domestic-epc', '2026-10-20', 'monthly', 0.9],
  ['/commercial-epc', '2026-10-20', 'monthly', 0.9],
  ['/eicr', '2026-10-20', 'monthly', 0.9],
  ['/landlord-certificates', '2026-10-20', 'monthly', 0.9],
  ['/bulk-epc', '2026-10-20', 'monthly', 0.8],
  ['/epc-near-me', '2026-10-20', 'monthly', 0.8],
  ['/electrical-design', '2026-10-20', 'monthly', 0.8],
  ['/floor-plans-drafting', '2026-10-20', 'monthly', 0.7],
  ['/pricing', '2026-10-20', 'monthly', 0.8],
  ['/faq', '2026-10-20', 'monthly', 0.7],
  ['/areas-we-serve', '2026-10-20', 'monthly', 0.8],
  ['/booking', '2026-10-20', 'weekly', 0.9],
  ['/about', '2026-10-20', 'monthly', 0.8],
  ['/why-us', '2026-10-20', 'monthly', 0.8],
  ['/blog', '2026-10-20', 'weekly', 0.8],
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Core pages
  const core = pages.map(([path, date, changeFrequency, priority]) => ({
    url: `${BASE}${path === '/' ? '' : path}`,
    lastModified: new Date(date),
    changeFrequency,
    priority,
  }))

  // 2. Location pages
  const locations = targetLocations.map((l) => ({
    url: `${BASE}/locations/${l.slug}`,
    lastModified: new Date('2026-10-20'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 3. Blog posts (fetched from API)
  let posts: MetadataRoute.Sitemap = []
  const candidateUrls = [
    process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/blogs` : null,
    'http://127.0.0.1:5000/api/blogs',
    'http://localhost:5000/api/blogs',
    'https://www.primeepcdesign.co.uk/api/blogs',
    'https://primeepcdesign.co.uk/api/blogs',
  ].filter(Boolean) as string[]

  for (const url of candidateUrls) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeoutId)
      if (res.ok) {
        const json = await res.json()
        const list = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.blogs)
          ? json.blogs
          : []
        if (list.length > 0) {
          posts = list
            .filter((p: { slug?: string }) => p.slug)
            .map(
              (p: {
                slug: string
                updated_at?: string
                updatedAt?: string
                created_at?: string
                createdAt?: string
              }) => {
                const d =
                  p.updated_at ?? p.updatedAt ?? p.created_at ?? p.createdAt
                return {
                  url: `${BASE}/blog/${p.slug}`,
                  ...(d ? { lastModified: new Date(d) } : {}),
                  changeFrequency: 'monthly' as const,
                  priority: 0.7,
                }
              }
            )
          break
        }
      }
    } catch {
      continue
    }
  }

  return [...core, ...locations, ...posts]
}
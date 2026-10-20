import type { MetadataRoute } from 'next'
import { targetLocations } from '@/lib/locationData'

const BASE = 'https://www.primeepcdesign.co.uk'
const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://www.primeepcdesign.co.uk'

const pages: [string, string][] = [
  ['/', '2026-10-20'],
  ['/domestic-epc', '2026-10-20'],
  ['/commercial-epc', '2026-10-20'],
  ['/eicr', '2026-10-20'],
  ['/landlord-certificates', '2026-10-20'],
  ['/bulk-epc', '2026-10-20'],
  ['/epc-near-me', '2026-10-20'],
  ['/electrical-design', '2026-10-20'],
  ['/floor-plans-drafting', '2026-10-20'],
  ['/pricing', '2026-10-20'],
  ['/faq', '2026-10-20'],
  ['/areas-we-serve', '2026-10-20'],
  ['/booking', '2026-10-20'],
  ['/about', '2026-10-20'],
  ['/why-us', '2026-10-20'],
  ['/blog', '2026-10-20'],
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const core = pages.map(([path, date]) => ({
    url: `${BASE}${path === '/' ? '' : path}`,
    lastModified: new Date(date),
  }))

  const locations = targetLocations.map((l) => ({
    url: `${BASE}/locations/${l.slug}`,
    lastModified: new Date('2026-10-20'),
  }))

  let posts: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${API}/api/blogs`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const json = await res.json()
      const list = Array.isArray(json.data) ? json.data : Array.isArray(json.blogs) ? json.blogs : []
      posts = list
        .filter((p: { slug?: string }) => p.slug)
        .map((p: { slug: string; updated_at?: string; updatedAt?: string; created_at?: string; createdAt?: string }) => {
          const d = p.updated_at ?? p.updatedAt ?? p.created_at ?? p.createdAt
          return {
            url: `${BASE}/blog/${p.slug}`,
            ...(d ? { lastModified: new Date(d) } : {}),
          }
        })
    }
  } catch {
    // skip if offline during build
  }

  return [...core, ...locations, ...posts]
}

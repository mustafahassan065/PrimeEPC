import type { MetadataRoute } from 'next';
import { targetLocations } from '@/lib/locationData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.primeepcdesign.co.uk';
  const now = new Date();

  const dynamicLocationUrls: MetadataRoute.Sitemap = targetLocations.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const coreRoutes = [
    '',
    'booking',
    'about',
    'why-us',
    'floor-plans-drafting',
    'blog',
    'terms',
    'privacy',
    'refund',
    'cookies',
  ];

  const corePages: MetadataRoute.Sitemap = coreRoutes.map((route) => ({
    url: `${baseUrl}${route ? `/${route}` : ''}`,
    lastModified: now,
    changeFrequency: (route === '' || route === 'booking' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : route === 'booking' ? 0.9 : 0.8,
  }));

  // Fetch dynamic blog posts from backend API if available
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch('https://primeepcdesign.co.uk/api/blogs', { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.blogs)) {
        blogRoutes = data.blogs.map((post: { slug: string; updatedAt?: string }) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
      }
    }
  } catch {
    // Graceful fallback during offline build
  }

  return [...corePages, ...dynamicLocationUrls, ...blogRoutes];
}

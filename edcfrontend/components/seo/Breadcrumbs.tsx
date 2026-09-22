import Link from 'next/link'
import JsonLd from './JsonLd'
import { BUSINESS } from '@/lib/business'

type Crumb = { name: string; path: string }

export default function Breadcrumbs({ items, className = 'text-white/80' }:
  { items: Crumb[]; className?: string }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={`flex flex-wrap gap-2 text-sm mb-6 ${className}`}>
        {items.map((c, i) => (
          <span key={c.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>›</span>}
            {i < items.length - 1
              ? <Link href={c.path} className="hover:underline">{c.name}</Link>
              : <span aria-current="page" className="font-semibold">{c.name}</span>}
          </span>
        ))}
      </nav>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((c, i) => ({
          '@type': 'ListItem', position: i + 1, name: c.name,
          item: `${BUSINESS.url}${c.path}`,
        })),
      }} />
    </>
  )
}
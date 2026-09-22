import JsonLd from './JsonLd'
import { BUSINESS } from '@/lib/business'

export default function ServiceSchema({ name, path, serviceType, price, areas }:
  { name: string; path: string; serviceType: string; price?: number; areas: string[] }) {
  return (
    <JsonLd data={{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      serviceType,
      url: `${BUSINESS.url}${path}`,
      provider: { '@id': `${BUSINESS.url}/#business` },
      areaServed: areas.map((a) => ({ '@type': 'City', name: a })),
      ...(price ? { offers: { '@type': 'Offer', price: String(price), priceCurrency: 'GBP' } } : {}),
    }} />
  )
}
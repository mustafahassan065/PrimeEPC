import JsonLd from './JsonLd'
import { BUSINESS as B } from '@/lib/business'

export default function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${B.url}/#business`,
        name: B.name,
        legalName: B.legalName,
        url: B.url,
        logo: `${B.url}/images/logo3.png`,
        image: `${B.url}/images/logo3.png`,
        telephone: B.phoneIntl,
        email: B.email,
        priceRange: '£50 - £144',
        address: {
          '@type': 'PostalAddress',
          streetAddress: B.street,
          addressLocality: B.locality,
          addressRegion: B.region,
          postalCode: B.postcode,
          addressCountry: 'GB',
        },
        geo: { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng },
        areaServed: [
          'Bolton','Manchester','Salford','Bury','Wigan','Leigh','Chorley',
          'Oldham','Rochdale','Stockport',
        ].map((name) => ({ '@type': 'City', name })),
        openingHoursSpecification: B.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        sameAs: B.sameAs,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'EPC and electrical compliance services',
          itemListElement: [
            ['Domestic EPC', '/domestic-epc', B.prices.domesticEpc],
            ['Commercial EPC', '/commercial-epc', B.prices.commercialEpcFrom],
            ['EICR electrical safety report', '/eicr', B.prices.eicrFrom],
            ['Floor plans', '/floor-plans-drafting', null],
          ].map(([name, path, price]) => ({
            '@type': 'Offer',
            ...(price ? { price: String(price), priceCurrency: 'GBP' } : {}),
            itemOffered: { '@type': 'Service', name, url: `${B.url}${path}` },
          })),
        },
      }}
    />
  )
}
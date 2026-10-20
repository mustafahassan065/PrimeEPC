import JsonLd from './JsonLd'
import { BUSINESS as B } from '@/lib/business'

export default function LocalBusinessSchema() {
  const areas = [
    'Bolton', 'Manchester', 'Salford', 'Bury', 'Wigan', 'Oldham',
    'Rochdale', 'Stockport', 'Trafford', 'Tameside', 'Warrington',
    'Blackburn', 'Chorley', 'Liverpool', 'St Helens', 'Rossendale'
  ]

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfessionalService',
            '@id': `${B.url}/#business`,
            name: B.name,
            legalName: B.legalName,
            url: B.url,
            logo: `${B.url}/images/logo3.png`,
            image: `${B.url}/images/logo3.png`,
            telephone: B.phoneIntl,
            email: B.email,
            priceRange: '£50 - £144+',
            address: {
              '@type': 'PostalAddress',
              streetAddress: B.street,
              addressLocality: B.locality,
              addressRegion: B.region,
              postalCode: B.postcode,
              addressCountry: 'GB',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: B.geo.lat,
              longitude: B.geo.lng,
            },
            areaServed: areas.map((name) => ({ '@type': 'City', name })),
            knowsAbout: [
              'EPC Certificate from £50 Same Day Bookings',
              'Urgent EPC Surveys and Same Day EPC Reports',
              'Book EPC for Remortgage and Green Mortgage Valuations',
              'Domestic Energy Performance Certificates (EPC) RdSAP 10',
              'Bulk EPC Volume Discounts for Landlord Portfolios and Letting Agents',
              'Commercial EPC Level 3 and Level 4 Non-Domestic SBEM Calculations',
              'Commercial Lease Renewal EPC and MEES Band E Compliance',
              '5-Year Landlord EICR Electrical Safety Inspection and Testing (BS 7671 18th Edition)',
              'Combined Single-Visit Landlord EPC and EICR Compliance Packages',
              'HMO and Council Selective Licensing EPC, EICR, and Measured Floor Plans',
              'UK Warm Homes Plan 1 October 2030 EPC Band C Upgrades (£10,000 Cost Cap)',
              'RICS GIA Laser-Measured 2D/3D Marketing Floor Plans and Land Registry Lease Plans',
              'BS 7671 Electrical Design Drawings, BS 5266 Emergency Lighting, and BS 5839 Fire Alarm CAD Layouts',
            ],
            openingHoursSpecification: B.hours.map((h) => ({
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: h.days,
              opens: h.opens,
              closes: h.closes,
            })),
            sameAs: B.sameAs,
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Property Energy & Electrical Compliance Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    minPrice: '50.00',
                    priceCurrency: 'GBP',
                    description: 'EPC certificate from £50 — same day bookings available (tiered by property size)',
                  },
                  itemOffered: { '@type': 'Service', name: 'Domestic EPC Assessment (Same-Day Survey Available)', url: `${B.url}/domestic-epc` },
                },
                {
                  '@type': 'Offer',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    minPrice: '144.00',
                    priceCurrency: 'GBP',
                    description: 'Commercial EPC starting from £144 (Level 3 & Level 4 SBEM)',
                  },
                  itemOffered: { '@type': 'Service', name: 'Commercial EPC Assessment', url: `${B.url}/commercial-epc` },
                },
                {
                  '@type': 'Offer',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    minPrice: '110.00',
                    priceCurrency: 'GBP',
                    description: 'Landlord EICR starting from £110 (tiered by consumer unit circuits)',
                  },
                  itemOffered: { '@type': 'Service', name: 'Landlord EICR Electrical Safety Report', url: `${B.url}/eicr` },
                },
                {
                  '@type': 'Offer',
                  description: 'Discounted single-visit combined EPC and 5-year EICR package',
                  itemOffered: { '@type': 'Service', name: 'Landlord Combined EPC & EICR Package', url: `${B.url}/landlord-certificates` },
                },
                {
                  '@type': 'Offer',
                  description: 'Custom multi-property bulk EPC discounts for landlords, letting agents, and blocks of flats',
                  itemOffered: { '@type': 'Service', name: 'Bulk & Portfolio EPC Orders (Volume Discount)', url: `${B.url}/bulk-epc` },
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'CAD Floor Plans & Lease Plans', url: `${B.url}/floor-plans-drafting` },
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'BS 7671 Electrical Design Consultancy', url: `${B.url}/electrical-design` },
                },
              ],
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${B.url}/#website`,
            url: B.url,
            name: B.name,
            publisher: { '@id': `${B.url}/#business` },
            inLanguage: 'en-GB',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${B.url}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
        ],
      }}
    />
  )
}
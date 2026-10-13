import type { Metadata } from 'next';
import EpcNearMeClient from './EpcNearMeClient';
import JsonLd from '@/components/seo/JsonLd';
import { BUSINESS } from '@/lib/business';
import { targetLocations } from '@/lib/locationData';

export const metadata: Metadata = {
  title: { absolute: 'EPC Near Me from £50 | Accredited Assessors 50-Mile Radius' },
  description:
    'Looking for an accredited EPC assessor near you? Local domestic and commercial energy certificates across Greater Manchester, Cheshire, Merseyside & Lancashire. From £50. 24–48h lodgement.',
  alternates: { canonical: '/epc-near-me' },
  openGraph: {
    url: '/epc-near-me',
    title: 'EPC Near Me from £50 | Accredited Assessors 50-Mile Radius',
    description:
      'Find accredited EPC assessors near you across Greater Manchester, Cheshire, Merseyside & Lancashire within a 50-mile radius. Fast 24–48h lodgement from £50.',
  },
};

const nearMeFaqs = [
  {
    q: 'How do I find an accredited EPC assessor near me?',
    a: 'Prime EPC provides accredited, government-approved energy assessors across a 50-mile radius of Greater Manchester. You can enter your postcode or select your nearest borough to book direct with no estate agent commission.',
  },
  {
    q: 'Can an EPC assessor visit my property today or tomorrow?',
    a: 'Yes. Because our assessors are locally based across Bolton, Manchester, Salford, Bury, and surrounding North West areas, we regularly offer same-day and next-day inspection appointments.',
  },
  {
    q: 'How much does an EPC cost near me in Greater Manchester?',
    a: 'Our domestic Energy Performance Certificates start from £50 with complete transparent pricing and zero travel fees across our 50-mile North West radius. Commercial EPCs start from £144.',
  },
  {
    q: 'How quickly is my EPC lodged on the national register?',
    a: 'Your certificate is officially lodged on the UK National EPC Register and delivered digitally as a PDF within 24 to 48 hours following your property survey.',
  },
];

export default function EpcNearMePage() {
  return (
    <>
      {/* Schema Markup for Local SEO */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': `${BUSINESS.url}/epc-near-me/#service`,
          name: 'Prime EPC & Design Consultants — Local EPC Assessors Near Me',
          url: `${BUSINESS.url}/epc-near-me`,
          telephone: BUSINESS.phoneIntl,
          email: BUSINESS.email,
          priceRange: '£50 - £144',
          areaServed: targetLocations.map((l) => ({ '@type': 'City', name: l.name })),
          address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS.street,
            addressLocality: BUSINESS.locality,
            addressRegion: BUSINESS.region,
            postalCode: BUSINESS.postcode,
            addressCountry: 'GB',
          },
          geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Local EPC Services',
            itemListElement: [
              { '@type': 'Offer', name: 'Domestic EPC Near Me', price: '50', priceCurrency: 'GBP' },
              { '@type': 'Offer', name: 'Commercial EPC Near Me', price: '144', priceCurrency: 'GBP' },
              { '@type': 'Offer', name: 'Landlord EICR Electrical Report', price: '110', priceCurrency: 'GBP' },
            ],
          },
        }}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: nearMeFaqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      <EpcNearMeClient faqs={nearMeFaqs} />
    </>
  );
}

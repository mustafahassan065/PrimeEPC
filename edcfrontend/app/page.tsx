import type { Metadata } from 'next'
import { Suspense } from 'react'
import HomeClient from '@/components/home/HomeClient'

export const metadata: Metadata = {
  title: { absolute: 'EPC Greater Manchester & 50-Mile Radius | From £50' },
  description: 'Accredited EPC assessors serving Greater Manchester, Cheshire, Merseyside & Lancashire within a 50-mile radius. Domestic EPCs from £50. Fast 24–48h lodgement.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'EPC Greater Manchester & 50-Mile Radius | From £50',
    description: 'Accredited EPC assessors serving Greater Manchester, Cheshire, Merseyside & Lancashire within a 50-mile radius. Domestic EPCs from £50.',
  },
}

export default function Home() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prime EPC',
    url: 'https://www.primeepcdesign.co.uk',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.primeepcdesign.co.uk/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Prime EPC',
    description: 'Accredited Energy Performance Certificate (EPC) and Landlord Electrical (EICR) assessments across Greater Manchester and a 50-mile radius.',
    url: 'https://www.primeepcdesign.co.uk',
    telephone: '+447308658247',
    priceRange: 'From £50',
    image: 'https://www.primeepcdesign.co.uk/images/bg.avif',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '17 Bromwich Street',
      addressLocality: 'Bolton',
      postalCode: 'BL2 1JF',
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.578,
      longitude: -2.429
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '18',
      bestRating: '5',
      worstRating: '1'
    },
    areaServed: [
      'Greater Manchester',
      'Bolton',
      'Bury',
      'Manchester',
      'Salford',
      'Wigan',
      'Rochdale',
      'Oldham',
      'Stockport',
      'Trafford',
      'Tameside'
    ]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does an EPC cost in Greater Manchester?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'At Prime EPC, domestic Energy Performance Certificates start from £50 with complete transparent pricing and no hidden costs across Greater Manchester. Commercial EPCs start from £144.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long is an EPC valid for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An EPC is valid for 10 years from the date of issue. If you are selling or letting a property, you legally need a valid certificate.'
        }
      },
      {
        '@type': 'Question',
        name: 'How quickly can I get an EPC certificate lodged?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Assessments are completed in 30 to 60 minutes, and the official government certificate is lodged and emailed within 24 to 48 hours.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I book an EPC and Landlord EICR electrical check together?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Prime EPC provides combined Landlord Compliance Packages starting from £160, combining both the EPC assessment and 5-year statutory EICR into a single visit.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#016837] flex items-center justify-center text-white font-bold text-lg">
            Loading Prime EPC...
          </div>
        }
      >
        <HomeClient />
      </Suspense>
    </>
  )
}
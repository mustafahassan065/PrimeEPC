import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileStickyBar from '../components/MobileStickyBar'
import type { ReactNode } from "react"
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.primeepcdesign.co.uk'),
  title: {
    default: 'Energy Performance Certificates (EPC) in Greater Manchester | From £50',
    template: '%s | Prime EPC',
  },
  description: 'Fast, accredited domestic and commercial EPC certificates across Greater Manchester and a 50-mile radius. Fixed pricing from £50 with 24–48 hour turnaround.',
  keywords: [
    'EPC',
    'EPC Manchester',
    'EPC Greater Manchester',
    'EPC in Manchester',
    'EPC in Greater Manchester',
    'EPC Certificate Greater Manchester',
    'Commercial EPC Greater Manchester',
    'Domestic EPC Certificate Greater Manchester',
    'Cheap EPC Greater Manchester £50',
    'EICR Certificate Greater Manchester',
    'Landlord EPC certificate 2026',
    'MEES compliance Greater Manchester',
    'EPC Bolton',
    'EPC Stockport',
    'EPC Salford',
    'EPC Oldham',
    'EPC Rochdale',
    'Energy Performance Certificate UK',
    'Accredited Energy Assessor Greater Manchester',
    'Floor plans for estate agents Greater Manchester',
    'Electrical Installation Condition Report EICR'
  ],
  authors: [{ name: 'Prime EPC & Design Consultant Ltd' }],
  creator: 'Prime EPC & Design Consultant Ltd',
  publisher: 'Prime EPC & Design Consultant Ltd',
  category: 'Real Estate & Energy Services',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk',
  },
  openGraph: {
    title: 'EPC Greater Manchester from £50 | Prime EPC Certificates & Compliance',
    description:
      'Accredited domestic & commercial EPC certificates from £50 across Greater Manchester. Quidos-accredited assessors, 2026 MEES compliance & EICR reports. 24-48h turnaround.',
    url: 'https://www.primeepcdesign.co.uk',
    siteName: 'Prime EPC & Design Consultants',
    images: [
      {
        url: '/images/logo3.png',
        width: 800,
        height: 600,
        alt: 'Prime EPC and Design Consultants Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPC Greater Manchester from £50 | Prime EPC Certificates & Compliance',
    description:
      'Accredited domestic & commercial EPC certificates from £50 across Greater Manchester. Quidos-accredited assessors, 2026 MEES compliance & EICR reports. 24-48h turnaround.',
    images: ['/images/logo3.png'],
  },
  icons: {
    icon: '/images/logo3.png',
    shortcut: '/images/logo3.png',
    apple: '/images/logo3.png',
  },
}

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.primeepcdesign.co.uk/#organization',
      name: 'Prime EPC & Design Consultant Ltd',
      url: 'https://www.primeepcdesign.co.uk',
      logo: 'https://www.primeepcdesign.co.uk/images/logo3.png',
      image: 'https://www.primeepcdesign.co.uk/images/logo3.png',
      telephone: '+447308658247',
      email: 'info@primeepcdesign.co.uk',
      priceRange: '£50 - £144',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '17 Bromwich Street',
        addressLocality: 'Bolton',
        addressRegion: 'Greater Manchester',
        postalCode: 'BL2 1JF',
        addressCountry: 'GB'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.578,
        longitude: -2.429
      },
      serviceArea: [
        'Greater Manchester',
        'Bolton',
        'Stockport',
        'Salford',
        'Merseyside',
        'Lancashire',
        'Cheshire'
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Greater Manchester' },
        { '@type': 'City', name: 'Bolton' },
        { '@type': 'City', name: 'Stockport' },
        { '@type': 'City', name: 'Salford' },
        { '@type': 'AdministrativeArea', name: 'Merseyside' },
        { '@type': 'AdministrativeArea', name: 'Lancashire' },
        { '@type': 'AdministrativeArea', name: 'Cheshire' }
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '21:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '10:00',
          closes: '18:00'
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '1049',
        'bestRating': '5'
      },
      sameAs: [
        'https://www.facebook.com/primeepcdesign',
        'https://www.instagram.com/primeepcdesign',
        'https://www.linkedin.com/company/primeepcdesign'
      ]
    },
    {
      '@type': 'Service',
      '@id': 'https://www.primeepcdesign.co.uk/#domestic-epc',
      name: 'Domestic Energy Performance Certificate (EPC) Greater Manchester',
      serviceType: 'Energy Assessment',
      provider: { '@id': 'https://www.primeepcdesign.co.uk/#organization' },
      areaServed: 'Greater Manchester',
      'offers': {
        '@type': 'Offer',
        price: '50.00',
        priceCurrency: 'GBP'
      }
    },
    {
      '@type': 'Service',
      '@id': 'https://www.primeepcdesign.co.uk/#commercial-epc',
      name: 'Commercial Energy Performance Certificate (EPC) Greater Manchester',
      serviceType: 'Commercial Energy Assessment',
      provider: { '@id': 'https://www.primeepcdesign.co.uk/#organization' },
      areaServed: 'Greater Manchester',
      'offers': {
        '@type': 'Offer',
        price: '144.00',
        priceCurrency: 'GBP'
      }
    },
    {
      '@type': 'Service',
      '@id': 'https://www.primeepcdesign.co.uk/#eicr-report',
      name: 'Electrical Installation Condition Report (EICR) Greater Manchester',
      serviceType: 'Electrical Inspection',
      provider: { '@id': 'https://www.primeepcdesign.co.uk/#organization' },
      areaServed: 'Greater Manchester',
      'offers': {
        '@type': 'Offer',
        price: '110.00',
        priceCurrency: 'GBP'
      }
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.primeepcdesign.co.uk/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does an EPC cost in Greater Manchester?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Domestic Energy Performance Certificates start from just £50 fixed fee with clear, transparent pricing and no hidden costs or estate agent mark-ups. Commercial EPCs start from £144.'
          }
        },
        {
          '@type': 'Question',
          name: 'Why should I book an EPC direct instead of through an estate agent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Booking direct with a local Quidos-accredited assessor eliminates expensive estate agent mark-ups and hidden commission fees. Same-day appointments and 24–48 hour certificate turnaround are available.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I book an EPC and EICR together for landlord compliance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Landlords needing compliance can book an EPC and EICR together in one visit to save time and call-out fees.'
          }
        },
        {
          '@type': 'Question',
          name: 'What areas do you cover for EPC certificates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We cover a 50-mile radius across the North West, including Greater Manchester, Bolton, Stockport, Salford, Merseyside, Lancashire, and Cheshire.'
          }
        },
        {
          '@type': 'Question',
          name: 'How quickly will I receive my EPC certificate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide fast 24 to 48-hour turnaround on domestic and commercial EPC certificates after property inspection, with direct lodgement on the UK National Register.'
          }
        }
      ]
    }
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon — circular, crisp, no blur */}
        <link rel="icon" href="/images/logo3.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/images/logo3.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo3.png" />
        <style>{`
          /* Force browser tab icon to render as circle */
          link[rel="icon"] {
            border-radius: 50%;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  )
}
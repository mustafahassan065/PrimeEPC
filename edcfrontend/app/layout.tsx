import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import type { ReactNode } from "react"
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.primeepcdesign.co.uk'),
  title: 'Prime EPC Manchester | Energy Performance Certificates & EICR',
  description:
    'Accredited domestic & commercial EPC certificates from £55 across Greater Manchester. EICR reports & floor plans. 24-48h turnaround. Call 07308658247.',
  keywords: [
    'EPC Certificate Manchester',
    'Commercial EPC Manchester',
    'EICR Manchester',
    'Cheap EPC Manchester',
    'Landlord EPC certificate',
    'EPC Bolton',
    'EICR Stockport',
    'Floor plans for estate agents Manchester',
    'MEES compliance Manchester'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Prime EPC Manchester | Energy Performance Certificates & EICR',
    description:
      'Accredited domestic & commercial EPC certificates from £55 across Greater Manchester. EICR reports & floor plans. 24-48h turnaround. Call 07308658247.',
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
    title: 'Prime EPC Manchester | Energy Performance Certificates & EICR',
    description:
      'Accredited domestic & commercial EPC certificates from £55 across Greater Manchester. EICR reports & floor plans. 24-48h turnaround.',
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
      priceRange: '£55 - £250',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '17 Bromwich Street',
        addressLocality: 'Bolton',
        addressRegion: 'Greater Manchester',
        postalCode: 'BL2 1JE',
        addressCountry: 'GB'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.578,
        longitude: -2.429
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Greater Manchester' },
        { '@type': 'City', name: 'Manchester' },
        { '@type': 'City', name: 'Bolton' },
        { '@type': 'City', name: 'Stockport' },
        { '@type': 'City', name: 'Salford' },
        { '@type': 'City', name: 'Oldham' },
        { '@type': 'City', name: 'Wigan' },
        { '@type': 'City', name: 'Didsbury' }
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
      name: 'Domestic Energy Performance Certificate (EPC) Manchester',
      serviceType: 'Energy Assessment',
      provider: { '@id': 'https://www.primeepcdesign.co.uk/#organization' },
      areaServed: 'Greater Manchester',
      'offers': {
        '@type': 'Offer',
        price: '55.00',
        priceCurrency: 'GBP'
      }
    },
    {
      '@type': 'Service',
      '@id': 'https://www.primeepcdesign.co.uk/#commercial-epc',
      name: 'Commercial Energy Performance Certificate (EPC) Manchester',
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
      name: 'Electrical Installation Condition Report (EICR) Manchester',
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
          name: 'How quickly can I get an EPC certificate in Manchester?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide fast 24 to 48-hour turnaround on domestic and commercial EPC certificates after property inspection across Greater Manchester.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the cost of a domestic EPC certificate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Domestic EPC certificates with Prime EPC start from just £55 with clear, transparent pricing and no hidden fees.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you provide commercial EPCs and EICR safety reports?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we provide commercial EPCs from £144, EICR landlord electrical safety inspection reports from £110, and professional floor plans.'
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
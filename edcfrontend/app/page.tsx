import type { Metadata } from 'next'
import { Suspense } from 'react'
import HomeClient from '@/components/home/HomeClient'
import JsonLd from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: { absolute: 'EPC Certificates from £50 | Same Day North West Bookings' },
  description:
    'Book your EPC today from £50 with same-day survey bookings across Greater Manchester, Merseyside, Lancashire & Cheshire. Commercial EPCs from £144, EICR from £110.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'EPC Certificates from £50 | Same Day North West Bookings',
    description:
      'Accredited domestic EPCs from £50, commercial EPCs from £144 & landlord EICRs from £110 across all 16 North West service areas. Same-day surveys & 24–48h reports.',
  },
}

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I book an urgent EPC today and get a same day report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. If you have an urgent property sale exchange, auction deadline, or tenancy move-in, you can book an EPC now by calling 07308 658247 or booking online. We offer same day survey slots across our 16 North West service areas, with priority same day report lodgement onto the GOV.UK register.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much is an EPC certificate near me and how do same day bookings work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An EPC certificate starts from £50 for standard flats and terraced houses across Greater Manchester, Merseyside, Lancashire, and Cheshire, scaling fairly for larger homes or extensions. Same day bookings are available subject to surveyor diary slots, and you pay the assessor directly with zero estate agent commission.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I book an EPC for a remortgage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UK mortgage lenders and Buy-to-Let underwriters check the national EPC register during remortgage valuations, and many offer discounted Green Mortgage interest rates for properties in Band A, B, or C. If your existing certificate has expired after 10 years—or if you have upgraded your boiler, windows, or loft insulation—booking an EPC for your remortgage updates your official rating.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer discounts on bulk EPC orders for landlords and letting agents?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We provide custom bulk EPC discounts for portfolio landlords, letting agencies, block managers, and housing associations ordering multiple assessments. Your discount is tailored to the number of units and postcode clustering, complete with free agent key collection and a single consolidated invoice.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is my 5-year landlord EICR electrical safety report due for renewal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under the Electrical Safety Standards in the Private Rented Sector Regulations, private and social rented homes in England must have an EICR inspection renewed at least every 5 years by a BS 7671 18th Edition qualified inspector. Our landlord EICR renewals start from £110 and can be completed alongside a domestic EPC in a single visit.',
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={faqSchema} />
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
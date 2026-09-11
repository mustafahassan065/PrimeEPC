import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Why Choose Prime EPC | Greater Manchester's Trusted Energy Assessors",
  description:
    'Discover why landlords and property managers trust Prime EPC. Accredited assessors, transparent pricing from £50, 24-48h turnaround, and 4.9-star rating across Greater Manchester.',
  keywords: [
    'Why Choose Prime EPC',
    'Best EPC Assessor Greater Manchester',
    'Fast EPC Provider Bolton',
    'Trusted Landlord Compliance Greater Manchester',
    'Top Rated Energy Assessors Greater Manchester'
  ],
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/why-us',
  },
  openGraph: {
    title: "Why Choose Prime EPC | Greater Manchester's Trusted Energy Assessors",
    description:
      'Discover why landlords and property managers trust Prime EPC. Accredited assessors, transparent pricing, and 4.9-star rating across Greater Manchester.',
    url: 'https://www.primeepcdesign.co.uk/why-us',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Choose Prime EPC | Greater Manchester's Trusted Energy Assessors",
    description:
      'Accredited assessors, transparent pricing from £50, and 4.9-star rating across Greater Manchester.',
  },
}

export default function WhyUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

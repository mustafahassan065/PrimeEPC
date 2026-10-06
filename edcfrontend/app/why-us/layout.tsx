import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Choose Prime EPC | Bolton EPC & EICR Specialists',
  description:
    'Discover the Prime EPC advantage: direct assessor booking, rates from £50, fast 24-48h lodgement, and combined EPC and EICR surveys in one visit.',
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
    title: 'Why Choose Prime EPC | Bolton EPC & EICR Specialists',
    description:
      'Discover the Prime EPC advantage: direct assessor booking, rates from £50, fast 24-48h lodgement, and combined EPC and EICR surveys in one visit.',
    url: 'https://www.primeepcdesign.co.uk/why-us',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose Prime EPC | Bolton EPC & EICR Specialists',
    description:
      'Direct assessor booking, rates from £50, fast 24-48h lodgement across Greater Manchester.',
  },
}

export default function WhyUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
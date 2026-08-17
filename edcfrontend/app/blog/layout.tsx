import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EPC & Property Compliance News & Guides Manchester | Prime EPC',
  description:
    'Stay up to date with 2026 MEES regulations, UK landlord energy efficiency requirements, EICR rules, and property performance guidance across Greater Manchester.',
  keywords: [
    'EPC News Manchester',
    'MEES Regulations 2026',
    'Landlord EPC Rules UK',
    'EICR Guidance Greater Manchester',
    'Energy Efficiency Guides Manchester'
  ],
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/blog',
  },
  openGraph: {
    title: 'EPC & Property Compliance News & Guides Manchester | Prime EPC',
    description:
      'Stay up to date with 2026 MEES regulations, UK landlord energy efficiency requirements, and EICR guidance across Greater Manchester.',
    url: 'https://www.primeepcdesign.co.uk/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPC & Property Compliance News & Guides Manchester',
    description:
      'Stay up to date with MEES regulations, EICR landlord rules, and energy performance guidance.',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Accredited EPC Assessors Manchester & Bolton',
  description:
    'Learn about Prime EPC & Design Consultant Ltd. Government-accredited Elmhurst and Stroma certified domestic and commercial energy assessors across Greater Manchester.',
  keywords: [
    'About Prime EPC',
    'Accredited EPC Assessors Manchester',
    'Certified Energy Assessors Bolton',
    'Commercial EPC Specialists Greater Manchester',
    'Property Compliance Experts 2026'
  ],
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/about',
  },
  openGraph: {
    title: 'About Us | Accredited EPC Assessors Manchester & Bolton',
    description:
      'Learn about Prime EPC & Design Consultant Ltd. Government-accredited energy assessors serving landlords & property owners across Greater Manchester.',
    url: 'https://www.primeepcdesign.co.uk/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Accredited EPC Assessors Manchester',
    description:
      'Government-accredited energy assessors serving landlords & property owners across Greater Manchester.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

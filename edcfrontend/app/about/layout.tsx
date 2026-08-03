import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Accredited EPC Assessors Manchester & Bolton',
  description:
    'Learn about Prime EPC & Design Consultant Ltd. Government accredited energy assessors serving landlords & property owners across Greater Manchester.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/about',
  },
  openGraph: {
    title: 'About Us | Accredited EPC Assessors Manchester & Bolton',
    description:
      'Learn about Prime EPC & Design Consultant Ltd. Government accredited energy assessors serving landlords & property owners across Greater Manchester.',
    url: 'https://www.primeepcdesign.co.uk/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Prime EPC | Accredited EPC Assessor in Bolton',
  description:
    'Learn about Prime EPC & Design Consultants. Accredited energy assessors based at 17 Bromwich Street, Bolton, BL2 1JF. Fast, independent compliance.',

  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/about',
  },
  openGraph: {
    title: 'About Prime EPC | Accredited EPC Assessor in Bolton',
    description:
      'Learn about Prime EPC & Design Consultants. Accredited energy assessors based at 17 Bromwich Street, Bolton, BL2 1JF. Fast, independent compliance.',
    url: 'https://www.primeepcdesign.co.uk/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Prime EPC | Accredited EPC Assessor in Bolton',
    description:
      'Accredited energy assessors based at 17 Bromwich Street, Bolton, BL2 1JF. Fast, independent compliance across Greater Manchester.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

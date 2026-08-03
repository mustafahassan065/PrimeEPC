import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EPC & Property Compliance News & Guides Manchester | Prime EPC',
  description:
    'Stay up to date with MEES regulations, EICR landlord rules, and energy performance guidance for Greater Manchester property owners.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/blog',
  },
  openGraph: {
    title: 'EPC & Property Compliance News & Guides Manchester | Prime EPC',
    description:
      'Stay up to date with MEES regulations, EICR landlord rules, and energy performance guidance for Greater Manchester property owners.',
    url: 'https://www.primeepcdesign.co.uk/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

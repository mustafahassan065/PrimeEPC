import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Bulk EPC Discounts | Portfolio & Block Quotes | Prime EPC' },
  description:
    'Multi-property bulk EPC discounts for landlords, letting agents & apartment blocks across Greater Manchester, Liverpool & the North West. Request a trade quote.',
  alternates: { canonical: '/bulk-epc' },
  openGraph: {
    url: '/bulk-epc',
    title: 'Bulk EPC Discounts | Portfolio & Block Quotes | Prime EPC',
    description:
      'Multi-property bulk EPC discounts for landlords, letting agents & apartment blocks across Greater Manchester, Liverpool & the North West. Request a trade quote.',
  },
}

export default function BulkEpcLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

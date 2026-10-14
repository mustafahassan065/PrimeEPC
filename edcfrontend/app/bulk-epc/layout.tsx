import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Bulk EPC Orders | North West Portfolio Rates | Prime EPC' },
  description: 'Volume EPC discounts from £50/unit for portfolio landlords, letting agents & block managers across Greater Manchester, Merseyside, Lancashire & Cheshire.',
  alternates: { canonical: '/bulk-epc' },
  openGraph: {
    url: '/bulk-epc',
    title: 'Bulk EPC Orders | North West Portfolio Rates | Prime EPC',
    description: 'Volume EPC discounts from £50/unit for portfolio landlords, letting agents & block managers across Greater Manchester, Merseyside, Lancashire & Cheshire.',
  },
}

export default function BulkEpcLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

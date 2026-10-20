import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Prime EPC Greater Manchester',
  description: 'Refund, cancellation, and rescheduling terms for EPC, EICR, and property drafting services across Greater Manchester by Prime EPC.',
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/refund' },
  robots: { index: true, follow: true },
}

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

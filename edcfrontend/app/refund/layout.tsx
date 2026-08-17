import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Prime EPC Manchester',
  description: 'Refund, cancellation, and rescheduling terms for EPC, EICR, and property drafting services by Prime EPC.',
  keywords: ['Prime EPC Refund Policy', 'EPC Cancellation Manchester', 'Rescheduling Policy'],
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/refund' },
  robots: { index: true, follow: true },
}

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

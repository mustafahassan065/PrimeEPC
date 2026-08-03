import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | Prime EPC & Design Consultants',
  description: 'Refund and cancellation policy for property assessment bookings with Prime EPC & Design Consultant Ltd.',
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/refund' },
}

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

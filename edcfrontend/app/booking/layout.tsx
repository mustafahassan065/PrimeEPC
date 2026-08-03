import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book EPC & EICR Certificates Manchester | Fast 24h Delivery',
  description:
    'Book your domestic EPC (from £55), commercial EPC (from £144), or EICR report (£110) online. Fast 24-48 hour turnaround across Greater Manchester.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/booking',
  },
  openGraph: {
    title: 'Book EPC & EICR Certificates Manchester | Fast 24h Delivery',
    description:
      'Book your domestic EPC (from £55), commercial EPC (from £144), or EICR report (£110) online. Fast 24-48 hour turnaround across Greater Manchester.',
    url: 'https://www.primeepcdesign.co.uk/booking',
  },
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

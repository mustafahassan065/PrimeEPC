import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book EPC & EICR Certificates Manchester | Fast 24-48h Delivery',
  description:
    'Book accredited domestic EPCs (from £55), commercial EPCs (from £144), and landlord EICR safety reports (£110) online. 24-48h turnaround across Greater Manchester.',
  keywords: [
    'Book EPC Manchester',
    'Order EPC Online Manchester',
    'Domestic EPC Booking',
    'Commercial EPC Booking Manchester',
    'Book Landlord EICR 2026',
    'Fast EPC Certificate Bolton'
  ],
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/booking',
  },
  openGraph: {
    title: 'Book EPC & EICR Certificates Manchester | Fast 24-48h Delivery',
    description:
      'Book accredited domestic EPCs (from £55), commercial EPCs (from £144), and landlord EICR safety reports (£110) online. 24-48h turnaround across Greater Manchester.',
    url: 'https://www.primeepcdesign.co.uk/booking',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book EPC & EICR Certificates Manchester | Prime EPC',
    description:
      'Book domestic EPCs from £55, commercial EPCs from £144, and EICR reports from £110 across Greater Manchester.',
  },
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

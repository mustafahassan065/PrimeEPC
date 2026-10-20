import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Floor Plans & CAD Drafting Greater Manchester | 2D & 3D Plans | Prime EPC',
  description:
    'Professional 2D & 3D floor plans and lease plan drafting for estate agents, landlords, and commercial developers across Greater Manchester, Bolton & Stockport. 24h turnaround.',

  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/floor-plans-drafting',
  },
  openGraph: {
    title: 'Floor Plans & CAD Drafting Greater Manchester | 2D & 3D Plans | Prime EPC',
    description:
      'Professional 2D & 3D floor plans and lease plan drafting for estate agents, landlords, and commercial developers across Greater Manchester, Bolton & Stockport.',
    url: 'https://www.primeepcdesign.co.uk/floor-plans-drafting',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floor Plans & CAD Drafting Greater Manchester | Prime EPC',
    description:
      'Professional 2D & 3D floor plans and lease plan drafting across Greater Manchester. 24h delivery.',
  },
}

export default function FloorPlansLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

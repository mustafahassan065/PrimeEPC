import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Floor Plans & Architectural Drafting Manchester | Prime EPC',
  description:
    'Professional 2D & 3D floor plans for estate agents, landlords, and developers across Manchester & Bolton. Fast 24h turnaround. Boost property listings.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/floor-plans-drafting',
  },
  openGraph: {
    title: 'Floor Plans & Architectural Drafting Manchester | Prime EPC',
    description:
      'Professional 2D & 3D floor plans for estate agents, landlords, and developers across Manchester & Bolton. Fast 24h turnaround. Boost property listings.',
    url: 'https://www.primeepcdesign.co.uk/floor-plans-drafting',
  },
}

export default function FloorPlansLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

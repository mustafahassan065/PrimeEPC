import Link from 'next/link';
import { targetLocations } from '@/lib/locationData';
import AreasWeServeClient from './AreasWeServeClient';

export const metadata = {
  title: 'Areas We Serve | EPC Coverage Across Greater Manchester, Cheshire & Lancashire',
  description:
    'Quidos-accredited EPC assessments across Greater Manchester (10 boroughs), Cheshire East, Cheshire West, Warrington, St Helens, Central Lancashire, Rossendale, and Merseyside. Domestic EPCs from £50, commercial from £144, EICR from £110.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/areas-we-serve',
  },
  openGraph: {
    title: 'Areas We Serve | EPC Coverage Across Greater Manchester & the North West',
    description:
      'Fast accredited domestic EPCs from £50, commercial from £144, and landlord EICRs from £110 across Greater Manchester, Cheshire, and Lancashire.',
    url: 'https://www.primeepcdesign.co.uk/areas-we-serve',
    type: 'website',
  },
};

export default function AreasWeServePage() {
  const areaServedList = targetLocations.map((loc) => ({
    '@type': 'City',
    name: loc.name,
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: 'Prime EPC Regional Coverage Directory',
    description:
      'Accredited domestic and commercial energy assessors serving Greater Manchester, Cheshire, Lancashire, and Merseyside.',
    url: 'https://www.primeepcdesign.co.uk/areas-we-serve',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Prime EPC & Design Consultants',
      telephone: '+447308658247',
      priceRange: '£50 - £144+',
      areaServed: areaServedList,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '17 Bromwich Street',
        addressLocality: 'Bolton',
        addressRegion: 'Greater Manchester',
        postalCode: 'BL2 1JF',
        addressCountry: 'GB',
      },
    },
  };

  return (
    <div className="min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Hero ── */}
      <section className="relative py-20 pb-24 overflow-hidden bg-gradient-to-r from-[#016837] via-[#01572E] to-[#014d28] text-white">
        <div className="absolute inset-0 overflow-hidden z-[1] opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#80C531] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#80C531] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/70 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white font-semibold">Areas We Serve</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-4">
            📍 50-MILE NORTH WEST COVERAGE RADIUS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Areas We Serve
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Fast, Quidos-accredited Energy Performance Certificates and landlord electrical reports across Greater Manchester, Cheshire, Warrington, Lancashire, and Merseyside. Domestic EPCs from £50 with same-day bookings available.
          </p>
        </div>
      </section>

      {/* ── Interactive Client View: Search, Filters, Borough Cards & A-Z Index ── */}
      <AreasWeServeClient />
    </div>
  );
}
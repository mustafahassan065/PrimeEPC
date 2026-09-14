import Link from 'next/link';
import { targetLocations } from '@/lib/locationData';

export const metadata = {
  title: 'Areas We Serve | EPC Coverage Across Greater Manchester & the North West',
  description:
    'Prime EPC covers a 50-mile radius across the North West — Bolton, Manchester, Salford, Oldham, Blackburn, Stockport, Rochdale, Warrington and Liverpool. Fixed £50 domestic EPCs with 24–48h turnaround.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/areas-we-serve',
  },
};

export default function AreasWeServePage() {
  return (
    <div className="min-h-screen font-sans">

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#80C531]/70 via-[#016837]/80 to-[#016837]/90"></div>
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#80C531]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#016837]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
            📍 50-MILE NORTH WEST COVERAGE
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Areas We Serve
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Fast, Quidos-accredited EPC certificates across Greater Manchester, Lancashire, Cheshire and Merseyside.
            Select your area below to see local pricing, postcodes covered and booking options.
          </p>
        </div>
      </section>

      {/* ── Location Cards Grid ── */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {targetLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="bg-white rounded-3xl p-7 shadow-lg border border-[#80C531]/20 hover:border-[#016837] hover:shadow-xl transition-all duration-300 group block"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#282828] group-hover:text-[#016837] transition-colors">
                    EPC in {location.name}
                  </h2>
                </div>

                {/* Postcodes */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-[#016837] uppercase tracking-wider mb-2">Postcodes Covered</p>
                  <div className="flex flex-wrap gap-2">
                    {location.postcodes.split(',').map((pc) => (
                      <span key={pc} className="bg-[#80C531]/10 text-[#016837] text-xs font-bold px-3 py-1 rounded-full">
                        {pc.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#282828]/80 text-sm leading-relaxed mb-6">{location.description}</p>

                {/* Footer link */}
                <div className="flex items-center justify-between pt-4 border-t border-[#80C531]/15">
                  <span className="text-sm font-bold text-[#016837]">Domestic EPC from £50</span>
                  <span className="flex items-center gap-1 text-sm font-bold text-[#016837] group-hover:gap-2 transition-all">
                    View Area
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Don't See Your Area Listed?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We cover a 50-mile radius across the North West. Contact us — chances are we can still reach you with the same £50 fixed-fee EPC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-3 px-8 rounded-xl shadow-lg transition-all">
              Book Your EPC →
            </Link>
            <a href="tel:+447308658247" className="bg-white text-[#016837] font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-[#F8F8F8] transition-all">
              Call 07308 658247
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
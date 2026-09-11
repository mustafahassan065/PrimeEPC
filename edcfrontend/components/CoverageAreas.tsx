import Link from 'next/link';
import { targetLocations } from '@/lib/locationData';

export default function CoverageAreas() {
  return (
    <section id="coverage" className="py-16 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Areas We Cover Across a 50-Mile Radius
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Book directly with a local Quidos-accredited assessor for a transparent £50 fixed fee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetLocations.map((loc) => (
            <Link className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200" href={`/locations/${loc.slug}`} key={loc.slug}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors">
                  EPC {loc.name}
                </h3>
                <span className="text-sm font-bold text-emerald-600">£50</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{loc.description}</p>
              <div className="text-xs font-semibold text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded font-mono">
                Postcodes: {loc.postcodes}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

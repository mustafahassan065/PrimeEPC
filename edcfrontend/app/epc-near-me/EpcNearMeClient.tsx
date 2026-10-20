"use client";

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { targetLocations, findLocationByQuery, findNearestLocation, LocationData } from '@/lib/locationData';
import { BUSINESS } from '@/lib/business';

export default function EpcNearMeClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [query, setQuery] = useState('');
  const [detectedCity, setDetectedCity] = useState<LocationData | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter locations if search query entered
  const matchedCity = query ? findLocationByQuery(query) : null;
  const filteredLocations = query
    ? targetLocations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query.toLowerCase()) ||
          loc.postcodes.toLowerCase().includes(query.toLowerCase()) ||
          loc.neighbourhoods.toLowerCase().includes(query.toLowerCase())
      )
    : targetLocations;

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = findNearestLocation(latitude, longitude);
        setDetectedCity(nearest);
        setGeoLoading(false);
      },
      () => {
        setGeoError('Could not access your location. Please enter your postcode above.');
        setGeoLoading(false);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="min-h-screen font-sans">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#016837] via-[#01572E] to-[#014d28] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#80C531] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#80C531] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'EPC Near Me', path: '/epc-near-me' }]} />

          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-5 shadow-sm">
            📍 50-Mile North West Assessor Network — Rates From £50
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            EPC Near Me — Accredited Local Assessors &amp; Same Day Bookings from £50
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
            Fast, Quidos-accredited Energy Performance Certificates across Greater Manchester, Lancashire, Merseyside, and Cheshire. Same-day appointments, 24–48 hour register lodgement, and zero middleman fees.
          </p>

          {/* Interactive Search & GPS Bar */}
          <div className="bg-white rounded-2xl p-3 shadow-2xl max-w-2xl mx-auto text-gray-900 mb-4 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-3 w-full">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your town or postcode (e.g. Bolton, M1, BL2, Salford)..."
                  className="w-full py-3 text-gray-800 placeholder-gray-400 focus:outline-none text-sm md:text-base"
                />
              </div>

              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={geoLoading}
                className="w-full sm:w-auto bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-3 px-5 rounded-xl transition-all shadow flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                {geoLoading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-950"></span>
                ) : (
                  <span>📍 Auto-Detect</span>
                )}
              </button>
            </div>
          </div>

          {/* Error / Match Notice */}
          {geoError && (
            <p className="text-xs text-amber-200 mt-2">{geoError}</p>
          )}

          {detectedCity && (
            <div className="bg-[#80C531]/20 border border-[#80C531] rounded-xl p-4 max-w-2xl mx-auto mt-4 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
              <div>
                <p className="text-xs text-[#80C531] font-bold uppercase tracking-wider">🎯 Nearest Assessor Hub Found</p>
                <h4 className="text-lg font-bold text-white">EPC {detectedCity.name} — From £50</h4>
                <p className="text-xs text-white/80">Covers {detectedCity.postcodes}</p>
              </div>
              <Link
                href={`/locations/${detectedCity.slug}`}
                className="bg-white text-[#016837] font-bold py-2 px-5 rounded-lg text-sm shadow hover:bg-gray-100 transition-all whitespace-nowrap"
              >
                View {detectedCity.name} Page →
              </Link>
            </div>
          )}

          {matchedCity && !detectedCity && (
            <div className="bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl p-4 max-w-2xl mx-auto mt-4 text-left flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-[#80C531] font-bold uppercase tracking-wider">Direct Location Match</p>
                <h4 className="text-lg font-bold text-white">EPC {matchedCity.name}</h4>
                <p className="text-xs text-white/80">{matchedCity.postcodes}</p>
              </div>
              <Link
                href={`/locations/${matchedCity.slug}`}
                className="bg-[#80C531] text-gray-950 font-bold py-2 px-5 rounded-lg text-sm shadow hover:bg-[#72b329] transition-all whitespace-nowrap"
              >
                Go to {matchedCity.name} →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Key Trust Benefits ── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-[#016837]">From £50</p>
              <p className="text-xs text-gray-500 font-medium">Domestic EPC Rates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#016837]">24–48h</p>
              <p className="text-xs text-gray-500 font-medium">Register Lodgement</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#016837]">50 Miles</p>
              <p className="text-xs text-gray-500 font-medium">Full North West Radius</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#016837]">4.6 ★</p>
              <p className="text-xs text-gray-500 font-medium">18 Trustpilot Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AEO Direct Answer Section ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#f8fffe] rounded-2xl p-6 md:p-8 border border-[#80C531]/30 shadow-sm text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[#016837] mb-4">
              How do I book a local EPC assessor near me today?
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Enter your postcode or select your town to book an accredited local energy assessor near you within our 50-mile North West coverage radius. Domestic EPC certificates start from £50 with same day survey slots available for urgent property sales, rental listings, and remortgage valuations—with zero estate agent mark-ups.
            </p>
          </div>
        </div>
      </section>

      {/* ── Coverage Directory Grid ── */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#80C531]/10 text-[#016837] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              LOCAL REGIONAL COVERAGE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Select Your Local Area Below
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We serve all postcodes within a 50-mile radius of our Bolton base with direct assessor booking and official register lodgement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-[#016837] hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#016837] transition-colors">
                      EPC {loc.name}
                    </h3>
                    <span className="bg-[#80C531]/10 text-[#016837] text-xs font-bold px-2.5 py-1 rounded-full">
                      From £50
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Postcodes: {loc.postcodes}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {loc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-[#016837]">
                  <span>View Local Pricing &amp; Details</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-600 mb-4">No specific town found for &quot;{query}&quot;, but we cover all areas within 50 miles!</p>
              <Link
                href="/booking"
                className="bg-[#016837] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#01572E] transition-all inline-block"
              >
                Book Your Assessment Online →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Why Book Direct Locally ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Book Directly With a Local Energy Assessor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[#F8F8F8] border border-gray-200">
              <div className="text-3xl mb-3">🚫</div>
              <h3 className="font-bold text-gray-900 mb-2">No Estate Agent Mark-Ups</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                National agencies and estate agents add £30–£60 commission to sub-contractors. We charge direct transparent fees starting from £50.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F8F8] border border-gray-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Fast 24–48h Digital Turnaround</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Need your EPC urgently to exchange or let? We lodge certificates on the UK register within 24 to 48 hours of on-site survey.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F8F8] border border-gray-200">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold text-gray-900 mb-2">Quidos Accredited &amp; Insured</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All domestic and commercial surveys are conducted by fully accredited, DBS-checked surveyors complying with 2026 MEES regulations.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/booking"
              className="bg-[#016837] hover:bg-[#01572E] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all inline-block"
            >
              Check Price &amp; Book Today →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions — EPC Near Me
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-bold text-gray-900 pr-4">{faq.q}</h3>
                  <span className="text-[#016837] font-bold text-xl">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

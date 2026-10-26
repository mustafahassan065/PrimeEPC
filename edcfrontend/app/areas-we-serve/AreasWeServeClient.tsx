'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { targetLocations, findLocationByQuery, LocationData } from '@/lib/locationData';

// Generate a complete alphabetical list of all sub-areas mapped to their parent location slug
interface DirectoryItem {
  area: string;
  groupName: string;
  parentName: string;
  parentSlug: string;
  county: string;
}

export default function AreasWeServeClient() {
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<'all' | 'greater-manchester' | 'surrounding'>('all');
  const [activeLetter, setActiveLetter] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (slug: string) => {
    setExpandedCards((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  // Build the complete flat directory of every single town / suburb
  const directoryItems: DirectoryItem[] = useMemo(() => {
    const list: DirectoryItem[] = [];
    const seen = new Set<string>();

    targetLocations.forEach((loc) => {
      if (loc.subAreas) {
        loc.subAreas.forEach((group) => {
          group.areas.forEach((area) => {
            const key = `${area.toLowerCase()}-${loc.slug}`;
            if (!seen.has(key)) {
              seen.add(key);
              list.push({
                area,
                groupName: group.name,
                parentName: loc.name,
                parentSlug: loc.slug,
                county: loc.county,
              });
            }
          });
        });
      }
    });

    return list.sort((a, b) => a.area.localeCompare(b.area));
  }, []);

  // Filter directory by search query or active letter
  const filteredDirectory = useMemo(() => {
    return directoryItems.filter((item) => {
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        return (
          item.area.toLowerCase().includes(q) ||
          item.parentName.toLowerCase().includes(q) ||
          item.county.toLowerCase().includes(q)
        );
      }
      if (activeLetter !== 'all') {
        return item.area.toUpperCase().startsWith(activeLetter);
      }
      return true;
    });
  }, [directoryItems, query, activeLetter]);

  // Distinct alphabet letters present in the directory
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    directoryItems.forEach((item) => {
      const firstChar = item.area.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort();
  }, [directoryItems]);

  // Direct match lookup for the search box
  const directMatch = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return null;
    return findLocationByQuery(query);
  }, [query]);

  // Filter location cards based on query and region filter
  const gmLocations = useMemo(() => {
    return targetLocations.filter((loc) => {
      if (loc.region !== 'greater-manchester') return false;
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.postcodes.toLowerCase().includes(q) ||
        loc.neighbourhoods.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const surroundingLocations = useMemo(() => {
    return targetLocations.filter((loc) => {
      if (loc.region !== 'surrounding') return false;
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.postcodes.toLowerCase().includes(q) ||
        loc.neighbourhoods.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div>
      {/* ── Live Search & Filter Bar ── */}
      <section className="relative -mt-8 z-20 container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 border border-[#80C531]/30">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your town, suburb, or postcode (e.g. Didsbury, Prestwich, Horwich, Wilmslow, Altrincham, BL1, M14, SK9, WA1)..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 pl-12 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#016837] focus:border-transparent focus:bg-white shadow-inner"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 px-2.5 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Direct Match Indicator */}
          {directMatch && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-[#016837]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs font-bold text-[#016837] uppercase tracking-wide">
                    Coverage Confirmed: {directMatch.name} ({directMatch.county})
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    We assess properties across {directMatch.postcodes} — domestic EPCs from £50.
                  </p>
                </div>
              </div>
              <Link
                href={`/locations/${directMatch.slug}`}
                className="bg-[#016837] hover:bg-[#01572E] text-white text-xs font-bold py-2 px-4 rounded-lg shadow whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <span>View {directMatch.name} Page</span>
                <span>→</span>
              </Link>
            </div>
          )}

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveRegion('all')}
              className={`text-xs md:text-sm font-bold px-4 py-2 rounded-full transition-all ${
                activeRegion === 'all'
                  ? 'bg-[#016837] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All 18 Coverage Hubs
            </button>
            <button
              onClick={() => setActiveRegion('greater-manchester')}
              className={`text-xs md:text-sm font-bold px-4 py-2 rounded-full transition-all ${
                activeRegion === 'greater-manchester'
                  ? 'bg-[#016837] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Greater Manchester (10 Boroughs)
            </button>
            <button
              onClick={() => setActiveRegion('surrounding')}
              className={`text-xs md:text-sm font-bold px-4 py-2 rounded-full transition-all ${
                activeRegion === 'surrounding'
                  ? 'bg-[#016837] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cheshire, Lancashire &amp; Merseyside (8 Areas)
            </button>
          </div>
        </div>
      </section>

      {/* ── Section 1: Greater Manchester Coverage ── */}
      {(activeRegion === 'all' || activeRegion === 'greater-manchester') && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#F8F8F8]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#016837] uppercase tracking-wider bg-[#80C531]/10 px-4 py-1.5 rounded-full inline-block mb-3">
                🏛️ PRIMARY METROPOLITAN COVERAGE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                EPC Services Across Greater Manchester
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-3">
                Complete coverage of all 10 Metropolitan Boroughs. Every town, ward, and postal district surveyed with fast 24–48h digital lodgement.
              </p>
            </div>

            {gmLocations.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No Greater Manchester locations match your search.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                {gmLocations.map((loc) => {
                  const isExpanded = expandedCards[loc.slug] ?? false;
                  const totalSubAreas = loc.subAreas?.reduce((sum, g) => sum + g.areas.length, 0) || 0;

                  return (
                    <article
                      key={loc.slug}
                      className="bg-white rounded-3xl p-7 shadow-lg border border-[#80C531]/20 hover:border-[#016837] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <span className="text-[11px] font-bold text-[#016837] uppercase tracking-wider bg-[#016837]/10 px-2.5 py-0.5 rounded-full">
                              {loc.county}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                              EPC {loc.name}
                            </h3>
                          </div>
                          <span className="bg-[#80C531]/15 text-[#016837] font-bold text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
                            From £50
                          </span>
                        </div>

                        {/* Postcodes */}
                        <div className="mb-4">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            Postcodes Covered
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {loc.postcodes.split(',').map((pc) => (
                              <span
                                key={pc}
                                className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-md"
                              >
                                {pc.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                          {loc.description}
                        </p>

                        {/* Sub-areas & Neighbourhoods */}
                        {loc.subAreas && loc.subAreas.length > 0 && (
                          <div className="mb-5 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                <span>📍</span>
                                <span>Key Areas Covered ({totalSubAreas} Towns &amp; Suburbs):</span>
                              </p>
                              {totalSubAreas > 8 && (
                                <button
                                  type="button"
                                  onClick={() => toggleExpand(loc.slug)}
                                  className="text-xs font-bold text-[#016837] hover:underline"
                                >
                                  {isExpanded ? 'Show Less' : `+${totalSubAreas - 8} More`}
                                </button>
                              )}
                            </div>

                            <div className="space-y-2.5">
                              {loc.subAreas.map((group, gIdx) => {
                                const displayedAreas = isExpanded
                                  ? group.areas
                                  : group.areas.slice(0, 5);

                                return (
                                  <div key={gIdx} className="text-xs">
                                    <span className="font-bold text-gray-800 text-[11px] block mb-1">
                                      {group.name}:
                                    </span>
                                    <div className="flex flex-wrap gap-1">
                                      {displayedAreas.map((area, aIdx) => (
                                        <span
                                          key={aIdx}
                                          className="bg-[#F8F8F8] text-gray-700 text-[11px] font-medium px-2 py-0.5 rounded border border-gray-200"
                                        >
                                          {area}
                                        </span>
                                      ))}
                                      {!isExpanded && group.areas.length > 5 && (
                                        <span className="text-gray-400 text-[11px] self-center">
                                          +{group.areas.length - 5} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-[#80C531]/20 flex items-center justify-between gap-3 mt-4">
                        <Link
                          href={`/locations/${loc.slug}`}
                          className="text-xs font-bold text-[#016837] hover:text-[#01572E] inline-flex items-center gap-1 group"
                        >
                          <span>Explore {loc.name} Coverage</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                          href="/booking"
                          className="bg-[#016837] hover:bg-[#01572E] text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow transition-colors"
                        >
                          Book £50
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Section 2: Areas Outside Greater Manchester ── */}
      {(activeRegion === 'all' || activeRegion === 'surrounding') && (
        <section className="py-16 md:py-20 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#016837] uppercase tracking-wider bg-[#80C531]/10 px-4 py-1.5 rounded-full inline-block mb-3">
                🌲 50-MILE RADIUS REGIONAL COVERAGE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Cheshire, Warrington, Lancashire &amp; Merseyside
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-3">
                Full Quidos-accredited assessor coverage across Cheshire East, Cheshire West, Warrington, St Helens, Central Lancashire, Rossendale, Blackburn, and Merseyside.
              </p>
            </div>

            {surroundingLocations.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No surrounding regional locations match your search.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                {surroundingLocations.map((loc) => {
                  const isExpanded = expandedCards[loc.slug] ?? false;
                  const totalSubAreas = loc.subAreas?.reduce((sum, g) => sum + g.areas.length, 0) || 0;

                  return (
                    <article
                      key={loc.slug}
                      className="bg-[#FBFBFB] rounded-3xl p-7 shadow-lg border border-gray-200 hover:border-[#016837] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider bg-gray-200 px-2.5 py-0.5 rounded-full">
                              {loc.county}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                              EPC {loc.name}
                            </h3>
                          </div>
                          <span className="bg-[#80C531]/15 text-[#016837] font-bold text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
                            From £50
                          </span>
                        </div>

                        {/* Postcodes */}
                        <div className="mb-4">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            Postcodes Covered
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {loc.postcodes.split(',').map((pc) => (
                              <span
                                key={pc}
                                className="bg-white text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-gray-200"
                              >
                                {pc.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                          {loc.description}
                        </p>

                        {/* Sub-areas & Neighbourhoods */}
                        {loc.subAreas && loc.subAreas.length > 0 && (
                          <div className="mb-5 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                <span>📍</span>
                                <span>Districts &amp; Towns ({totalSubAreas}):</span>
                              </p>
                              {totalSubAreas > 8 && (
                                <button
                                  type="button"
                                  onClick={() => toggleExpand(loc.slug)}
                                  className="text-xs font-bold text-[#016837] hover:underline"
                                >
                                  {isExpanded ? 'Show Less' : `+${totalSubAreas - 8} More`}
                                </button>
                              )}
                            </div>

                            <div className="space-y-2.5">
                              {loc.subAreas.map((group, gIdx) => {
                                const displayedAreas = isExpanded
                                  ? group.areas
                                  : group.areas.slice(0, 5);

                                return (
                                  <div key={gIdx} className="text-xs">
                                    <span className="font-bold text-gray-800 text-[11px] block mb-1">
                                      {group.name}:
                                    </span>
                                    <div className="flex flex-wrap gap-1">
                                      {displayedAreas.map((area, aIdx) => (
                                        <span
                                          key={aIdx}
                                          className="bg-white text-gray-700 text-[11px] font-medium px-2 py-0.5 rounded border border-gray-200"
                                        >
                                          {area}
                                        </span>
                                      ))}
                                      {!isExpanded && group.areas.length > 5 && (
                                        <span className="text-gray-400 text-[11px] self-center">
                                          +{group.areas.length - 5} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3 mt-4">
                        <Link
                          href={`/locations/${loc.slug}`}
                          className="text-xs font-bold text-[#016837] hover:text-[#01572E] inline-flex items-center gap-1 group"
                        >
                          <span>Explore {loc.name} Coverage</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                          href="/booking"
                          className="bg-[#016837] hover:bg-[#01572E] text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow transition-colors"
                        >
                          Book £50
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Section 3: Comprehensive A–Z Town & District Directory ── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#F8F8F8] to-white border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#016837] uppercase tracking-wider bg-[#80C531]/10 px-4 py-1.5 rounded-full inline-block mb-3">
              📖 COMPLETE COVERAGE INDEX
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              A–Z Directory of All Towns &amp; Neighbourhoods
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-2">
              Browse over 200 surveyed locations across Greater Manchester, Cheshire, Lancashire, and Merseyside. Click any area to view dedicated local booking options.
            </p>
          </div>

          {/* Letter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveLetter('all')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                activeLetter === 'all'
                  ? 'bg-[#016837] text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {availableLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`text-xs font-bold w-8 h-8 rounded-lg transition-all ${
                  activeLetter === letter
                    ? 'bg-[#016837] text-white shadow'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Directory Grid */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200">
            {filteredDirectory.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No locations match your filter.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredDirectory.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/locations/${item.parentSlug}`}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#80C531]/15 hover:border-[#80C531] border border-gray-100 transition-all group block text-left"
                  >
                    <p className="font-bold text-gray-900 text-xs group-hover:text-[#016837] truncate">
                      {item.area}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">
                      {item.parentName}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Bottom Booking CTA ── */}
      <section className="py-16 bg-gradient-to-br from-[#016837] via-[#01572E] to-[#014d28] text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Need an Urgent EPC or Same-Day Survey?
          </h2>
          <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed">
            Domestic EPCs from £50, commercial SBEM from £144, and landlord EICRs from £110 across our entire 50-mile North West radius. Direct Quidos assessor booking with 24–48h lodgement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
            >
              Book Your EPC Online →
            </Link>
            <a
              href="tel:+447308658247"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl border border-white/30 transition-all"
            >
              Call 07308 658247
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

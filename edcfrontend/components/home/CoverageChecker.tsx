"use client"

import Link from 'next/link'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { targetLocations, LocationData } from '@/lib/locationData'

/* ───────────────────────── helpers ───────────────────────── */

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

// "BL1, BL2, M1" and ranges like "L1 - L38" -> ['BL1','BL2','M1'] / ['L1'...'L38']
const expandPostcodes = (raw: string): string[] => {
  const out: string[] = []
  raw.split(/[,;]/).forEach((part) => {
    const t = part.trim().toUpperCase()
    if (!t) return
    const range = t.match(/^([A-Z]{1,2})(\d+)\s*-\s*(?:[A-Z]{1,2})?(\d+)$/)
    if (range) {
      const [, letters, from, to] = range
      for (let n = parseInt(from, 10); n <= parseInt(to, 10); n++) out.push(`${letters}${n}`)
    } else {
      out.push(t.replace(/\s+/g, ''))
    }
  })
  return out
}

// Every locality we cover for a borough (sub-area lists + neighbourhoods), no duplicates
const localitiesOf = (loc: LocationData): string[] => {
  const seen = new Set<string>()
  const list: string[] = []
  const add = (n: string) => {
    const t = n.trim()
    const k = norm(t)
    if (t && !seen.has(k)) {
      seen.add(k)
      list.push(t)
    }
  }
  ;(loc.subAreas || []).forEach((g) => g.areas.forEach(add))
  loc.neighbourhoods.split(',').forEach(add)
  return list
}

// Pre-compute once
const index = targetLocations.map((loc) => ({
  loc,
  codes: expandPostcodes(loc.postcodes),
  localities: localitiesOf(loc),
}))


// "BL1 1AA" / "bl11aa" -> { code:'BL1', exactOnly:true } ; "BL1" / "BL" -> prefix mode
const parsePostcode = (raw: string) => {
  const t = raw.trim().toUpperCase()
  if (t.includes(' ')) return { code: t.split(/\s+/)[0], exactOnly: true }
  const full = t.match(/^([A-Z]{1,2}\d[A-Z\d]?)\d[A-Z]{2}$/)
  if (full) return { code: full[1], exactOnly: true }
  return { code: t, exactOnly: false }
}

const bookingHref = (area: string, postcode: string) => {
  const params = new URLSearchParams({ area })
  if (postcode) params.set('postcode', postcode)
  return `/booking?${params.toString()}`
}

type Group = {
  loc: LocationData
  exact: boolean
  localities: string[] // shown as clickable chips
  note: string
}

/* ───────────────────────── component ───────────────────────── */

export default function CoverageChecker({
  title = 'Do We Cover Your Area?',
  subtitle = 'Enter your postcode or town to check coverage, then click your area to book.',
  onQueryChange,
}: {
  title?: string
  subtitle?: string
  onQueryChange?: (q: string) => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const q = query.trim()
  const postcodeMode = /^[A-Za-z]{1,2}\d/.test(q)
  const typedPostcode = postcodeMode ? q.toUpperCase() : ''

  const groups: Group[] = useMemo(() => {
    if (q.length < 2) return []

    /* ── Postcode search (first 2-4 characters or full postcode) ── */
    if (postcodeMode) {
      const { code, exactOnly } = parsePostcode(q)
      const found: Group[] = []
      index.forEach(({ loc, codes, localities }) => {
        const exact = codes.includes(code)
        const partial = !exactOnly && !exact && codes.some((c) => c.startsWith(code))
        if (exact || partial) {
          found.push({
            loc,
            exact,
            localities,
            note: exact ? `✓ ${code} is covered` : `Postcodes starting ${code}`,
          })
        }
      })
      return found.sort((a, b) => Number(b.exact) - Number(a.exact))
    }

    /* ── Letters-only postcode area (e.g. "BL", "SK") ── */
    const letters = q.toUpperCase().replace(/\s+/g, '')
    if (/^[A-Z]{1,2}$/.test(letters)) {
      const byArea: Group[] = []
      index.forEach(({ loc, codes, localities }) => {
        if (codes.some((c) => c.startsWith(letters))) {
          byArea.push({ loc, exact: false, localities, note: `Postcodes starting ${letters}` })
        }
      })
      // fall through to name search too, so "Wi" still finds Wigan / Wilmslow
      if (byArea.length > 0 && letters.length === 2 && q.length === 2) {
        const nameHits = nameSearch(q)
        const seen = new Set(byArea.map((g) => g.loc.slug))
        return [...byArea, ...nameHits.filter((g) => !seen.has(g.loc.slug))]
      }
    }

    /* ── Town / area / borough name search ── */
    return nameSearch(q)
  }, [q, postcodeMode])

  const first = groups[0]
  const goFirst = () => {
    if (first) router.push(bookingHref(first.loc.name, typedPostcode))
    else setOpen(true)
  }

  const showPanel = open && q.length >= 2
  const totalAreas = groups.reduce((n, g) => n + g.localities.length, 0)

  return (
    <div ref={boxRef} className="relative z-30 max-w-4xl mx-auto text-left">
      <div className="bg-white rounded-2xl shadow-xl overflow-visible md:flex items-stretch">
        {/* Left green panel */}
        <div className="bg-[#016837] text-white md:w-2/5 p-5 md:p-6 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex items-center gap-4">
          <svg className="w-10 h-10 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold leading-tight">{title}</h2>
            <p className="text-sm text-white/85 mt-1">{subtitle}</p>
          </div>
        </div>

        {/* Right search panel */}
        <div className="flex-1 p-5 md:p-6 bg-[#F4F8F4] rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
          <label htmlFor="coverage-input" className="block text-sm font-bold text-gray-800 mb-2">
            Enter your postcode or town to check our coverage
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 focus-within:border-[#016837] focus-within:ring-2 focus-within:ring-[#80C531]/40">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <input
                id="coverage-input"
                type="text"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  onQueryChange?.(e.target.value)
                  setOpen(true)
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    goFirst()
                  }
                }}
                placeholder="e.g. BL1 1AA, BL1 or Bolton"
                className="w-full py-3 text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    onQueryChange?.('')
                    setOpen(false)
                  }}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1"
                  aria-label="Clear"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={goFirst}
              className="bg-[#016837] hover:bg-[#01572E] text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all whitespace-nowrap"
            >
              Check My Area →
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            📞 Not sure? Contact us on{' '}
            <a href="tel:+447308658247" className="font-bold text-[#016837]">07308 658247</a>.
          </p>
        </div>
      </div>

      {/* Results */}
      {showPanel && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          {groups.length > 0 ? (
            <>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>
                  ✅ We cover {groups.length === 1 ? 'this area' : 'these areas'} — {totalAreas} locations
                </span>
                <span>Click your area to book</span>
              </div>
              <div className="max-h-[26rem] overflow-y-auto divide-y divide-gray-100">
                {groups.map((g) => (
                  <div key={g.loc.slug} className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="min-w-0">
                        <p className="font-extrabold text-gray-900 text-base">📍 {g.loc.name}</p>
                        <p className="text-xs text-gray-500">
                          {g.loc.county} · {g.note}
                        </p>
                      </div>
                      <Link
                        href={bookingHref(g.loc.name, typedPostcode)}
                        onClick={() => setOpen(false)}
                        className="bg-[#016837] hover:bg-[#01572E] text-white text-xs font-bold py-2 px-4 rounded-lg whitespace-nowrap"
                      >
                        Book in {g.loc.name} →
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.localities.map((area) => (
                        <Link
                          key={area}
                          href={bookingHref(area, typedPostcode)}
                          onClick={() => setOpen(false)}
                          className="bg-[#80C531]/10 hover:bg-[#016837] text-[#016837] hover:text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                        >
                          {area}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-5 text-sm text-gray-700">
              <p className="font-bold text-gray-900 mb-1">We couldn&apos;t find &ldquo;{q}&rdquo; in our listed areas.</p>
              <p>
                We cover a 50-mile radius across the North West, so we may still reach you. Call{' '}
                <a href="tel:+447308658247" className="font-bold text-[#016837]">07308 658247</a> or{' '}
                <Link href="/booking" className="font-bold text-[#016837] underline">go to booking</Link>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* Name search: a borough match lists ALL its localities; otherwise only matching localities */
function nameSearch(raw: string): Group[] {
  const q = norm(raw)
  if (q.length < 2) return []
  const groups: Group[] = []
  index.forEach(({ loc, localities }) => {
    const boroughHit = norm(loc.name).includes(q) || norm(loc.slug).includes(q)
    if (boroughHit) {
      groups.push({ loc, exact: true, localities, note: 'All areas covered' })
      return
    }
    const hits = localities.filter((a) => norm(a).includes(q))
    const groupHit = (loc.subAreas || []).filter((g) => norm(g.name).includes(q))
    const extra = groupHit.flatMap((g) => g.areas)
    const merged = Array.from(new Set([...hits, ...extra]))
    if (merged.length > 0) {
      groups.push({ loc, exact: false, localities: merged, note: 'Matching areas' })
    }
  })
  // boroughs that match by name first
  return groups.sort((a, b) => Number(b.exact) - Number(a.exact))
}

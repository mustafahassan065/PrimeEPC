import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'Commercial EPC North West from £144 | Level 3 & 4 SBEM' },
  description: 'Non-domestic commercial EPCs from £144 for shops, offices & warehouses across Manchester, Bolton, Liverpool & Warrington. Lease renewals & MEES compliance.',
  alternates: { canonical: '/commercial-epc' },
  openGraph: {
    url: '/commercial-epc',
    title: 'Commercial EPC North West from £144 | Level 3 & 4 SBEM',
    description: 'Non-domestic commercial EPCs from £144 for shops, offices & warehouses across Manchester, Bolton, Liverpool & Warrington. Lease renewals & MEES compliance.',
  },
}

const faqs = [
  { q: 'When is a commercial EPC required for a lease renewal or sale?', a: 'A Non-Domestic Commercial EPC is legally required whenever a commercial building in England or Wales is constructed, sold, assigned, or undergoes a lease renewal. Under Commercial MEES regulations, premises must hold a minimum Band E rating to be let legally unless exempt, with local authority penalties reaching up to £150,000.' },
  { q: 'How is a commercial EPC priced?', a: 'Commercial EPCs are priced by the complexity, square metres, and heating zones of the building. Direct surveyor rates start from £144 for standard Level 3 properties such as retail units and offices.' },
  { q: 'What is the difference between Level 3 and Level 4 SBEM?', a: 'Level 3 covers simple existing buildings with basic heating systems, such as shops and small offices. Level 4 covers larger commercial buildings with central plant, variable air volume (VAV), multi-zone ventilation, or modern chillers.' },
  { q: 'What is the current Commercial MEES minimum rating?', a: 'Under Commercial MEES rules, all commercial properties let in England and Wales must meet at least EPC Band E. It is unlawful to grant a new lease or continue an existing tenancy below Band E without a registered exemption.' },
]

export default function CommercialEpcPage() {
  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Commercial EPC"
        path="/commercial-epc"
        serviceType="Non-domestic Energy Performance Certificate"
        price={BUSINESS.prices.commercialEpcFrom}
        areas={['Bolton','Manchester','Salford','Stockport','Oldham','Rochdale']}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Commercial EPC', path: '/commercial-epc' }]} />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Commercial Energy Performance Assessments (Non-Domestic EPC)
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            Accredited Level 3 and Level 4 non-domestic SBEM energy surveys across Greater Manchester, Merseyside, Lancashire, and Cheshire. Rates starting from <strong className="text-[#80C531]">£144</strong> with MEES compliance guidance included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold py-4 px-8 rounded-xl text-center transition-all">Get a Commercial Quote — From £144</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-8 rounded-xl text-center transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[{ val: 'From £144', label: 'Starting Rate' },{ val: '48-72h', label: 'Turnaround' },{ val: 'Level 3 & 4', label: 'SBEM Certified' },{ val: 'MEES Band E', label: 'Compliance Sign-Off' }].map((s,i) => (
              <div key={i}><p className="text-2xl font-bold text-[#016837]">{s.val}</p><p className="text-xs text-gray-500">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Content & AEO Direct Answers */}
      <section className="py-16 container mx-auto px-4 max-w-3xl space-y-10 text-[#282828]">
        {/* AEO Answer 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#016837]">When is a commercial EPC required for a lease renewal or sale?</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            A Non-Domestic Commercial EPC is legally required whenever a commercial building in England or Wales is constructed, sold, assigned, or undergoes a lease renewal. Under Commercial MEES regulations, premises must hold a minimum Band E rating to be let legally unless exempt, with local authority penalties reaching up to £150,000.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Non-Domestic SBEM Calculations &amp; Property Types</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Operating under government-approved <strong>Level 3 and Level 4 SBEM calculations</strong>, our accredited non-domestic assessors carry out surveys for <strong>commercial lease renewal EPC</strong> requirements, <strong>SIPP and SSAS pension property EPC</strong> valuations, and transactional conveyancing. We assess:
          </p>
          <ul className="space-y-2 text-gray-600">
            {[
              'Retail shop, restaurant, takeaway, office, medical practice, and industrial warehouse EPCs',
              'Commercial units undergoing lease assignment, sub-letting, or tenant fit-out alterations',
              'Industrial parks and commercial business hubs across the North West',
              'Mixed-use commercial and residential properties requiring separated certifications',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2"><span className="text-[#016837] font-bold mt-0.5">•</span><span>{item}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Commercial Hubs &amp; Industrial Estates We Serve</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We provide fast call-outs to major commercial districts, regularly <strong>serving Trafford Park, Salford Quays, Middlebrook Bolton, Birchwood Warrington, and Speke Liverpool</strong>, alongside town centres across Bolton, Bury, Wigan, Oldham, Rochdale, and Stockport.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Need measured lease drawings for conveyancing? Combine your commercial survey with our <Link href="/floor-plans-drafting" className="text-[#016837] underline font-semibold">Land Registry compliant lease plans</Link>.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#f8fffe]" id="faqs">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#282828] mb-8 text-center">Commercial EPC Questions Answered</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-[#80C531]/20 shadow-sm open:shadow-md group">
                <summary className="cursor-pointer px-6 py-5 font-semibold text-lg text-[#282828] flex justify-between items-center list-none">
                  {f.q}
                  <span className="ml-4 text-[#016837] group-open:rotate-180 transition-transform duration-200 flex-shrink-0">▼</span>
                </summary>
                <p className="px-6 pb-5 text-[#282828]/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#016837] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your Commercial EPC Survey</h2>
          <p className="text-white/80 mb-8">Starting from £144 · Level 3 &amp; Level 4 SBEM qualified · Turnaround in 48 to 72 hours</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">Get a Quote — From £144</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
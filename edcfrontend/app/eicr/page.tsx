import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'Landlord EICR North West from £110 | 5-Year Electrical Test' },
  description: 'BS 7671 18th Edition Landlord EICR electrical safety reports from £110 across Manchester, Bolton, Liverpool & the North West. 5-year renewals & HMO checks.',
  alternates: { canonical: '/eicr' },
  openGraph: {
    url: '/eicr',
    title: 'Landlord EICR North West from £110 | 5-Year Electrical Test',
    description: 'BS 7671 18th Edition Landlord EICR electrical safety reports from £110 across Manchester, Bolton, Liverpool & the North West. 5-year renewals & HMO checks.',
  },
}

const faqs = [
  { q: 'When is a 5-year landlord EICR electrical safety report legally required?', a: 'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, private and social landlords must have fixed electrical installations inspected and tested by a qualified person at least every 5 years, or at a change of tenancy. Tenants must receive a copy within 28 days, and council fines for non-compliance reach £30,000.' },
  { q: 'What do EICR observation codes C1, C2, C3, and FI mean?', a: 'On a BS 7671 18th Edition EICR report, Code C1 means danger present (immediate risk of shock), Code C2 means potentially dangerous (urgent fault), and Code FI means further investigation required without delay. Any C1, C2, or FI code makes the EICR Unsatisfactory, legally requiring remedial electrical work within 28 days.' },
  { q: 'How much does an EICR cost in Bolton and Greater Manchester?', a: 'Our landlord EICR starts from £110 for a standard 1-3 bedroom property, tiered transparently by the number of consumer unit circuits. We also provide combined EPC + EICR packages from £160.' },
  { q: 'How long does an electrical safety test take?', a: 'Usually 2 to 4 hours depending on property size and consumer unit complexity. Power is turned off for short intervals during fixed wiring testing.' },
  { q: 'Can I get my EPC and EICR carried out on the same day?', a: 'Yes. We coordinate both assessments in a single visit, cutting out duplicate call-outs and tenant disruption. See our landlord package for combined rates.' },
]

export default function EicrPage() {
  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Electrical Installation Condition Report (EICR)"
        path="/eicr"
        serviceType="Electrical inspection and testing"
        price={BUSINESS.prices.eicrFrom}
        areas={['Bolton','Manchester','Salford','Bury','Wigan','Leigh','Chorley','Oldham','Rochdale','Stockport']}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'EICR', path: '/eicr' }]} />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            EICR Electrical Safety Reports Across Greater Manchester &amp; the North West
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
            BS 7671 18th Edition certified inspection and testing for landlords, home buyers, and commercial premises across Bolton, Manchester, and a 50-mile radius starting from <strong>£110</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold py-4 px-8 rounded-xl text-center transition-all">Book an EICR — From £110</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-8 rounded-xl text-center transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { val: 'From £110', label: 'Starting Rate' },
              { val: '24-48h', label: 'Digital PDF Delivery' },
              { val: '18th Edition', label: 'BS 7671 Certified' },
              { val: '1 Visit', label: 'EPC + EICR Package' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#016837]">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content & AEO Direct Answers */}
      <section className="py-16 container mx-auto px-4 max-w-3xl space-y-10 text-[#282828]">
        {/* AEO Answer 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#016837]">When is a 5-year landlord EICR electrical safety report legally required?</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, private and social landlords must have fixed electrical installations inspected and tested by a qualified person at least every 5 years, or at a change of tenancy. Tenants must receive a copy within 28 days, and council fines for non-compliance reach £30,000.
          </p>
        </div>

        {/* AEO Answer 2 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#016837]">What do EICR observation codes C1, C2, C3, and FI mean?</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
            On a BS 7671 18th Edition EICR report, Code C1 means danger present (immediate risk of shock), Code C2 means potentially dangerous (urgent fault), and Code FI means further investigation required without delay. Any C1, C2, or FI code makes the EICR Unsatisfactory, legally requiring remedial electrical work within 28 days.
          </p>
          <div className="space-y-3">
            {[
              { code: 'Code C1 — Danger Present', desc: 'Immediate risk of injury or electric shock. Requires urgent make-safe action before re-energising.' },
              { code: 'Code C2 — Potentially Dangerous', desc: 'Critical electrical fault or missing earthing/bonding requiring remedial attention within 28 days.' },
              { code: 'Code FI — Further Investigation', desc: 'Unverified circuit safety hazard requiring urgent diagnostic tracing without delay.' },
              { code: 'Code C3 — Improvement Recommended', desc: 'Non-compliance with the latest 18th Edition wiring standards that does not present an immediate danger.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-[#016837] mb-1">{item.code}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">2026 EICR 5-Year Renewals &amp; Compliance Deadlines</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            With the original 2020/2021 PRS regulations now reaching their 5-year threshold, thousands of landlords across Greater Manchester require a <strong>5-year EICR renewal for expired 2021 certificates</strong>. We provide fast inspections for <strong>change of tenancy electrical safety check</strong> schedules, <strong>HMO and council selective licensing electrical report</strong> compliance, and thorough <strong>consumer unit RCD testing</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Need an EPC at the same time? Save time and avoid duplicate call-out fees with our <Link href="/landlord-certificates" className="text-[#016837] underline font-semibold">combined Landlord EPC + EICR Package</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Direct Surveyor Pricing Guide</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#016837] text-white">
                <tr><th className="text-left p-4">Property Size / Circuits</th><th className="text-left p-4">Starting Rate</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                <tr><td className="p-4 font-medium">Studio / 1-Bedroom Flat</td><td className="p-4 font-bold text-[#016837]">From £110</td></tr>
                <tr><td className="p-4 font-medium">2 to 3 Bedroom House / Flat</td><td className="p-4 font-bold text-[#016837]">From £130</td></tr>
                <tr><td className="p-4 font-medium">4+ Bedroom / HMO Property</td><td className="p-4 font-bold text-[#016837]">From £160</td></tr>
                <tr><td className="p-4 font-medium">Combined EPC + EICR Bundle</td><td className="p-4 font-bold text-[#016837]">From £160 (Single Visit)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#f8fffe]" id="faqs">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#282828] mb-8 text-center">Landlord EICR Questions Answered</h2>
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
          <h2 className="text-3xl font-bold mb-4">Book Your Landlord EICR Today</h2>
          <p className="text-white/80 mb-8">Starting from £110 · 18th Edition qualified inspectors · Digital PDF report within 24 to 48 hours</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">Book Online — From £110</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
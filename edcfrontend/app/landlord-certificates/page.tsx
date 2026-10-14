import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'Landlord EPC & EICR Package | North West One-Visit Safety' },
  description: 'Combined Landlord EPC and 5-year EICR inspection in one visit across Manchester, Bolton, Liverpool & the North West. Selective licensing & 2030 MEES ready.',
  alternates: { canonical: '/landlord-certificates' },
  openGraph: {
    url: '/landlord-certificates',
    title: 'Landlord EPC & EICR Package | North West One-Visit Safety',
    description: 'Combined Landlord EPC and 5-year EICR inspection in one visit across Manchester, Bolton, Liverpool & the North West. Selective licensing & 2030 MEES ready.',
  },
}

const faqs = [
  { q: 'What is the 1 October 2030 EPC Band C deadline for UK landlords?', a: "Under the UK Government's Warm Homes Plan confirmed in January 2026, all private rented homes in England and Wales must meet EPC Band C or equivalent by 1 October 2030 across new and existing tenancies. The rules include a £10,000 cost cap per property, counting qualifying energy upgrades installed from 1 October 2025." },
  { q: 'How does a single-visit EPC and EICR bundle work?', a: 'We coordinate an accredited Domestic Energy Assessor and a qualified electrical inspector in one scheduled time slot. This covers both your statutory 10-year EPC and 5-year EICR with a single appointment, single invoice, and minimal tenant disruption.' },
  { q: 'Do you offer key collection from letting agents?', a: 'Yes. We provide free key collection from letting agents and property management branches across Bolton, Manchester, Bury, Salford, and Wigan.' },
  { q: 'Does this package satisfy council selective licensing requirements?', a: 'Yes. Our certificates satisfy council selective licensing compliance in Manchester, Salford, Bolton, and Wigan, alongside statutory HMO landlord compliance rules.' },
]

export default function LandlordCertificatesPage() {
  return (
    <div className="min-h-screen font-sans">
      <ServiceSchema
        name="Landlord EPC & EICR Compliance Package"
        path="/landlord-certificates"
        serviceType="Landlord property compliance and energy safety certification"
        price={160}
        areas={['Bolton', 'Manchester', 'Salford', 'Bury', 'Wigan', 'Leigh', 'Chorley', 'Oldham', 'Rochdale', 'Stockport']}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Landlord Package', path: '/landlord-certificates' }]} />
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
            ⚡ Save Time &amp; Call-Outs — All-In-One Landlord Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Landlord Compliance Package: Combined EPC &amp; EICR in One Visit
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
            Meet your statutory legal obligations in one coordinated appointment. We provide a single-visit EPC and EICR bundle across Greater Manchester and a 50-mile radius, ensuring 100% rental safety compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-4 px-8 rounded-xl text-center shadow-lg transition-all">
              Book Landlord Bundle →
            </Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-8 rounded-xl text-center transition-all">
              📞 {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { val: '1 Single Visit', label: 'Coordinated Access' },
              { val: '24–48h', label: 'Fast Turnaround' },
              { val: '100% MEES', label: 'UK Rental Compliant' },
              { val: '4.6 ★', label: '18 Trustpilot Reviews' },
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#016837]">What is the 1 October 2030 EPC Band C deadline for UK landlords?</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            Under the UK Government&apos;s Warm Homes Plan confirmed in January 2026, all private rented homes in England and Wales must meet EPC Band C or equivalent by 1 October 2030 across new and existing tenancies. The rules include a £10,000 cost cap per property, counting qualifying energy upgrades installed from 1 October 2025.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Why Book a Single-Visit EPC and EICR Bundle?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Private landlords and letting agents often struggle with organizing access for multiple trades. Our coordinated service delivers full <strong>council selective licensing compliance in Manchester, Salford, Bolton, and Wigan</strong>, alongside statutory <strong>HMO landlord compliance</strong>. We handle <strong>key collection from letting agents</strong> across the North West at no extra charge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Domestic EPC Certificate</h3>
              <p className="text-sm text-gray-600 mb-3">Statutory requirement for all residential lettings. Valid for 10 years and lodged directly on the official GOV.UK register.</p>
              <p className="text-xs font-semibold text-[#016837]">Standalone from £50</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-2">5-Year Landlord EICR</h3>
              <p className="text-sm text-gray-600 mb-3">Statutory periodic electrical inspection under PRS Regulations 2020. Digital condition report delivered within 24 to 48 hours.</p>
              <p className="text-xs font-semibold text-[#016837]">Standalone from £110</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#f8fffe]" id="faqs">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#282828] mb-8 text-center">Landlord Package Questions Answered</h2>
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
          <h2 className="text-3xl font-bold mb-4">Order Your Landlord Compliance Package</h2>
          <p className="text-white/80 mb-8">Save time, reduce call-outs, and ensure 100% legal compliance across Greater Manchester.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold px-8 py-4 rounded-lg shadow-lg transition-all">
              Book Landlord Package →
            </Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">
              📞 {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

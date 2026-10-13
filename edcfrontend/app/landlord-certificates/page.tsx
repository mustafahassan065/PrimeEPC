import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'Landlord Certificates Greater Manchester | EPC & EICR Package' },
  description: 'Complete landlord compliance packages across Greater Manchester & 50-mile radius. Combined EPC and EICR inspections from £160. Fast 24-48h lodgement.',
  alternates: { canonical: '/landlord-certificates' },
  openGraph: {
    url: '/landlord-certificates',
    title: 'Landlord Certificates Greater Manchester | EPC & EICR Package',
    description: 'Complete landlord compliance packages across Greater Manchester & 50-mile radius. Combined EPC and EICR inspections from £160. Fast 24-48h lodgement.',
  },
}

const faqs = [
  { q: 'What certificates do landlords legally need in the UK?', a: 'Private landlords in the UK are legally required to provide a valid Energy Performance Certificate (EPC rated E or above under MEES) and an Electrical Installation Condition Report (EICR tested at least every 5 years). A Gas Safety Certificate (CP12) is also required if the property uses gas.' },
  { q: 'Can I get my EPC and EICR done in one visit?', a: 'Yes! Booking our combined Landlord Package allows our accredited assessors and certified electricians to coordinate access once, minimizing tenant disruption and eliminating repeat call-out fees.' },
  { q: 'How much does the Landlord Compliance Package cost?', a: 'Combined Landlord EPC + EICR packages start from £160 for a standard 1-3 bedroom property across Greater Manchester, providing substantial savings over booking separately.' },
  { q: 'How fast do I receive the completed certificates?', a: 'Domestic EPCs are officially lodged on the National Register within 24 to 48 hours of inspection. EICR digital reports are delivered promptly following inspection and verification.' },
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
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Landlord Certificates', path: '/landlord-certificates' }]} />
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
            ⚡ Save Time &amp; Call-Outs — All-In-One Landlord Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Landlord Certificates: EPC &amp; EICR Package in Greater Manchester
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
            Meet your statutory legal obligations in one coordinated appointment. Our accredited assessors provide combined Domestic EPC and statutory 5-year Landlord EICR inspections across Greater Manchester and a 50-mile radius.
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
              { val: '24–48h', label: 'Turnaround' },
              { val: '100% MEES', label: 'UK Rental Compliant' },
              { val: '4.6 ★', label: 'Trustpilot Rated' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#016837]">{s.val}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Landlords Book the Combined Compliance Bundle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#F8F8F8] rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#016837] mb-3">Domestic EPC Certificate</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Statutory requirement for all rental tenancies in England. Valid for 10 years, ensuring your property satisfies current MEES standards (minimum Band E).
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Official register lodgement within 24-48 hours</li>
                <li>✓ Practical advice to upgrade low ratings</li>
                <li>✓ Rates starting from £50 standalone</li>
              </ul>
            </div>

            <div className="bg-[#F8F8F8] rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-[#016837] mb-3">Landlord EICR Electrical Report</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Legally mandatory under Private Rented Sector Regulations 2020. Thorough testing of consumer units, circuits, and sockets every 5 years.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Full digital condition report for council/tenant</li>
                <li>✓ Clear classification of any C1, C2, or FI defects</li>
                <li>✓ Rates starting from £110 standalone</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#016837]/10 to-[#80C531]/10 rounded-2xl p-8 border border-[#80C531]/30 text-center mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Order Both Together &amp; Save</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              One booking, one key collection, one visit, and one consolidated invoice. Perfect for private landlords, letting agents, and property managers.
            </p>
            <Link href="/booking" className="bg-[#016837] hover:bg-[#01572E] text-white font-bold py-3 px-8 rounded-xl inline-block shadow-md transition-all">
              Book Your Landlord Package Today →
            </Link>
          </div>

          {/* FAQs */}
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import FaqBlock from '@/components/seo/FaqBlock'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'EICR Bolton & Manchester from £110 | Landlord Electrical Report' },
  description:
    'Electrical Installation Condition Reports for landlords, sellers and businesses in ' +
    'Bolton and Greater Manchester. From £110. Book with your EPC and save a visit.',
  alternates: { canonical: '/eicr' },
  openGraph: { url: '/eicr' },
}

const faqs = [
  {
    q: 'How much does an EICR cost in Bolton?',
    a: 'Our landlord EICR starts from £110 for a 1-3 bedroom property. Larger properties are priced by the number of circuits — contact us for a quote.',
  },
  {
    q: 'How often do landlords need an EICR?',
    a: 'Private landlords in England must have electrical installations inspected at least every five years, give tenants a copy within 28 days, and provide a copy to the council within 7 days if requested.',
  },
  {
    q: 'What do the codes C1, C2, C3 and FI mean?',
    a: 'C1 means danger present — immediate action required. C2 means potentially dangerous. FI means further investigation needed. C3 is an improvement recommendation only. Any C1, C2 or FI makes the report Unsatisfactory, and remedial work must be completed within 28 days.',
  },
  {
    q: 'How long does an EICR take?',
    a: 'Usually 2-4 hours for a standard house or flat. The power will need to be off for part of the inspection.',
  },
  {
    q: 'Can I get my EPC and EICR on the same day?',
    a: 'Yes. We can carry out both in one visit, saving you arranging access twice. See our landlord package for combined pricing.',
  },
]

export default function EicrPage() {
  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Electrical Installation Condition Report (EICR)"
        path="/eicr"
        serviceType="Electrical inspection and testing"
        price={BUSINESS.prices.eicrFrom}
        areas={['Bolton', 'Manchester', 'Salford', 'Bury', 'Wigan', 'Leigh', 'Chorley', 'Oldham', 'Rochdale', 'Stockport']}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'EICR', path: '/eicr' }]} />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            EICR Electrical Safety Reports in Bolton &amp; Greater Manchester
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
            An EICR checks that the wiring, consumer unit, sockets and circuits in your property are safe.
            We carry out EICRs for landlords, sellers and businesses across Bolton and Greater Manchester
            from <strong>£110</strong> — and can do your EPC in the same visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking"
              className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold py-4 px-8 rounded-xl text-center transition-all">
              Book an EICR — from £110
            </Link>
            <a href={`tel:${BUSINESS.phoneIntl}`}
               className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-8 rounded-xl text-center transition-all">
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
              { val: 'from £110', label: 'Fixed Fee' },
              { val: '24-48h', label: 'Certificate' },
              { val: '100%', label: 'Accredited' },
              { val: '1 Visit', label: 'EPC + EICR' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#016837]">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4 max-w-3xl space-y-8 text-[#282828]">

        <div>
          <h2 className="text-3xl font-bold mb-4">Who needs an EICR?</h2>
          <p className="text-gray-600 leading-relaxed">
            Since 1 July 2020, all private landlords in England must have an Electrical Installation
            Condition Report carried out at least every five years. An EICR is also recommended for
            anyone buying an older home, for HMO properties, and for businesses that need to demonstrate
            electrical safety under workplace legislation or for insurance purposes. If you have recently
            had renovation work done, an EICR confirms the installation is still sound.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">What happens during the inspection</h2>
          <p className="text-gray-600 leading-relaxed">
            Our qualified electrician will carry out a visual inspection and test every circuit in the
            property. This includes checking the consumer unit (fuse board), earthing and bonding,
            RCD protection and the condition of sockets, switches and light fittings. The power will
            be switched off circuit by circuit during testing — usually for around 20-30 seconds per
            circuit. You will receive your certificate by email, typically within 24-48 hours.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">EICR prices in Bolton &amp; Manchester</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#016837] text-white">
                <tr>
                  <th className="text-left p-4">Property</th>
                  <th className="text-left p-4">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['1-2 bedroom flat or house', '£110'],
                  ['3-4 bedroom house', '£140'],
                  ['5+ bedroom house', '£180'],
                  ['Commercial / HMO', 'Contact us'],
                ].map(([prop, price], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{prop}</td>
                    <td className="p-4 font-bold text-[#016837]">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Prices include VAT. No travel charge across Bolton and Greater Manchester.
            See our <Link href="/pricing" className="text-[#016837] underline">full price list</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">EICR for Bolton landlords</h2>
          <p className="text-gray-600 leading-relaxed">
            Many of the properties we inspect in Bolton — particularly the Victorian and Edwardian
            terraces in areas like Halliwell, Daubhill and Great Lever — still have older wiring
            or consumer units without RCD protection. C2 codes are common in these properties.
            If your report comes back Unsatisfactory, you have 28 days to complete the remedial
            work and obtain a new certificate. We can advise on qualified local electricians if needed.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">EPC and EICR in one visit</h2>
          <p className="text-gray-600 leading-relaxed">
            Landlords need both certificates. Book them together and we cover access once,
            produce both certificates and send one invoice.
            See our <Link href="/landlord-certificates" className="text-[#016837] underline">landlord package</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Areas we cover</h2>
          <p className="text-gray-600 leading-relaxed">
            <Link href="/locations/bolton" className="text-[#016837] underline">Bolton</Link>,{' '}
            <Link href="/locations/manchester" className="text-[#016837] underline">Manchester</Link>,{' '}
            <Link href="/locations/salford" className="text-[#016837] underline">Salford</Link>,{' '}
            <Link href="/locations/oldham" className="text-[#016837] underline">Oldham</Link>,{' '}
            <Link href="/locations/stockport" className="text-[#016837] underline">Stockport</Link>,{' '}
            <Link href="/locations/rochdale" className="text-[#016837] underline">Rochdale</Link>{' '}
            and the rest of Greater Manchester within a 50-mile radius.{' '}
            <Link href="/areas-we-serve" className="text-[#016837] underline">See all areas</Link>.
          </p>
        </div>

      </section>

      <FaqBlock title="EICR questions answered" faqs={faqs} />

      {/* CTA */}
      <section className="bg-[#016837] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your EICR Today</h2>
          <p className="text-white/80 mb-8">From £110 · Accredited inspector · Certificate within 24-48 hours</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking"
              className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">
              Book Online — from £110
            </Link>
            <a href={`tel:${BUSINESS.phoneIntl}`}
               className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">
              📞 {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
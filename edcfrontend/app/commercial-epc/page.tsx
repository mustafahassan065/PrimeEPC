import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import FaqBlock from '@/components/seo/FaqBlock'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'Commercial EPC Bolton & Manchester from £144' },
  description:
    'Non-domestic EPCs for shops, offices and industrial units in Bolton and Greater Manchester. ' +
    'MEES advice for commercial landlords. Fast quotes.',
  alternates: { canonical: '/commercial-epc' },
  openGraph: { url: '/commercial-epc' },
}

const faqs = [
  {
    q: 'How is a commercial EPC priced?',
    a: 'Commercial EPCs are priced by the complexity and size of the building, not by a fixed rate. Our prices start from £144 for a simple Level 3 property such as a small shop or office.',
  },
  {
    q: 'What is the difference between Level 3, Level 4 and Level 5?',
    a: 'Level 3 covers simple buildings with basic HVAC — shops, small offices, warehouses. Level 4 is for more complex buildings with central plant or multiple zones. Level 5 is for highly complex buildings with bespoke systems.',
  },
  {
    q: 'Do I need an EPC for a lease renewal?',
    a: 'Yes. Under MEES regulations, commercial landlords cannot grant a new lease or renew an existing one for properties rated F or G. The minimum is E, with stricter requirements coming.',
  },
  {
    q: 'What is the MEES minimum for commercial properties?',
    a: 'Since April 2023, commercial landlords in England and Wales cannot let properties with an EPC below E. Further tightening is expected — contact us for current guidance.',
  },
]

export default function CommercialEpcPage() {
  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Commercial EPC"
        path="/commercial-epc"
        serviceType="Non-domestic Energy Performance Certificate"
        price={BUSINESS.prices.commercialEpcFrom}
        areas={['Bolton', 'Manchester', 'Salford', 'Stockport', 'Oldham', 'Rochdale']}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { name: 'Home', path: '/' },
            { name: 'Commercial EPC', path: '/commercial-epc' }
          ]} />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Commercial EPC Assessments in Bolton &amp; Manchester
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            We carry out non-domestic EPCs for shops, offices, industrial units and mixed-use
            properties across Greater Manchester. Prices start from{' '}
            <strong className="text-[#80C531]">£144</strong>. Fast turnaround, MEES advice included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking"
              className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold py-4 px-8 rounded-xl text-center transition-all">
              Get a Quote
            </Link>
            <a href={`tel:${BUSINESS.phoneIntl}`}
               className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-8 rounded-xl text-center transition-all">
              📞 {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4 max-w-3xl space-y-8 text-[#282828]">

        <div>
          <h2 className="text-3xl font-bold mb-4">Which commercial buildings need an EPC?</h2>
          <p className="text-gray-600 leading-relaxed">
            A commercial EPC is required whenever a non-domestic building is sold, let or constructed.
            This includes retail units, offices, warehouses, factories, restaurants, pubs and
            mixed-use buildings. Buildings that are listed, temporary, or used for worship are exempt.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Commercial EPC levels explained</h2>
          <div className="space-y-3">
            {[
              { level: 'Level 3', desc: 'Simple buildings — small shops, basic offices, storage units with no complex HVAC. Most commercial properties fall here.' },
              { level: 'Level 4', desc: 'More complex buildings with central heating and cooling plant, multiple zones or variable air volume systems.' },
              { level: 'Level 5', desc: 'High-complexity buildings with bespoke mechanical and electrical systems — large offices, hotels, hospitals.' },
            ].map((l) => (
              <div key={l.level} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-[#016837] mb-1">{l.level}</h3>
                <p className="text-gray-600 text-sm">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">MEES for commercial landlords</h2>
          <p className="text-gray-600 leading-relaxed">
            The Minimum Energy Efficiency Standards mean that commercial landlords in England and
            Wales cannot grant or renew a lease for a property rated below E. Properties rated F
            or G must be improved before letting. We include MEES compliance advice with every
            commercial EPC and can point you towards the most cost-effective improvements.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Commercial EPC prices</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#016837] text-white">
                <tr>
                  <th className="text-left p-4">Property type</th>
                  <th className="text-left p-4">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Level 3 — up to 500 m²', '£144'],
                  ['Level 3 — 500–1,000 m²', '£180'],
                  ['Level 3 — 1,000–2,000 m²', '£228'],
                  ['Level 4 / complex', 'Contact us for quote'],
                ].map(([type, price], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{type}</td>
                    <td className="p-4 font-bold text-[#016837]">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            All prices include VAT. See our <Link href="/pricing" className="text-[#016837] underline">full price list</Link>.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Areas we cover</h2>
          <p className="text-gray-600 leading-relaxed">
            Commercial EPCs across Bolton, Manchester, Salford, Stockport, Oldham and the
            wider Greater Manchester area.{' '}
            <Link href="/areas-we-serve" className="text-[#016837] underline">See all areas →</Link>
          </p>
        </div>
      </section>

      <FaqBlock title="Commercial EPC questions" faqs={faqs} />

      {/* CTA */}
      <section className="bg-[#016837] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get a Commercial EPC Quote</h2>
          <p className="text-white/80 mb-8">From £144 · Fast turnaround · MEES advice included</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking"
              className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">
              Get a Quote
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
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'Domestic EPC Bolton & Manchester | £50 Fixed Price' },
  description: 'Need an EPC to sell or let your home? Accredited assessor,Starting from £50, lodged within 24-48 hours across Greater Manchester. Book online today.',
  alternates: { canonical: '/domestic-epc' },
  openGraph: { url: '/domestic-epc' },
}

const faqs = [
  { q: 'Do I need to be home during the EPC assessment?', a: 'Yes, someone needs to be present to give access to all rooms, the loft, and the boiler. The assessment takes around 30-45 minutes.' },
  { q: 'How long is a domestic EPC valid for?', a: 'A domestic EPC is valid for 10 years. You can reuse an existing EPC if it was issued within the last 10 years and the property has not changed significantly.' },
  { q: 'Can I use an old EPC for a new tenancy?', a: 'Yes, as long as it is less than 10 years old and the property has not had significant improvements or changes since it was issued.' },
  { q: 'What if my EPC rating is low?', a: 'If your rating is F or G, you cannot legally let the property until it reaches at least E. We can advise on cost-effective improvements to raise your rating.' },
  { q: 'Do you offer same-day EPC appointments?', a: 'We do our best to accommodate urgent requests. Call us on 07308 658247 and we will check availability for same-day or next-day appointments.' },
  { q: 'How much does a domestic EPC cost in Bolton?', a: 'Our domestic EPC is a fixed £50 for any size of home — no hidden fees and no travel charge across Greater Manchester.' },
]

export default function DomesticEpcPage() {
  return (
    <div className="min-h-screen">
      <ServiceSchema
        name="Domestic EPC"
        path="/domestic-epc"
        serviceType="Energy Performance Certificate for residential properties"
        price={BUSINESS.prices.domesticEpc}
        areas={['Bolton','Manchester','Salford','Bury','Wigan','Leigh','Chorley','Oldham','Rochdale','Stockport']}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Domestic EPC', path: '/domestic-epc' }]} />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Domestic EPC for Homes in Bolton &amp; Greater Manchester
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-3">Starting from <strong className="text-[#80C531]">£50</strong> — any area across Greater Manchester.</p>
          <p className="text-white/80 mb-8 max-w-2xl">Whether you are selling, letting or remortgaging, we provide accredited Energy Performance Certificates lodged on the national register within 24-48 hours of inspection.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold py-4 px-8 rounded-xl text-center transition-all">Book EPC — £50</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-8 rounded-xl text-center transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[{ val: '£50', label: 'Starting From' },{ val: '24-48h', label: 'Turnaround' },{ val: '100%', label: 'Accredited' },{ val: '10 yrs', label: 'Certificate Valid' }].map((s,i) => (
              <div key={i}><p className="text-2xl font-bold text-[#016837]">{s.val}</p><p className="text-xs text-gray-500">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4 max-w-3xl space-y-8 text-[#282828]">
        <div>
          <h2 className="text-3xl font-bold mb-4">When do you need a domestic EPC?</h2>
          <ul className="space-y-2 text-gray-600">
            {['Selling your home — required before listing with an estate agent','Renting out a property — must be provided to tenants before they move in','Remortgaging — some lenders require a current EPC','New build completion — required before the property can be occupied'].map((item,i) => (
              <li key={i} className="flex items-start gap-2"><span className="text-[#016837] font-bold mt-0.5">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">What does the assessor check?</h2>
          <p className="text-gray-600 leading-relaxed">Our accredited domestic energy assessor will inspect the construction type, loft and wall insulation, glazing, heating system, hot water cylinder, lighting and any renewable technology. The assessment takes around 30-45 minutes for a standard house or flat. We just need access to all rooms, the loft hatch and the boiler.</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Understanding your EPC rating A to G</h2>
          <p className="text-gray-600 leading-relaxed mb-4">The EPC shows your current rating and a potential rating if recommended improvements are made. Under the Minimum Energy Efficiency Standards (MEES), rented properties must reach at least Band E — with Band C expected to become the minimum by 2030.</p>
          <div className="grid grid-cols-7 gap-1">
            {[{band:'A',color:'#008054',range:'92+'},{band:'B',color:'#19b459',range:'81-91'},{band:'C',color:'#8dce46',range:'69-80'},{band:'D',color:'#ffd500',range:'55-68'},{band:'E',color:'#fcaa65',range:'39-54'},{band:'F',color:'#ef8023',range:'21-38'},{band:'G',color:'#e9153b',range:'1-20'}].map((b) => (
              <div key={b.band} className="text-center rounded-lg p-2 text-white text-sm font-bold" style={{backgroundColor:b.color}}>
                <div className="text-lg">{b.band}</div><div className="text-xs opacity-90">{b.range}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Improving your EPC rating</h2>
          <p className="text-gray-600 leading-relaxed">Your EPC includes a list of recommended improvements and their estimated cost and saving. Common quick wins include switching to LED lighting, adding loft insulation to 270mm, installing a smart thermostat and upgrading to a modern condensing boiler. See our guide on <Link href="/blog/improve-epc-rating-manchester" className="text-[#016837] underline">improving your EPC rating</Link>.</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Areas we cover</h2>
          <p className="text-gray-600 leading-relaxed">
            <Link href="/locations/bolton" className="text-[#016837] underline">Bolton</Link>,{' '}
            <Link href="/locations/manchester" className="text-[#016837] underline">Manchester</Link>,{' '}
            <Link href="/locations/salford" className="text-[#016837] underline">Salford</Link>,{' '}
            <Link href="/locations/stockport" className="text-[#016837] underline">Stockport</Link>,{' '}
            <Link href="/locations/oldham" className="text-[#016837] underline">Oldham</Link> and more.{' '}
            <Link href="/areas-we-serve" className="text-[#016837] underline">See all areas →</Link>
          </p>
        </div>
      </section>

      {/* FAQs — homepage style */}
      <section className="py-16 bg-[#f8fffe]" id="faqs">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#282828] mb-8 text-center">Domestic EPC Questions Answered</h2>
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
          <h2 className="text-3xl font-bold mb-4">Book Your Domestic EPC Today</h2>
          <p className="text-white/80 mb-8">Starting from £50· Any size home · Certificate within 24-48 hours</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">Book Online — £50</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
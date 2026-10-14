import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'Domestic EPC North West from £50 | Accredited Assessor' },
  description: 'Domestic EPCs from £50 across Greater Manchester, Merseyside, Lancashire & Cheshire. RdSAP 10 surveys for sales, rentals & 10-year renewals. 24–48h lodgement.',
  alternates: { canonical: '/domestic-epc' },
  openGraph: {
    url: '/domestic-epc',
    title: 'Domestic EPC North West from £50 | Accredited Assessor',
    description: 'Domestic EPCs from £50 across Greater Manchester, Merseyside, Lancashire & Cheshire. RdSAP 10 surveys for sales, rentals & 10-year renewals. 24–48h lodgement.',
  },
}

const faqs = [
  { q: 'How much does a domestic EPC cost in Greater Manchester and the North West?', a: 'A domestic Energy Performance Certificate (EPC) with Prime EPC & Design Consultants starts from £50 for standard flats and terraced houses across Greater Manchester, Merseyside, Lancashire, and Cheshire. Pricing scales transparently for larger detached homes or extended properties, with zero estate agent mark-ups and official GOV.UK register lodgement within 24 to 48 hours.' },
  { q: 'What does an energy assessor check during an RdSAP 10 EPC inspection?', a: 'During a 30-to-50 minute non-invasive survey under UK RdSAP 10 standards, our accredited Domestic Energy Assessor measures external wall construction (solid brick, stone, or cavity), loft insulation depth at the hatch against the 270mm benchmark, boiler model efficiency, heating controls (programmers, room thermostats, TRVs), window glazing age, and fixed low-energy LED lighting.' },
  { q: 'Do I need to be home during the EPC assessment?', a: 'No. Provided access is arranged via an adult representative, on-site key safe, or free key collection from local estate agents or letting agents, you do not need to attend.' },
  { q: 'How long is a domestic EPC valid for?', a: 'A domestic EPC is valid for 10 years. A 10-year expired EPC renewal is legally required before listing on Rightmove and Zoopla, or signing a new tenancy agreement.' },
  { q: 'Can I get a re-assessment after energy efficiency upgrades?', a: 'Yes. Booking a re-assessment after installing a new condensing boiler or 270mm loft insulation ensures your updated score is logged on the official register ahead of a sale or remortgage.' },
  { q: 'Do you offer same-day EPC appointments?', a: 'We regularly accommodate urgent requests for conveyancing solicitors and estate agents. Call us on 07308 658247 to confirm availability.' },
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
            Domestic Energy Performance Certificates Across the North West
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-3">Starting from <strong className="text-[#80C531]">£50</strong> — direct local assessor rates across Greater Manchester.</p>
          <p className="text-white/80 mb-8 max-w-2xl">Official RdSAP 10 domestic energy assessments lodged on the national GOV.UK register within 24 to 48 hours for home sales, private rentals, and 10-year renewals.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold py-4 px-8 rounded-xl text-center transition-all">Book EPC — From £50</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-8 rounded-xl text-center transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[{ val: 'From £50', label: 'Starting Rate' },{ val: '24-48h', label: 'Register Lodgement' },{ val: '100%', label: 'Quidos Accredited' },{ val: '10 yrs', label: 'Certificate Valid' }].map((s,i) => (
              <div key={i}><p className="text-2xl font-bold text-[#016837]">{s.val}</p><p className="text-xs text-gray-500">{s.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Content & AEO Direct Answers */}
      <section className="py-16 container mx-auto px-4 max-w-3xl space-y-10 text-[#282828]">
        {/* AEO Answer 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#016837]">How much does a domestic EPC cost in Greater Manchester and the North West?</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            A domestic Energy Performance Certificate (EPC) with Prime EPC &amp; Design Consultants starts from £50 for standard flats and terraced houses across Greater Manchester, Merseyside, Lancashire, and Cheshire. Pricing scales transparently for larger detached homes or extended properties, with zero estate agent mark-ups and official GOV.UK register lodgement within 24 to 48 hours.
          </p>
        </div>

        {/* AEO Answer 2 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#016837]">What does an energy assessor check during an RdSAP 10 EPC inspection?</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
            During a 30-to-50 minute non-invasive survey under UK RdSAP 10 standards, our accredited Domestic Energy Assessor measures external wall construction (solid brick, stone, or cavity), loft insulation depth at the hatch against the 270mm benchmark, boiler model efficiency, heating controls (programmers, room thermostats, TRVs), window glazing age, and fixed low-energy LED lighting.
          </p>
          <ul className="space-y-2.5 text-gray-600 text-sm md:text-base">
            {[
              'Building Fabric & Construction: Wall types (solid stone, solid brick, or cavity brickwork), property age bands, extensions, and cavity wall insulation retrofits.',
              'Roof Space & Loft Insulation: Measuring insulation depth at the loft hatch against the current 270mm standard, examining joist insulation, and checking party wall construction.',
              'Space & Water Heating Systems: Main boiler make and model, fuel type, heating programmer controls, room thermostats, thermostatic radiator valves (TRVs), and hot water cylinder insulation.',
              'Glazing & Draught Proofing: Window installation eras (single, pre-2002 double, or modern low-E double glazing) and secondary glazing seals.',
              'Low-Carbon Technology & Lighting: Solar PV array output, domestic heat pumps, and fixed low-energy LED lighting percentages.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2"><span className="text-[#016837] font-bold mt-0.5">•</span><span>{item}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">When is an EPC Legally Required?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Under UK law, an EPC is legally mandatory before a residential property can be advertised for sale or rent. We provide fast assessments for <strong>EPC for Rightmove and Zoopla listings</strong>, <strong>EPC for conveyancing solicitors</strong>, and <strong>10-year expired EPC renewal</strong> requirements. We offer <strong>free key collection from local estate agents</strong> and letting agents across Bolton, Manchester, and a 50-mile radius.
          </p>
          <ul className="space-y-2 text-gray-600">
            {[
              'Selling your home — essential before listing with high-street or online estate agents',
              'Renting out a property — statutory requirement for private tenancies, Selective Licensing, and HMOs',
              'Remortgaging or equity release — requested by mortgage lenders and green finance providers',
              'Re-assessment after installing a new condensing boiler or 270mm loft insulation — upgrades your rating on the national register ahead of 2030 Band C targets'
            ].map((item,i) => (
              <li key={i} className="flex items-start gap-2"><span className="text-[#016837] font-bold mt-0.5">✓</span><span>{item}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Understanding Your EPC Rating A to G</h2>
          <p className="text-gray-600 leading-relaxed mb-4">The EPC displays current energy efficiency and potential ratings if suggested improvements are implemented. Under Minimum Energy Efficiency Standards (MEES), rented properties must achieve at least Band E, moving toward Band C under the Warm Homes Plan.</p>
          <div className="grid grid-cols-7 gap-1">
            {[{band:'A',color:'#008054',range:'92+'},{band:'B',color:'#19b459',range:'81-91'},{band:'C',color:'#8dce46',range:'69-80'},{band:'D',color:'#ffd500',range:'55-68'},{band:'E',color:'#fcaa65',range:'39-54'},{band:'F',color:'#ef8023',range:'21-38'},{band:'G',color:'#e9153b',range:'1-20'}].map((b) => (
              <div key={b.band} className="text-center rounded-lg p-2 text-white text-sm font-bold" style={{backgroundColor:b.color}}>
                <div className="text-lg">{b.band}</div><div className="text-xs opacity-90">{b.range}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Areas We Cover</h2>
          <p className="text-gray-600 leading-relaxed">
            Direct surveyor appointments across{' '}
            <Link href="/locations/bolton" className="text-[#016837] underline font-semibold">Bolton</Link>,{' '}
            <Link href="/locations/manchester" className="text-[#016837] underline font-semibold">Manchester</Link>,{' '}
            <Link href="/locations/salford" className="text-[#016837] underline font-semibold">Salford</Link>,{' '}
            <Link href="/locations/bury" className="text-[#016837] underline font-semibold">Bury</Link>,{' '}
            <Link href="/locations/wigan" className="text-[#016837] underline font-semibold">Wigan</Link>,{' '}
            <Link href="/locations/stockport" className="text-[#016837] underline font-semibold">Stockport</Link>,{' '}
            <Link href="/locations/oldham" className="text-[#016837] underline font-semibold">Oldham</Link>, and the entire 50-mile North West radius.{' '}
            <Link href="/areas-we-serve" className="text-[#016837] underline font-semibold">See all 16 coverage hubs →</Link>
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
          <p className="text-white/80 mb-8">Starting from £50 · Direct accredited assessor · Certificate lodged within 24 to 48 hours</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">Book Online — From £50</Link>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">📞 {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
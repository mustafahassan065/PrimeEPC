import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { homeFaqs } from '@/lib/homeFaqs'

export const metadata: Metadata = {
  title: { absolute: 'EPC & EICR FAQs | Same Day, Remortgage & Bulk Discounts' },
  description:
    'Answers to common questions on urgent same day EPCs, remortgage surveys, bulk discounts, 5-year EICRs, and MEES compliance across Bolton, Manchester & the North West.',
  alternates: { canonical: '/faq' },
}

const sections = [
  {
    title: '2026 Compliance & High-Priority Questions',
    id: 'priority',
    faqs: homeFaqs.map((f) => ({ q: f.question, a: f.answer }))
  },
  {
    title: 'Costs & Prices',
    id: 'cost',
    faqs: [
      { q: 'How much is an EPC certificate near me and how do same day bookings work?', a: 'An EPC certificate starts from £50 for standard flats and terraced houses across Greater Manchester, Merseyside, Lancashire, and Cheshire, scaling fairly for larger homes or extensions. Same day bookings are available subject to surveyor diary slots, and you pay the assessor directly with zero estate agent commission.' },
      { q: 'Do you offer discounts on bulk EPC orders for landlords and letting agents?', a: 'Yes. We provide custom bulk EPC discounts for portfolio landlords, letting agencies, block managers, and housing associations ordering multiple assessments. Your discount is tailored to the number of units and postcode clustering, complete with free agent key collection and a single consolidated invoice.' },
      { q: 'How much does an EPC cost in Bolton and Greater Manchester?', a: 'Domestic EPC rates start from £50 with complete transparent pricing and no travel charge across Greater Manchester. Commercial EPCs start from £144.' },
      { q: 'How much does an EICR cost?', a: 'Our Landlord EICR starts from £110 for a 1-3 bedroom property, tiered transparently by the number of consumer unit circuits.' },
      { q: 'Is there a travel charge?', a: 'No. We cover Bolton and Greater Manchester within our 50-mile radius with zero travel surcharge.' },
      { q: 'Is VAT included in your prices?', a: 'Yes. All our prices include VAT — there are no hidden booking charges.' },
      { q: 'What payment methods do you accept?', a: 'We accept debit/credit card, bank transfer, and PayPal.' },
    ]
  },
  {
    title: 'The Visit & Inspection',
    id: 'visit',
    faqs: [
      { q: 'Can I book an urgent EPC today and get a same day report?', a: 'Yes. If you have an urgent property sale exchange, auction deadline, or tenancy move-in, you can book an EPC now by calling 07308 658247 or booking online. We offer same day survey slots across our 16 North West service areas, with priority same day report lodgement onto the GOV.UK register.' },
      { q: 'How long does an EPC assessment take?', a: 'Around 30 to 50 minutes for a typical house or flat. The assessor will inspect every room, the loft hatch, and the heating controls.' },
      { q: 'Do I need to be present during the assessment?', a: 'No, provided access is arranged via an adult representative, on-site key safe, or free key collection from your estate or letting agent.' },
      { q: 'How do I receive my EPC certificate?', a: 'Your certificate is emailed directly to you in digital PDF format and lodged on the official GOV.UK register within 24 to 48 hours of inspection.' },
    ]
  },
  {
    title: 'Validity & Regulations',
    id: 'validity',
    faqs: [
      { q: 'Why should I book an EPC for a remortgage?', a: 'UK mortgage lenders and Buy-to-Let underwriters check the national EPC register during remortgage valuations, and many offer discounted Green Mortgage interest rates for properties in Band A, B, or C. If your existing certificate has expired after 10 years—or if you have upgraded your boiler, windows, or loft insulation—booking an EPC for your remortgage updates your official rating.' },
      { q: 'How long is an EPC valid for?', a: 'A domestic EPC is valid for 10 years. A commercial EPC is also valid for 10 years from the date of issue.' },
      { q: 'Can I reuse an old EPC?', a: 'Yes, as long as it was issued within the last 10 years and the property has not had major alterations to its heating, insulation, or structure.' },
      { q: 'What happens if I carry out energy improvements?', a: 'If you install a new condensing boiler, double glazing, or top up loft insulation to 270mm, booking a re-assessment updates your official rating on the register.' },
    ]
  },
  {
    title: 'Landlord Regulations & MEES',
    id: 'landlords',
    faqs: [
      { q: 'What is the minimum EPC rating to rent a property?', a: 'Under current MEES regulations, rented properties in England must have an EPC rating of at least E. Properties rated F or G cannot be let legally without a valid registered exemption.' },
      { q: 'What is the 1 October 2030 EPC Band C deadline?', a: "Under the UK Government's Warm Homes Plan confirmed in January 2026, private rented properties must achieve EPC Band C by 1 October 2030 with a £10,000 cost cap per property." },
      { q: 'How often do landlords need an EICR electrical check?', a: 'At least every 5 years, or at the start of a new tenancy under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.' },
      { q: 'Can I get my EPC and EICR in one visit?', a: 'Yes. Our combined Landlord Package covers both inspections in one visit, saving you time and avoiding duplicate call-out fees.' },
    ]
  },
]

export default function FaqPage() {
  const allFaqs = sections.flatMap((s) => s.faqs)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faq' }]} />
          <h1 className="text-4xl font-extrabold mb-4">Property Compliance &amp; EPC Questions Answered</h1>
          <p className="text-white/80">Practical guidance on domestic EPCs, commercial SBEM surveys, 5-year landlord EICRs, and MEES compliance across Greater Manchester.</p>
        </div>
      </section>

      {/* Jump links */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 max-w-3xl flex flex-wrap gap-3">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}
               className="border border-[#016837] text-[#016837] px-4 py-1.5 rounded-full text-sm hover:bg-[#016837] hover:text-white transition-colors">
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ sections */}
      {sections.map((section, si) => (
        <section key={section.id} id={section.id} className={`py-16 ${si % 2 === 1 ? 'bg-[#f8fffe]' : 'bg-white'}`}>
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#282828] mb-8">{section.title}</h2>
            <div className="space-y-3">
              {section.faqs.map((f, i) => (
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
      ))}

      {/* CTA */}
      <section className="bg-[#016837] text-white py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Still have a question?</h2>
          <p className="text-white/80 mb-6">Call our accredited surveyors on 07308 658247 or book online with fast 24 to 48 hour turnaround.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">Book Online — From £50</Link>
            <a href="tel:+447308658247" className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">📞 07308 658247</a>
          </div>
        </div>
      </section>
    </div>
  )
}
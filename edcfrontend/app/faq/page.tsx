import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = {
  title: { absolute: 'EPC & EICR FAQs | Costs, Validity, Landlord Rules' },
  description: 'Answers to common questions about EPCs and EICRs in Bolton and Greater Manchester — costs, how long they take, landlord rules and MEES compliance.',
  alternates: { canonical: '/faq' },
}

const sections = [
  {
    title: 'Costs & Prices',
    id: 'cost',
    faqs: [
      { q: 'How much does an EPC cost in Bolton?', a: 'A domestic EPC is a fixed £50 for any size of home — no hidden fees and no travel charge across Greater Manchester.' },
      { q: 'How much does an EICR cost?', a: 'Our EICR starts from £110 for a 1-2 bedroom property. Larger properties are quoted individually.' },
      { q: 'Is there a travel charge?', a: 'No. We cover Bolton and Greater Manchester within our 50-mile radius with no travel charge.' },
      { q: 'Is VAT included in your prices?', a: 'Yes. All our prices include VAT — there are no additional charges.' },
      { q: 'What payment methods do you accept?', a: 'We accept cash, bank card (Stripe), PayPal and bank transfer.' },
    ]
  },
  {
    title: 'The Visit',
    id: 'visit',
    faqs: [
      { q: 'How long does an EPC assessment take?', a: 'Around 30-45 minutes for a typical house or flat. The assessor will inspect every room, the loft and the heating system.' },
      { q: 'Do I need to be present during the assessment?', a: 'Yes — someone needs to be there to give access to all rooms including the loft hatch and boiler cupboard.' },
      { q: 'How do I receive my EPC certificate?', a: 'Your certificate is emailed to you and lodged on the national EPC register, typically within 24-48 hours of the inspection.' },
    ]
  },
  {
    title: 'Validity & Certificates',
    id: 'validity',
    faqs: [
      { q: 'How long is an EPC valid for?', a: 'A domestic EPC is valid for 10 years. A commercial EPC is also valid for 10 years.' },
      { q: 'Can I reuse an old EPC?', a: 'Yes, as long as it was issued within the last 10 years and the property has not had significant changes to insulation, heating or structure.' },
      { q: 'What happens if I carry out improvements?', a: 'If you make significant energy improvements, you can commission a new EPC to reflect the higher rating — which may help with letting or selling.' },
    ]
  },
  {
    title: 'Landlord Rules',
    id: 'landlords',
    faqs: [
      { q: 'What is the minimum EPC rating to rent a property?', a: 'Under current MEES regulations, rented properties in England must have an EPC rating of at least E. Properties rated F or G cannot be let.' },
      { q: 'When does the EPC Band C requirement come in?', a: 'The UK government has proposed that rented homes must reach Band C by 2030 for new tenancies. Legislation is not yet finalised.' },
      { q: 'How often do I need an EICR as a landlord?', a: 'At least every five years, or at the start of a new tenancy if the existing report is more than five years old.' },
      { q: 'Can I get my EPC and EICR in one visit?', a: 'Yes. We offer a combined landlord visit — one booking, both certificates, one invoice.' },
    ]
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faq' }]} />
          <h1 className="text-4xl font-extrabold mb-4">EPC &amp; EICR Questions Answered</h1>
          <p className="text-white/80">Common questions about energy performance certificates and electrical safety reports in Bolton and Greater Manchester.</p>
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
          <p className="text-white/80 mb-6">Call us on 07308 658247 or book online — we typically respond within the hour.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">Book Online</Link>
            <a href="tel:+447308658247" className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">📞 07308 658247</a>
          </div>
        </div>
      </section>
    </div>
  )
}
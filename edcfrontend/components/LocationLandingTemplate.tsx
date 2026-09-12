"use client"

import Link from 'next/link'
import { useState } from 'react'

interface LocationLandingTemplateProps {
  cityName: string
  citySlug: string
  housingContext: string
  postcodes: string[]
}

export default function LocationLandingTemplate({
  cityName,
  housingContext,
  postcodes,
}: LocationLandingTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const services = [
    {
      title: 'Domestic EPC Certificate',
      price: '£50',
      priceColor: 'text-[#016837]',
      description: 'Official residential Energy Performance Certificate for selling or renting your home.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    },
    {
      title: 'Commercial EPC Assessment',
      price: '£144',
      priceColor: 'text-gray-700',
      description: 'Accredited commercial energy assessments for offices, shops and rental premises.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    },
    {
      title: 'CAD Floor Plans',
      price: 'Get Quote',
      priceColor: 'text-gray-700',
      description: 'Precision CAD floor plans for estate agents, landlords and property listings.',
      icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></>,
    },
    {
      title: 'Landlord EICR Certificate',
      price: '£110',
      priceColor: 'text-[#016837]',
      description: 'Electrical Installation Condition Report — full landlord safety compliance.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    },
  ]

  const features = [
    { icon: '🚀', title: 'Fast 24–48h Turnaround', text: 'Your lodged EPC delivered digitally within 24 to 48 hours of the survey.' },
    { icon: '🏆', title: 'Quidos-Accredited Assessors', text: 'Government-accredited, DBS-checked assessors with direct national lodgement.' },
    { icon: '💷', title: 'Fixed £50 Price', text: 'No estate agent mark-ups, no hidden fees — one clear fixed price.' },
    { icon: '📍', title: 'Local ' + cityName + ' Coverage', text: 'Same-day appointments available across all ' + cityName + ' postcodes.' },
  ]

  const steps = [
    { step: '01', icon: '📞', title: 'Book Online', text: 'Pick your service and a convenient time slot in under 2 minutes.' },
    { step: '02', icon: '🏠', title: 'On-Site Survey', text: 'Our accredited assessor completes a quick 30–60 minute inspection.' },
    { step: '03', icon: '📄', title: 'EPC Delivered', text: 'Certificate lodged on the national register and emailed within 24–48h.' },
  ]

  const faqs = [
    {
      question: `How much does an EPC cost in ${cityName}?`,
      answer: `Our domestic EPC in ${cityName} is a fixed £50 — no hidden fees and no estate agent mark-ups. Commercial EPCs start from £144.`,
    },
    {
      question: `How quickly can I get an EPC in ${cityName}?`,
      answer: `We offer a fast 24–48 hour turnaround in ${cityName}. Same-day appointments are often available if you book early.`,
    },
    {
      question: `Which postcodes do you cover in ${cityName}?`,
      answer: `We cover ${postcodes.join(', ')} in ${cityName}. If your postcode isn't listed, call us — our 50-mile radius usually still reaches you.`,
    },
    {
      question: `Can I book an EPC and EICR together in ${cityName}?`,
      answer: `Yes. Landlords can book an EPC + EICR compliance bundle in one visit — saving time and call-out fees while meeting MEES and electrical safety regulations.`,
    },
    {
      question: `Do you provide commercial EPCs in ${cityName}?`,
      answer: `Yes, we assess shops, offices and commercial premises across ${cityName}, with certificates from £144 and the same 24–48h turnaround.`,
    },
  ]

  return (
    <div className="min-h-screen font-sans">

      {/* ── Hero — Simple & Clear (screenshot style) ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#80C531]/70 via-[#016837]/80 to-[#016837]/90"></div>
        <div className="absolute inset-0 overflow-hidden z-[1]">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#80C531]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#016837]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href="/areas-we-serve" className="hover:text-white transition-colors">Areas We Serve</Link>
            <span>›</span>
            <span className="text-white font-semibold">{cityName}</span>
          </nav>

          {/* Main Heading — dynamic SEO title style */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Residential / Domestic EPC in {cityName} for £50
          </h1>

          {/* Bio / Description — screenshot style */}
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
            {cityName} is covered by Prime EPC for Energy Performance Certificates (EPC) and floorplans
            for Residential and Commercial properties in {cityName}. {housingContext}
          </p>

          {/* Postcode chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {postcodes.map((pc) => (
              <span key={pc} className="bg-white/15 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full">
                {pc}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/booking"
              className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-center"
            >
              Book EPC in {cityName} — £50 →
            </Link>
            <a
              href="tel:+447308658247"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl border border-white/30 transition-all text-center"
            >
              Call 07308 658247
            </a>
          </div>
        </div>
      </section>

      {/* ── Services Available in {City} ── */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🛠️ OUR SERVICES IN {cityName.toUpperCase()}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-4">
              EPC &amp; Compliance Services in {cityName}
            </h2>
            <p className="text-xl text-[#282828]/80 max-w-2xl mx-auto">
              Everything you need for selling, renting or managing property in {cityName} — one local accredited assessor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <Link
                key={i}
                href="/booking"
                className="bg-white rounded-3xl p-6 shadow-lg border border-[#80C531]/20 hover:border-[#016837] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center block"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className={`font-bold text-xl mb-3 ${service.priceColor}`}>{service.price}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us in {City} ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ WHY CHOOSE PRIME EPC IN {cityName.toUpperCase()}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828]">
              Trusted by Landlords &amp; Homeowners in {cityName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="bg-[#F8F8F8] rounded-3xl p-7 border border-[#80C531]/20 hover:border-[#016837] hover:shadow-lg transition-all duration-300 flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#282828] mb-2">{feature.title}</h3>
                  <p className="text-[#282828]/75 leading-relaxed">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-Step Process ── */}
      <section className="py-20 bg-gradient-to-br from-[#F8F8F8] via-white to-[#E1EED4]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📝 HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828]">
              Get Your {cityName} EPC in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="text-center bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-6 w-9 h-9 bg-[#80C531] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#282828] mb-3">{step.title}</h3>
                <p className="text-[#282828]/75 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location FAQs ── */}
      <section className="py-20 bg-gradient-to-b from-[#F8F8F8] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ❓ {cityName.toUpperCase()} EPC FAQS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828]">
              Frequently Asked Questions — {cityName}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-[#80C531]/10 overflow-hidden hover:shadow-xl transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-[#F8F8F8] transition-colors"
                >
                  <h3 className="text-lg font-bold text-[#282828] pr-4">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-[#016837] transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${openFaq === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 border-t border-[#80C531]/10">
                    <p className="text-[#282828]/80 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your EPC in {cityName}?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Fixed £50 domestic EPC with 24–48 hour turnaround. Book direct with a Quidos-accredited local assessor — no middleman fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-4 px-8 rounded-xl shadow-lg transition-all">
              Book Now — £50 →
            </Link>
            <a href="https://wa.me/447308658247" target="_blank" rel="noopener noreferrer" className="bg-white text-[#016837] font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-[#F8F8F8] transition-all">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
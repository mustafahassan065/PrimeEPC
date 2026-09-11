import Link from 'next/link'
import TrustStrip from './TrustStrip'

export interface LocationConfig {
  slug: string
  cityName: string
  regionName: string
  headline: string
  subheadline: string
  postcodes: string[]
  housingProfile: {
    title: string
    overview: string
    challenges: string[]
    recommendations: string[]
  }
  popularAreas: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
  geo?: {
    latitude: number
    longitude: number
  }
}

export interface LocationLandingTemplateProps {
  cityName?: string
  citySlug?: string
  housingContext?: string
  postcodes?: string[]
  config?: LocationConfig
}

export default function LocationLandingTemplate({
  cityName: propCityName,
  citySlug: propCitySlug,
  housingContext,
  postcodes: propPostcodes,
  config,
}: LocationLandingTemplateProps) {
  const cityName = propCityName || config?.cityName || 'Greater Manchester'
  const rawCitySlug = propCitySlug || config?.slug || 'locations'
  const citySlug = rawCitySlug.replace(/^\/+/, '')
  const postcodes = propPostcodes && propPostcodes.length > 0 
    ? propPostcodes 
    : (config?.postcodes || ['All Districts'])
  const regionName = config?.regionName || 'Greater Manchester'
  const headline = config?.headline || `Energy Performance Certificates (EPC) in ${cityName} | From £50`
  const subheadline = housingContext || config?.subheadline || `Fast, Quidos-accredited Domestic & Commercial EPCs across ${cityName}. Fixed £50 pricing with 24-48 hr turnaround. No estate agent mark-ups.`

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Prime EPC & Design Consultant - EPC ${cityName}`,
    url: `https://www.primeepcdesign.co.uk/${citySlug}`,
    telephone: '+447308658247',
    priceRange: '£50 - £144',
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: regionName,
      addressCountry: 'GB'
    },
    areaServed: [
      cityName,
      regionName,
      ...postcodes
    ],
    description: `Accredited domestic and commercial EPC assessments in ${cityName} from £50 fixed fee with 24-48h turnaround.`
  }

  const faqs = config?.faqs && config.faqs.length > 0 ? config.faqs : [
    {
      question: `How much does an EPC cost in ${cityName}?`,
      answer: `Our domestic Energy Performance Certificates in ${cityName} start from a straightforward fixed rate of £50 with zero booking fees or middleman commissions.`
    },
    {
      question: `How quickly can I get my EPC lodged in ${cityName}?`,
      answer: `Appointments are available within 24 to 48 hours across ${cityName}. After the physical survey, your digital certificate is officially lodged on the government register within 24 hours.`
    },
    {
      question: `Do you cover commercial properties in ${cityName}?`,
      answer: `Yes. We provide certified Non-Domestic commercial EPCs for retail shops, offices, and industrial premises throughout ${cityName} and the North West.`
    },
    {
      question: `What happens if my ${cityName} rental property is below Band E?`,
      answer: `Under MEES regulations, private rental properties must meet Band E or higher. We provide cost-effective recommendations to help your property achieve compliance swiftly.`
    }
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.primeepcdesign.co.uk' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.primeepcdesign.co.uk/#coverage' },
      { '@type': 'ListItem', position: 3, name: `EPC ${cityName}`, item: `https://www.primeepcdesign.co.uk/${citySlug}` },
    ],
  }

  const housingProfile = config?.housingProfile || {
    title: `${cityName} Property & Energy Efficiency Landscape`,
    overview: housingContext || `${cityName} features an extensive mix of traditional Victorian & Edwardian brick or stone terraces, mid-century family houses, and modern energy-efficient developments.`,
    challenges: [
      `Pre-1919 solid masonry external walls without cavity insulation, frequently scoring in bands D or E.`,
      `Aging non-condensing gas back-boilers or conventional storage heaters requiring modernization.`,
      `Uninsulated roof spaces or converted attic rooms leading to significant heat loss.`
    ],
    recommendations: [
      `Installing 270mm-300mm mineral wool loft insulation delivers an immediate band elevation.`,
      `Upgrading to modern condensing combination boilers with programmable thermostatic controls.`,
      `Switching 100% of incandescent or halogen downlights to low-energy LEDs.`
    ]
  }

  const popularAreas = config?.popularAreas && config.popularAreas.length > 0 
    ? config.popularAreas 
    : [`${cityName} Town Centre`, `Central ${cityName}`, `North ${cityName}`, `South ${cityName}`, `Surrounding Districts`]

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumb Trail */}
      <nav className="bg-gray-100/80 border-b border-gray-200 text-xs py-2.5 px-4" aria-label="Breadcrumb">
        <div className="container mx-auto flex items-center gap-2 text-gray-600 max-w-5xl">
          <Link href="/" className="hover:text-[#016837] font-medium transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/#coverage" className="hover:text-[#016837] font-medium transition-colors">Locations</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-semibold" aria-current="page">EPC {cityName}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#80C531]/80 via-[#016837]/90 to-[#016837] text-white">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
            📍 Local Quidos Assessor in {cityName}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-base"
            >
              Book EPC in {cityName} (£50) →
            </Link>
            <a
              href="tel:07308658247"
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#016837] font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-base flex items-center justify-center gap-2"
            >
              <span>📞 Call 07308658247</span>
            </a>
          </div>

          <TrustStrip />
        </div>
      </section>

      {/* Postcode Coverage Strip */}
      <section className="bg-[#F8F8F8] py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Covering all {cityName} Postcodes &amp; Surrounding Districts
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {postcodes.map((pc, idx) => (
              <span
                key={idx}
                className="bg-white border border-[#80C531]/40 text-[#016837] font-bold text-sm px-3.5 py-1.5 rounded-lg shadow-sm font-mono"
              >
                {pc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Housing Stock Profile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#80C531]/10 text-[#016837] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              🏠 Local Housing Insight
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {housingProfile.title}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {housingProfile.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F8F8F8] rounded-2xl p-7 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#C0392B]">⚠️</span> Common EPC Challenges in {cityName}
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {housingProfile.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#C0392B] font-bold mt-0.5">•</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F8F8F8] rounded-2xl p-7 border border-[#80C531]/40">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#016837]">💡</span> Common Score Improvement Wins
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                {housingProfile.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#016837] font-bold mt-0.5">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Booking Guarantee */}
      <section className="py-14 bg-gradient-to-br from-[#016837] to-[#01572E] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-[#80C531] text-gray-950 font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wider mb-3 inline-block">
                Direct Booking Guarantee
              </span>
              <h2 className="text-3xl font-bold mb-4">
                Avoid Estate Agent Mark-Ups in {cityName}
              </h2>
              <p className="text-white/90 leading-relaxed mb-6">
                Book direct with a local accredited assessor. Avoid expensive estate agent mark-ups and hidden fees. Same-day appointments available across {cityName}.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-[#80C531] font-bold">✓</span> Direct £50 starting rate vs £80–£120 estate agency charges
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#80C531] font-bold">✓</span> Fast 24 to 48-hour certificate lodgement
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#80C531] font-bold">✓</span> Need landlord compliance? Book EPC + EICR together in one visit
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-7 border border-white/20 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#80C531] mb-2">
                Domestic EPC in {cityName}
              </p>
              <div className="text-5xl font-extrabold text-white mb-2">
                £50<span className="text-lg font-normal text-white/80"> fixed fee</span>
              </div>
              <p className="text-white/80 text-xs mb-6">
                Official Government Register Lodgement Included
              </p>
              <Link
                href="/booking"
                className="w-full bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-3.5 px-6 rounded-xl block shadow-lg transition-all"
              >
                Book Inspection Online →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Areas / Neighborhoods Served */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Areas &amp; Neighborhoods Covered in {cityName}
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            We provide domestic and commercial energy assessments across all residential and commercial zones:
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {popularAreas.map((area, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions in {cityName}
            </h2>
            <p className="text-gray-600">
              Key questions answered about Energy Performance Certificates in {cityName}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/booking"
              className="inline-block bg-[#016837] hover:bg-[#01572E] text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all"
            >
              Order Your {cityName} EPC for £50 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

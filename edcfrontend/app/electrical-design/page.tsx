import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ServiceSchema from '@/components/seo/ServiceSchema'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'BS 7671 Electrical Design & CAD Layouts | Prime EPC' },
  description: 'Professional BS 7671 18th Edition electrical design drawings, BS 5266 emergency lighting, and BS 5839 fire detection CAD layouts across Greater Manchester.',
  alternates: { canonical: '/electrical-design' },
  openGraph: {
    url: '/electrical-design',
    title: 'BS 7671 Electrical Design & CAD Layouts | Prime EPC',
    description: 'Professional BS 7671 18th Edition electrical design drawings, BS 5266 emergency lighting, and BS 5839 fire detection CAD layouts across Greater Manchester.',
  },
}

export default function ElectricalDesignPage() {
  return (
    <div className="min-h-screen font-sans">
      <ServiceSchema
        name="BS 7671 Electrical Design Consultancy"
        path="/electrical-design"
        serviceType="Electrical engineering design and CAD layout consultancy"
        areas={['Bolton', 'Manchester', 'Salford', 'Bury', 'Wigan', 'Stockport', 'Oldham', 'Rochdale', 'Trafford']}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Electrical Design', path: '/electrical-design' }]} />
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
            ⚡ BS 7671 18th Edition Certified Design
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            BS 7671 Electrical Design &amp; CAD Layout Consultancy
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
            Professional electrical design drawings, distribution board schedules, and emergency life safety schematics for new builds, commercial fit-outs, and licensed HMO conversions across Greater Manchester.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold py-4 px-8 rounded-xl text-center shadow-lg transition-all">
              Request Design Quote →
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
              { val: '18th Edition', label: 'BS 7671 Compliant' },
              { val: 'Part P & L', label: 'Building Regs Ready' },
              { val: 'CAD 2D/3D', label: 'Full Working Drawings' },
              { val: 'Fast Delivery', label: 'Bespoke Project Quotes' },
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
      <section className="py-16 container mx-auto px-4 max-w-3xl space-y-10 text-[#282828]">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-[#016837]">Electrical Engineering Design Capabilities</h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
            We provide full <strong>BS 7671 18th Edition electrical design drawings</strong> engineered to meet <strong>Building Regulations Part P and Part L compliance</strong>. From initial schematic concepts to final installation layouts, our drawings ensure contractors, electricians, and local authority building control officers have precise, fully calculated electrical documentation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Emergency Life Safety</h3>
              <p className="text-sm text-gray-600 mb-2">
                Engineered <strong>BS 5266 emergency lighting layouts</strong> and escape route illumination calculations for commercial premises and HMO common areas.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Fire Alarm Schematics</h3>
              <p className="text-sm text-gray-600 mb-2">
                Fully mapped <strong>BS 5839 fire detection plans for HMOs and commercial units</strong>, including call point locations, sounder dB levels, and smoke/heat zones.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Distribution &amp; Sizing</h3>
              <p className="text-sm text-gray-600 mb-2">
                Detailed <strong>cable sizing and distribution board schedules</strong> calculating voltage drop, prospective fault currents, and protective device discrimination.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 mb-2">HMO &amp; Commercial Fit-Outs</h3>
              <p className="text-sm text-gray-600 mb-2">
                Complete containment, small power, data cabling, and lighting plans ready for sub-contractor tender and building regulation sign-off.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Why Partner with Prime EPC for Electrical Design?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Having an independent, qualified surveyor draft your electrical layout eliminates costly on-site contractor variations and prevents Building Control refusal. Our Bolton-based engineers work directly with property developers, architects, and private landlords across Greater Manchester.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Need statutory inspection on an existing installation? View our <Link href="/eicr" className="text-[#016837] underline font-semibold">Landlord EICR Electrical Safety Reports</Link> starting from £110.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#016837] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Discuss Your Electrical Project</h2>
          <p className="text-white/80 mb-8">Send your architectural plans for a tailored design proposal and fixed drawing turnaround schedule.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold px-8 py-4 rounded-lg shadow-lg transition-all">
              Request a Design Quote →
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

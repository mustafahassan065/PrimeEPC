import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { BUSINESS } from '@/lib/business'

export const metadata: Metadata = {
  title: { absolute: 'EPC & EICR Prices North West | Rates from £50' },
  description:
    'Transparent rates: Domestic EPC from £50, commercial EPC from £144, EICR from £110 across Manchester, Liverpool, Bolton & North West. Bulk discounts available.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    url: '/pricing',
    title: 'EPC & EICR Prices North West | Rates from £50',
    description:
      'Transparent rates: Domestic EPC from £50, commercial EPC from £144, EICR from £110 across Manchester, Liverpool, Bolton & North West. Bulk discounts available.',
  },
}

export default function PricingPage() {
  const pricingData = [
    {
      service: 'Domestic EPC Certificate',
      href: '/domestic-epc',
      rate: 'From £50 (tiered by size — same day bookings available)',
      turnaround: 'Same Day / 24–48h Report',
      validity: '10 Years',
      badge: 'Most Popular',
      actionHref: '/booking',
      actionText: 'Book Now →',
    },
    {
      service: 'Commercial EPC Assessment',
      href: '/commercial-epc',
      rate: 'From £144 (Level 3 & 4 SBEM)',
      turnaround: '48–72 Hours',
      validity: '10 Years',
      badge: 'MEES Ready',
      actionHref: '/booking',
      actionText: 'Book Now →',
    },
    {
      service: 'Landlord EICR Safety Report',
      href: '/eicr',
      rate: 'From £110 (tiered by circuits)',
      turnaround: '24–48 Hours',
      validity: '5 Years (PRS Legal Rule)',
      badge: 'BS 7671 Certified',
      actionHref: '/booking',
      actionText: 'Book Now →',
    },
    {
      service: 'Landlord EPC + EICR Bundle',
      href: '/landlord-certificates',
      rate: 'Discounted Single-Visit Package',
      turnaround: '24–48 Hours',
      validity: '10 Yrs (EPC) / 5 Yrs (EICR)',
      badge: 'Best Value',
      actionHref: '/booking',
      actionText: 'Book Package →',
    },
    {
      service: 'Bulk & Portfolio EPC Orders',
      href: '/bulk-epc',
      rate: 'Custom Multi-Property Discount Quote',
      turnaround: 'Priority Portfolio Schedule',
      validity: '10 Years',
      badge: 'Volume Discount',
      actionHref: '/bulk-epc',
      actionText: 'Get Quote →',
    },
    {
      service: 'CAD Floor Plans & Lease Plans',
      href: '/floor-plans-drafting',
      rate: 'Quote on Request',
      turnaround: '24–48 Hours',
      validity: 'Marketing / Licensing Asset',
      badge: 'RICS GIA Measured',
      actionHref: '/floor-plans-drafting',
      actionText: 'Enquire →',
    },
    {
      service: 'BS 7671 Electrical Design',
      href: '/electrical-design',
      rate: 'Bespoke Project Quote',
      turnaround: 'Project Dependent',
      validity: 'Building Control Sign-Off',
      badge: 'Part P & L',
      actionHref: '/electrical-design',
      actionText: 'Enquire →',
    },
  ]

  return (
    <div className="min-h-screen font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]} />
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
            💷 Direct Surveyor Rates — No Middleman Agency Fees
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Transparent Property Compliance Pricing (Direct Assessor Rates)
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            Direct pricing for homeowners, landlords, estate agents, and commercial premises across Greater Manchester and a 50-mile radius.
          </p>
        </div>
      </section>

      {/* Semantic Pricing Table for Google SERP Table Snippets */}
      <section className="py-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#016837]">
              Complete Direct Rate Schedule
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#016837] text-white text-sm uppercase tracking-wider">
                    <th scope="col" className="p-4 rounded-tl-xl">Compliance Service</th>
                    <th scope="col" className="p-4">Direct Rate</th>
                    <th scope="col" className="p-4">Turnaround</th>
                    <th scope="col" className="p-4">Legal Validity</th>
                    <th scope="col" className="p-4 rounded-tr-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm md:text-base text-gray-800">
                  {pricingData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">
                        <Link href={row.href} className="hover:text-[#016837] underline underline-offset-2">
                          {row.service}
                        </Link>
                        <span className="block text-xs font-semibold text-[#80C531] mt-0.5">{row.badge}</span>
                      </td>
                      <td className="p-4 font-bold text-[#016837] whitespace-nowrap">{row.rate}</td>
                      <td className="p-4 whitespace-nowrap">{row.turnaround}</td>
                      <td className="p-4">{row.validity}</td>
                      <td className="p-4 text-right">
                        <Link
                          href={row.actionHref}
                          className="bg-[#016837] hover:bg-[#01572E] text-white font-bold py-2 px-4 rounded-lg text-xs md:text-sm whitespace-nowrap shadow transition-all inline-block"
                        >
                          {row.actionText}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              * Domestic EPC rates start from £50 for standard apartments and terraced homes, tiered by bedrooms, square metres, and extensions (same day bookings available). Commercial EPCs start from £144 for Level 3 properties. Landlord EICRs start from £110 for standard consumer units. Bulk EPCs are priced via tailored volume discounts. All prices exclude third-party brokerage commissions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#016837] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book with Your Local Surveyor?</h2>
          <p className="text-white/80 mb-8">Official register lodgement within 24 to 48 hours across Greater Manchester.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[#80C531] hover:bg-[#72b329] text-gray-950 font-bold px-8 py-4 rounded-lg shadow-lg transition-all">
              Book Assessment Now →
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

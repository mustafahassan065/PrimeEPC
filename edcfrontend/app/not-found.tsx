import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found | Prime EPC',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="py-24 text-center container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-[#016837] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page not found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved. Explore our popular energy assessment and safety services below:
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <Link
          href="/domestic-epc"
          className="bg-[#016837] text-white px-5 py-2.5 rounded-lg hover:bg-[#01572E] transition-colors"
        >
          Domestic EPC (From £50)
        </Link>
        <Link
          href="/eicr"
          className="bg-white border-2 border-[#016837] text-[#016837] px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Landlord EICR (From £110)
        </Link>
        <Link
          href="/epc-near-me"
          className="bg-[#80C531] text-gray-950 px-5 py-2.5 rounded-lg hover:bg-[#72b329] transition-colors"
        >
          EPC Near Me
        </Link>
        <Link
          href="/areas-we-serve"
          className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Areas We Serve
        </Link>
        <Link
          href="/booking"
          className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors"
        >
          Book Assessment Now →
        </Link>
      </div>
    </section>
  )
}
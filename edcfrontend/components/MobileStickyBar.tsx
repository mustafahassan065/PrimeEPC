import Link from 'next/link'

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-3 py-2.5">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href="tel:07308658247"
          className="flex-1 bg-[#016837] hover:bg-[#01572E] text-white font-bold py-3 px-3 rounded-lg text-center text-sm flex items-center justify-center gap-1.5 shadow-md transition-colors"
          aria-label="Call Now 07308658247"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call: 07308658247</span>
        </a>
        <Link
          href="/booking"
          className="flex-1 bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-3 px-3 rounded-lg text-center text-sm flex items-center justify-center gap-1.5 shadow-md transition-colors"
        >
          <span>Book Online £50</span>
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

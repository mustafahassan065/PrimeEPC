import Link from 'next/link'

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-3 py-2.5">
      <div className="flex items-center gap-2 max-w-md mx-auto">
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
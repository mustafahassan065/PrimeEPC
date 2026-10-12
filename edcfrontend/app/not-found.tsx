import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="py-24 text-center container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-[#016837] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page not found</h2>
      
    </section>
  )
}
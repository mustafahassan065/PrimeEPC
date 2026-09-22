'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const services = [
    { href: '/domestic-epc', label: 'Domestic EPC' },
    { href: '/commercial-epc', label: 'Commercial EPC' },
    { href: '/eicr', label: 'EICR' },
    { href: '/floor-plans-drafting', label: 'Floor Plans' },
    { href: '/pricing', label: 'Prices' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Topbar */}
      <div className="bg-[#016837] text-white py-2">
        <div className="container mx-auto px-4 md:px-12 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            {/* Phone — opens WhatsApp on click */}
            <a
              href="tel:+447308658247"
              className="hover:text-[#80C531] transition-colors duration-200"
            >
              📞 07308658247
            </a>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span>We serve areas within a 50-mile radius of Greater Manchester.</span>
          </div>
          <div className="hidden md:block">
            {/* Email — opens Gmail/mail client on click */}
            <a
              href="mailto:info@primeepcdesign.co.uk"
              className="hover:text-[#80C531] transition-colors duration-200"
            >
              📧 info@primeepcdesign.co.uk
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo3.png"
              alt="Prime EPC Logo"
              width={180}
              height={48}
              priority
              className="h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link href="/" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">Home</Link>
            <Link href="/about" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">About</Link>
            <Link href="/why-us" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">Why Us</Link>
            <div className="relative group">
              <button className="text-[#282828] hover:text-[#016837] font-medium text-sm xl:text-base whitespace-nowrap flex items-center gap-1" aria-haspopup="true">
                Services
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block bg-white shadow-xl rounded-xl py-2 w-48 z-50 border border-gray-100">
                {services.map((s) => (
                  <Link key={s.href} href={s.href} className="block px-4 py-2 text-sm text-[#282828] hover:bg-gray-50 hover:text-[#016837]">{s.label}</Link>
                ))}
              </div>
            </div>
            <Link href="/areas-we-serve" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">Areas We Serve</Link>
            <Link href="/floor-plans-drafting" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">Floor Plans & Drafting</Link>
            <Link href="/blog" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">Blog</Link>
            <Link href="/#faqs" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">FAQs</Link>
           
            <Link
              href="/booking"
              className="bg-[#016837] text-white px-4 py-2 rounded-lg hover:bg-[#01572E] transition-all duration-300 font-medium shadow-md hover:shadow-lg text-sm xl:text-base whitespace-nowrap flex-shrink-0"
            >
              Book Your EPC
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#282828]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#80C531] border-opacity-20">
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/" className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/about" className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/why-us" className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Why Us</Link>
              <div>
                <p className="text-[#282828] font-medium py-2">Services</p>
                <div className="pl-4 space-y-1">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} className="block text-[#282828] hover:text-[#016837] text-sm py-1" onClick={() => setIsMenuOpen(false)}>{s.label}</Link>
                  ))}
                </div>
              </div>
              <Link href="/areas-we-serve" className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Areas We Serve</Link>
              <Link href="/blog" className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link href="/#faqs" className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>FAQs</Link>
              <Link href="/#contact" className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link href="/booking" className="bg-[#016837] text-white px-6 py-3 rounded-lg hover:bg-[#01572E] transition-all duration-300 font-medium text-center shadow-md hover:shadow-lg" onClick={() => setIsMenuOpen(false)}>Book Your Assessment</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
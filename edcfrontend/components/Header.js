'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      {/* Topbar */}
      <div className="bg-[#016837] text-white py-2">
        <div className="container mx-auto px-4 md:px-12 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📞 +44 7469 340373</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span>We serve areas within a 50-mile radius of Manchester.</span>
          </div>
          <div className="hidden md:block">
            📧 primeepc.design@gmail.com
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
  <Image
    src="/images/logo3.png"
    alt="Prime EPC Logo"
    width={180}
    height={48}
    priority
    className="h-12 w-auto"
  />
</Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200">Home</Link>
            <Link href="/about" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200">About</Link>
            <Link href="/why-us" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200">Why Us</Link>
            <Link href="/floor-plans-drafting" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200">Floor Plans & Drafting</Link>
            <Link href="/blog" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200">Blog</Link>
            <Link href="/#faqs" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200">FAQs</Link>
            <Link href="/#contact" className="text-[#282828] hover:text-[#016837] font-medium transition-colors duration-200">Contact</Link>
            <Link 
              href="/booking" 
              className="bg-[#016837] text-white px-6 py-2 rounded-lg hover:bg-[#01572E] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Book Your EPC
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#282828]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#80C531] border-opacity-20">
            <div className="flex flex-col space-y-4 mt-4">
              <Link 
                href="/" 
                className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/why-us" 
                className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Us
              </Link>
              <Link 
                href="/blog" 
                className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/#faqs" 
                className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQs
              </Link>
              <Link 
                href="/#contact" 
                className="text-[#282828] hover:text-[#016837] font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/booking" 
                className="bg-[#016837] text-white px-6 py-3 rounded-lg hover:bg-[#01572E] transition-all duration-300 font-medium text-center shadow-md hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Your EPC
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
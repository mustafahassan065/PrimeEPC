"use client"

import Link from 'next/link'
import Image from 'next/image'

export default function WhyUs() {
  const features = [
    {
      icon: '⚡',
      title: 'Fast and Reliable Service',
      description: 'We know how important deadlines are, especially when you\'re selling, renting, or managing a property in Manchester. Our assessors deliver accurate EPC reports quickly often within 24 to 48 hours of inspection.',
      highlights: [
        '24-48 Hour Turnaround',
        'Quick Online Booking',
        'Fast Digital Delivery'
      ]
    },
    {
      icon: '💷',
      title: 'Affordable Pricing',
      description: 'We believe in fair and transparent pricing for Manchester property owners. With no hidden fees or surprise charges, you always know what you\'re paying for. Quality service shouldn\'t cost a fortune and with Prime EPC, it doesn\'t.',
      highlights: [
        'Transparent Pricing',
        'No Hidden Fees',
        'Competitive Manchester Rates'
      ]
    },
    {
      icon: '🏠',
      title: 'Certified Energy Assessors',
      description: 'All our Manchester-based assessors are fully qualified and accredited, following strict government guidelines to ensure every certificate is 100% compliant and reliable.',
      highlights: [
        'Fully Accredited',
        'Government Approved',
        'Quality Assured'
      ]
    },
    {
      icon: '📍',
      title: 'Manchester Coverage',
      description: 'We proudly serve customers across Greater Manchester and surrounding areas. Our local network ensures fast EPC services wherever you are in the Manchester region.',
      highlights: [
        'Greater Manchester Service',
        'Local Manchester Assessors',
        'Flexible Scheduling'
      ]
    },
    {
      icon: '🤝',
      title: 'Customer-Focused Approach',
      description: 'We\'re not just here to issue certificates we\'re here to help Manchester property owners. Our friendly team is always available to answer your questions and guide you through the EPC process from start to finish.',
      highlights: [
        'Personal Manchester Support',
        'Expert Guidance',
        'Friendly Local Service'
      ]
    },
    {
      icon: '💡',
      title: 'Trusted by Homeowners and Landlords',
      description: 'Over the years, we\'ve earned the trust of homeowners, estate agents, and landlords across Manchester. Our goal is simple to provide EPCs that are fast, fair, and fully dependable.',
      highlights: [
        'Proven Manchester Track Record',
        'Local Client Testimonials',
        'Manchester Industry Experience'
      ]
    }
  ]

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/whyusBg.jpg"
            alt="Why Us background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#80C531]/70 via-[#016837]/80 to-[#016837]/90"></div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#80C531]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#016837]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-white animate-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  MANCHESTER'S TRUSTED EPC PROVIDER
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Why Property Owners
                <span className="block text-white">
                   Choose Us
                </span>
              </h1>
              
              <p className="text-xl text-white opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Experience the difference with our professional, reliable, and customer-focused EPC services across Manchester. 
                We're committed to making your certification process smooth, fast, and stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ WHY WE'RE DIFFERENT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Why Property Owners Trust Prime EPC</h2>
            <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
              We combine professional expertise with exceptional customer service to deliver the best EPC experience in Manchester
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 group hover:border-[#016837] transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg mb-6">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#282828] mb-4">{feature.title}</h3>
                  <p className="text-[#282828] opacity-90 mb-6 leading-relaxed flex-grow">{feature.description}</p>
                  
                  <div className="space-y-3">
                    {feature.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[#282828]">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-[#E1EED4] to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                📊 OUR IMPACT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Trusted by Property Professionals</h2>
              <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
                Numbers that speak to our commitment to quality and customer satisfaction in Manchester
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '24-48h', label: 'Average Turnaround' },
                { number: '100%', label: 'Customer Satisfaction' },
                { number: '100%', label: 'Compliance Rate' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold text-[#016837] mb-3">{stat.number}</div>
                    <div className="text-[#282828] font-semibold text-lg">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-green-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              READY TO GET STARTED
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">Ready to Get Your EPC Certificate?</h2>
          
          <p className="text-xl text-white opacity-90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join thousands of satisfied property owners across Manchester who trust Prime EPC for their energy certification needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/contact" 
              className="bg-white hover:from-[#01572E] hover:to-[#70B52B] text-[#016837] font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 group text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Contact Us Today</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              href="/booking" 
              className="bg-gradient-to-r from-[#80C531] to-[#9CD35A] hover:from-[#70B52B] hover:to-[#80C531] text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 group text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Book Your EPC</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-3xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold mb-8 text-white">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-[#016837]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#80C531] font-semibold text-lg mb-1">Phone</p>
                  <p className="text-white font-bold text-xl">+44 7469 340373</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-[#016837]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#80C531] font-semibold text-lg mb-1">Email</p>
                  <p className="text-white font-bold text-lg">primeepc.design@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
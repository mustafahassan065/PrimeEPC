"use client"

import Link from 'next/link'

export default function FloorPlansAndDrafting() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section with Background Image */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#016837] via-[#01572E] to-[#014523]"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#80C531]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#016837]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    PROFESSIONAL DRAFTING SERVICES
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Precision in 
                  <span className="block text-white">Every Line</span>
                </h1>
                
                <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
                  At Prime EPC & Design Firm, we transform property surveys into high-accuracy floor plans, lease plans, and architectural drafts. Presentation and compliance, handled in one go.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    href="/#contact" 
                    className="bg-white hover:from-[#01572E] hover:to-[#70B52B] text-[#016837] font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-3 group text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Request a Quote</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link 
                    href="#services" 
                    className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg text-center"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>

              {/* Floor Plan Preview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {/* Floor Plan SVG */}
                    <svg className="w-full h-full p-4" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="20" y="20" width="360" height="260" fill="#f8fafc" stroke="#016837" strokeWidth="3"/>
                      <rect x="20" y="20" width="180" height="140" fill="none" stroke="#016837" strokeWidth="2"/>
                      <rect x="200" y="20" width="180" height="100" fill="none" stroke="#016837" strokeWidth="2"/>
                      <rect x="200" y="120" width="90" height="80" fill="none" stroke="#016837" strokeWidth="2"/>
                      <rect x="290" y="120" width="90" height="80" fill="none" stroke="#016837" strokeWidth="2"/>
                      <rect x="20" y="160" width="120" height="120" fill="none" stroke="#016837" strokeWidth="2"/>
                      <rect x="140" y="200" width="60" height="80" fill="none" stroke="#016837" strokeWidth="2"/>
                      <path d="M80 160 L80 175 Q95 175 95 160" fill="none" stroke="#80C531" strokeWidth="2"/>
                      <path d="M200 70 L200 85 Q215 85 215 70" fill="none" stroke="#80C531" strokeWidth="2"/>
                      <path d="M245 120 L245 135 Q260 135 260 120" fill="none" stroke="#80C531" strokeWidth="2"/>
                      <path d="M335 120 L335 135 Q350 135 350 120" fill="none" stroke="#80C531" strokeWidth="2"/>
                      <text x="100" y="95" fontSize="12" fill="#016837" textAnchor="middle" fontWeight="500">Living Room</text>
                      <text x="290" y="70" fontSize="11" fill="#016837" textAnchor="middle" fontWeight="500">Kitchen</text>
                      <text x="245" y="165" fontSize="10" fill="#016837" textAnchor="middle" fontWeight="500">Bath</text>
                      <text x="335" y="165" fontSize="10" fill="#016837" textAnchor="middle" fontWeight="500">WC</text>
                      <text x="80" y="225" fontSize="11" fill="#016837" textAnchor="middle" fontWeight="500">Bedroom 1</text>
                    </svg>
                    
                    {/* Floating Tags */}
                    <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-float">
                      <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                      <span className="text-sm font-semibold text-[#016837]">RICS Compliant</span>
                    </div>
                    <div className="absolute bottom-20 left-4 bg-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
                      <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                      <span className="text-sm font-semibold text-[#016837]">24-48hr Delivery</span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-float" style={{ animationDelay: '2s' }}>
                      <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                      <span className="text-sm font-semibold text-[#016837]">5-Star Rated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-gradient-to-b from-[#F8F8F8] to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2,500+', label: 'Drawings Delivered' },
              { number: '99%', label: 'Land Registry Acceptance' },
              { number: '24hr', label: 'Standard Turnaround' },
              { number: '4.9/5', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#016837] mb-3">{stat.number}</div>
                <div className="text-[#282828] opacity-90 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🛠️ OUR CORE SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Floor Plans & Technical Drafting</h2>
            <p className="text-xl text-[#282828] opacity-90 max-w-3xl mx-auto">
              Whether you are an Estate Agent needing marketing plans or a Landlord requiring compliant lease plans, we provide the architectural precision your property deserves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '📐',
                title: 'Marketing Floor Plans',
                description: 'Enhance your property listings with clear, professional visuals. We convert sketches and site surveys into engaging floor plans that help buyers visualize the space.',
                features: [
                  'Standard 2D & Premium 3D',
                  'Agency Branding Applied',
                  'Room Dimensions & Total Sq Ft',
                  'Ideal for Rightmove / Zoopla'
                ]
              },
              {
                icon: '📄',
                title: 'Compliant Lease Plans',
                description: 'Leasehold transactions require strict adherence to Land Registry Practice Guide 40. We take the stress out of compliance with rejection-free guarantees.',
                features: [
                  '1:1250 / 1:500 Scales',
                  'Red-Line Boundary Edging',
                  'North Points & Orientation',
                  'Legal Pack Ready'
                ]
              },
              {
                icon: '🏗️',
                title: 'Architectural Drafting',
                description: 'Support for architects, developers, and property managers. We digitize old blueprints and hand sketches into fully editable formats.',
                features: [
                  'Paper-to-CAD Conversion',
                  'Space Planning & Layouts',
                  'HMO Conversion Plans',
                  '.DWG / .DXF File Delivery'
                ]
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 group hover:border-[#016837] transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#282828] mb-3">{service.title}</h3>
                  </div>
                </div>
                
                <p className="text-[#282828] opacity-90 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-[#80C531]/20 to-[#80C531]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-[#016837]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium text-[#282828]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-green-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                📝 THE WORKFLOW
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Prime Process</h2>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
              From survey to submission in four simple steps.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Process Line */}
              
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Book Your Survey',
                    description: 'Schedule a combined visit. We can perform your EPC assessment and Floor Plan survey in a single appointment.'
                  },
                  {
                    step: '02',
                    title: 'Technical Drafting',
                    description: 'Our technicians convert the laser measurements into precise CAD drawings using industry-standard software.'
                  },
                  {
                    step: '03',
                    title: 'Review & Refine',
                    description: 'We send you the draft for approval. Need a room label changed? We offer unlimited revisions until it\'s perfect.'
                  },
                  {
                    step: '04',
                    title: 'Fast Delivery',
                    description: 'Receive your final high-resolution files (PDF, JPG, or DWG) within 24-48 hours, ready for market.'
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center relative">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-2xl text-[#016837] mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <span className="text-3xl font-bold">{step.step}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-white/80 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  💎 THE PRIME ADVANTAGE
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">The Prime Advantage</h2>
                <p className="text-xl text-[#282828] opacity-90 mb-8 leading-relaxed">
                  We are not just a drafting service; we are property compliance experts. By integrating design with our core EPC services, we offer a seamless solution for UK property professionals.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: '🏢',
                      title: 'Integrated Site Visits',
                      description: 'One appointment for both your EPC and Floor Plan survey—saving time for landlords and tenants.'
                    },
                    {
                      icon: '⚡',
                      title: 'Speed & Precision',
                      description: 'Drafts returned rapidly without sacrificing accuracy, using advanced laser measurement technology.'
                    },
                    {
                      icon: '💰',
                      title: 'Transparent Pricing',
                      description: 'Fixed prices with no hidden costs, plus volume discounts for regular agency clients.'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-3xl shadow-lg border border-[#80C531]/20 hover:shadow-xl transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl text-white flex-shrink-0 shadow-lg">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-[#282828] mb-3">{benefit.title}</h4>
                        <p className="text-[#282828] opacity-90 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showcase Card */}
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white shadow-lg">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold mb-4">100%</div>
                  <div className="text-2xl font-semibold mb-8">Compliance Guarantee for Lease Plans</div>
                  
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <span className="bg-white/20 px-6 py-3 rounded-full text-lg font-semibold">RICS Certified</span>
                    <span className="bg-white/20 px-6 py-3 rounded-full text-lg font-semibold">UK Based Team</span>
                    <span className="bg-white/20 px-6 py-3 rounded-full text-lg font-semibold">Verified</span>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-8">
                    <h4 className="text-xl font-bold mb-4">Key Benefits</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        <span>Land Registry Approved</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        <span>No Rejection Guarantee</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        <span>Fast Turnaround</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#F8F8F8] via-white to-[#E1EED4]/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 text-center">
              <h2 className="text-4xl font-bold text-[#282828] mb-6">Get Your Property "Market Ready"</h2>
              <p className="text-xl text-[#282828] opacity-90 mb-8 max-w-2xl mx-auto">
                Discuss your project with our design team or book a combined EPC & Floor Plan survey today. Quotes delivered within 2 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-white hover:from-[#01572E] hover:to-[#70B52B] text-[#282828] border border-[#282828] font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 group transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                  <span>Request a Quote</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a 
                  href="tel:+447469340373" 
                  className="bg-gradient-to-r from-[#016837] to-[#80C531] text-white font-bold py-4 px-8 rounded-lg border border-[#016837] hover:border-[#016837] transition-all duration-300 shadow-lg hover:shadow-xl text-center text-lg flex items-center justify-center gap-3 group"
                >
                  <span>Call Design Team</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
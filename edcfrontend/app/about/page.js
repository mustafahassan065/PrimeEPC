'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative py-34 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/aboutbg.jpg")'
          }}
        />
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
                  ABOUT PRIME EPC
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block text-white">
                 About Us
                </span>
              </h1>
              
              <p className="text-xl text-white opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Your trusted partner for professional Energy Performance Certificates and design consultancy services across Manchester.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Description Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🏢 OUR COMPANY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Who We Are</h2>
              <p className="text-xl text-[#282828] opacity-90 max-w-3xl mx-auto">
                Making energy certification accessible, affordable, and easy for everyone in Manchester
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Mission & Vision */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#282828]">Our Mission</h3>
                  </div>
                  <p className="text-[#282828] opacity-90 leading-relaxed">
                    To make energy certification accessible, affordable, and easy for everyone in Manchester. We aim to help property owners make smarter energy choices that benefit both their finances and the environment.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white shadow-lg">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-[#016837]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    To build a greener and more energy-efficient future where every home and business in Manchester contributes to a sustainable Britain. Through honesty, innovation, and dedication, we strive to become Manchester's most trusted name in EPC services.
                  </p>
                </div>
              </div>

              {/* Company Description */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-3 h-3 bg-[#80C531] rounded-full"></div>
                  <h3 className="text-2xl font-bold text-[#282828]">Professional EPC Services</h3>
                </div>
                <div className="space-y-6">
                  <p className="text-[#282828] opacity-90 leading-relaxed">
                    At <strong className="text-[#016837]">Prime EPC and Design Consultants</strong>, we make getting your <strong className="text-[#016837]">Energy Performance Certificate (EPC)</strong> simple, fast, and stress-free. We are a team of certified energy assessors providing reliable EPC services to <strong className="text-[#016837]">homeowners, landlords, estate agents, and property managers</strong> across Manchester.
                  </p>
                  <p className="text-[#282828] opacity-90 leading-relaxed">
                    With years of experience and a strong focus on customer satisfaction, we ensure every EPC inspection is carried out with accuracy, honesty, and professionalism. Whether you need a domestic or commercial EPC, our assessors deliver quick turnaround times and fully compliant certificates you can trust.
                  </p>
                  <p className="text-[#282828] opacity-90 leading-relaxed">
                    We believe every property owner deserves clear information and professional service at an affordable price. Your convenience is our priority, and we're committed to providing a smooth, professional, and transparent service from start to finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Features */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ WHAT SETS US APART
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">What Sets Us Apart</h2>
            <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
              Experience the difference with our professional, reliable, and efficient EPC services
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🚀',
                  title: 'Fast & Hassle-Free EPC',
                  description: 'Quick and professional EPC assessments with minimal disruption to your schedule.',
                  features: ['Quick Inspection', 'Minimal Disruption', 'Efficient Process']
                },
                {
                  icon: '💷',
                  title: 'Competitive Pricing',
                  description: 'Affordable rates with no hidden fees - quality service that doesn\'t cost a fortune.',
                  features: ['No Hidden Fees', 'Price Match', 'Transparent Quotes']
                },
                {
                  icon: '🏆',
                  title: 'Qualified Assessors',
                  description: 'Fully accredited and insured energy assessors following strict government guidelines.',
                  features: ['Fully Accredited', 'Regular Training', 'Quality Standards']
                },
                {
                  icon: '📍',
                  title: 'Manchester Coverage',
                  description: 'Proudly serving customers across Manchester for both domestic and commercial properties.',
                  features: ['Nationwide Service', 'Flexible Scheduling', 'Local Experts']
                },
                {
                  icon: '🤝',
                  title: 'Friendly Support',
                  description: 'Dedicated customer support team always available to answer your questions.',
                  features: ['24/7 Support', 'Quick Responses', 'Expert Advice']
                },
                {
                  icon: '📄',
                  title: 'Quick Certificates',
                  description: 'Receive your EPC certificate within 24-48 hours after inspection.',
                  features: ['Fast Turnaround', 'Digital Delivery', 'Online Tracking']
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#282828] mb-4 text-center">{feature.title}</h3>
                  <p className="text-[#282828] opacity-90 mb-6 leading-relaxed text-center">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[#282828] justify-center">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-br from-[#F8F8F8] via-white to-[#E1EED4]/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                💎 OUR COMMITMENT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Our Commitment to Excellence</h2>
              <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
                The principles that guide everything we do at Prime EPC
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Accuracy',
                  description: 'Precise assessments and reliable certificates you can trust.',
                  color: 'from-[#016837] to-[#80C531]'
                },
                {
                  icon: '⚡',
                  title: 'Efficiency',
                  description: 'Quick service without compromising on quality or compliance.',
                  color: 'from-[#016837] to-[#80C531]'
                },
                {
                  icon: '🤝',
                  title: 'Integrity',
                  description: 'Honest, transparent service with no hidden surprises.',
                  color: 'from-[#016837] to-[#80C531]'
                },
                {
                  icon: '🌱',
                  title: 'Sustainability',
                  description: 'Helping create a greener, more energy-efficient Manchester.',
                  color: 'from-[#016837] to-[#80C531]'
                }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20 hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-2xl text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#282828] mb-4">{value.title}</h3>
                  <p className="text-[#282828] opacity-90 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-green-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              READY TO GET STARTED
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Get Your EPC Certificate?
          </h2>
          
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
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
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
"use client"

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/contact/send-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setFormSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormSuccess(false)
        }, 5000)
      } else {
        alert('Failed to send message: ' + data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Network error. Please try again.')
    } finally {
      setFormLoading(false)
    }
  }

  const faqs = [
    {
      question: 'What is an EPC and why is it needed?',
      answer: 'An Energy Performance Certificate shows how energy efficient a property is and its estimated energy costs. It\'s legally required in the UK when you sell, rent or build a new property.'
    },
    {
      question: 'How long is an EPC valid for?',
      answer: 'An EPC is valid for 10 years from issue. After that, if you\'re selling or renting, you need a new one.'
    },
    {
      question: 'How long does an EPC assessment take?',
      answer: 'Usually between 30 to 60 minutes for domestic properties, depending on size and complexity.'
    },
    {
      question: 'Can I use the same EPC for selling and renting my property?',
      answer: 'Yes, as long as the EPC is still valid (within 10 years), you can use the same certificate for both renting and selling purposes.'
    },
    {
      question: 'Does improving my EPC rating increase property value?',
      answer: 'Definitely. A higher EPC rating often attracts buyers and tenants because it means lower energy bills and better comfort — increasing your property\'s market appeal.'
    },
    {
      question: 'Can I get an EPC for a commercial property?',
      answer: 'Yes. Commercial buildings also require EPCs when sold or rented, but the assessment criteria differ slightly from domestic properties.'
    },
    {
      question: 'Do new builds automatically have EPCs?',
      answer: 'Yes. Every new build in the UK must have an EPC before completion — it\'s arranged by the builder or developer before the property is listed.'
    },
    {
      question: 'What is the difference between an EPC and a Home Energy Report?',
      answer: 'An EPC is an official government certificate, while a Home Energy Report provides more detailed advice and data to help you plan improvements.'
    },
    {
      question: 'How much does an EPC cost?',
      answer: 'The cost depends on property size, type, and location. It can vary widely, but a normal domestic EPC is usually modest — contact us for a quote.'
    },
    {
      question: 'Who can issue an EPC?',
      answer: 'Only accredited energy assessors approved under UK schemes can issue valid EPCs. Assessors must follow government standards.'
    },
    {
      question: 'What property details are checked during an EPC?',
      answer: 'The assessor checks things like wall/roof/floor insulation, heating systems, windows, lighting, and size/floor area of the property.'
    },
    {
      question: 'Where can I find out if a property already has an EPC?',
      answer: 'You can search the EPC Register (UK government site) by address or postcode to see if there\'s a valid certificate.'
    },
    {
      question: 'What happens if I don\'t get an EPC when required?',
      answer: 'You may face legal penalties, fines, or delays in selling or renting the property. It\'s also non-compliance with UK regulations.'
    },
    {
      question: 'Can improvements change the EPC rating?',
      answer: 'Yes — implementing recommended upgrades like insulation, double-glazing, or more efficient heating can improve your EPC rating.'
    },
    {
      question: 'Can I refuse to improve my property even if recommendations are made?',
      answer: 'Yes, it\'s voluntary. Recommendations are suggestions, not mandatory unless required by law or specific local rules. But ignoring them may mean higher energy bills.'
    },
    {
      question: 'Do rented properties have to meet a minimum EPC rating?',
      answer: 'Yes — under UK law, rented properties must meet Minimum Energy Efficiency Standards (MEES). For many, the minimum rating is E or above.'
    },
    {
      question: 'What if my property is exempt?',
      answer: 'Some properties, like listed buildings, very small buildings, or temporary structures, may be exempt from EPC requirements. Always check with local authority.'
    },
    {
      question: 'Is an EPC required before advertising a property for sale or rent?',
      answer: 'Yes — legally, you must have a valid EPC before marketing your property for sale or rent.'
    },
    {
      question: 'Is the EPC only about energy bills?',
      answer: 'No — while it estimates energy costs, it also shows carbon emissions and suggests improvements for comfort, property value, and environmental impact.'
    },
    {
      question: 'How do I know if my EPC is genuine?',
      answer: 'Check the EA reference number on the certificate — you can verify it on the official EPC Register using that number. If missing or incorrect, contact the issuing assessor or accreditation scheme.'
    }
  ]

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section with Background Image */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg.avif"
            alt="Hero background"
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
                  TRUSTED EPC PROVIDERS Manchester-WIDE
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Energy Performance
                <span className="block text-white">
                  Certificates
                </span>
              </h1>
              
              <p className="text-xl text-white opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Get your EPC within <span className="font-bold text-[#80C531]">24-48 hours</span>. Fully accredited assessors providing professional, stress-free certification across the Manchester.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-white hover:from-[#01572E] hover:to-[#70B52B] text-[#016837] font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-3 group text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Book Your EPC Today</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is EPC Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                📋 UNDERSTANDING EPC
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">What is an Energy Performance Certificate?</h2>
              <p className="text-xl text-[#282828] opacity-90 max-w-3xl mx-auto">
                Your complete guide to understanding EPCs and why they're essential for your property
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20">
                  <p className="text-lg text-[#282828] leading-relaxed mb-6">
                    An <strong className="text-[#016837]">Energy Performance Certificate (EPC)</strong> is a legal requirement that shows how energy-efficient your property is. It provides an energy efficiency rating from <strong className="text-[#016837]">A (most efficient)</strong> to <strong className="text-[#016837]">G (least efficient)</strong>, along with practical recommendations for improvement.
                  </p>
                  
                  <div className="bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/5 border border-[#80C531]/30 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-[#016837] mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Why You Need an EPC
                    </h4>
                    <ul className="text-[#016837] space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        Legal requirement for selling or renting property
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        Valid for 10 years from issue date
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        Helps attract buyers/tenants with better ratings
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                        Identifies cost-saving energy improvements
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Rating Visualization */}
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">EPC Rating Scale</h3>
                
                <div className="space-y-4 mb-6">
                  {[
                    { grade: 'A', color: 'from-green-400 to-green-500', label: 'Most Efficient', score: '92-100', width: '100%' },
                    { grade: 'B', color: 'from-green-300 to-green-400', label: 'Very Efficient', score: '81-91', width: '85%' },
                    { grade: 'C', color: 'from-lime-300 to-lime-400', label: 'Good', score: '69-80', width: '70%' },
                    { grade: 'D', color: 'from-yellow-300 to-yellow-400', label: 'Average', score: '55-68', width: '55%' },
                    { grade: 'E', color: 'from-amber-300 to-amber-400', label: 'Fair', score: '39-54', width: '40%' },
                    { grade: 'F', color: 'from-orange-400 to-orange-500', label: 'Poor', score: '21-38', width: '25%' },
                    { grade: 'G', color: 'from-red-400 to-red-500', label: 'Least Efficient', score: '1-20', width: '10%' }
                  ].map((item, index) => (
                    <div key={item.grade} className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg`}>
                        {item.grade}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold">{item.label}</span>
                          <span className="text-green-200 text-sm">{item.score} SAP</span>
                        </div>
                        <div className="w-full bg-green-900 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: item.width }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center text-white/80 text-sm">
                  SAP Score = Standard Assessment Procedure
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⭐ WHY CHOOSE US
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Why Property Owners Choose Prime EPC</h2>
            <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
              Experience the difference with our professional, reliable, and efficient EPC services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🚀',
                title: 'Lightning Fast Service',
                description: 'Get your EPC report within 24-48 hours of inspection with our streamlined process',
                features: ['24-48 Hour Turnaround', 'Quick Online Booking', 'Fast Digital Delivery']
              },
              {
                icon: '🏆',
                title: 'Fully Accredited Experts',
                description: 'Our assessors are fully qualified and accredited, following all government standards',
                features: ['Government Approved', 'Regularly Trained', 'Quality Assured']
              },
              {
                icon: '📍',
                title: 'Manchester Coverage',
                description: 'Proudly serving customers across the Manchester for both domestic and commercial properties',
                features: ['Nationwide Service', 'Flexible Scheduling', 'Local Assessors']
              },
              {
                icon: '💷',
                title: 'Transparent Pricing',
                description: 'Clear, competitive pricing with no hidden fees or surprise charges',
                features: ['Price Match Guarantee', 'No Hidden Costs', 'Instant Quotes']
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-white group hover:border-[#80C531] transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#282828] mb-3">{feature.title}</h3>
                    <p className="text-[#282828] opacity-90 mb-4 leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[#282828]">
                          <div className="w-2 h-2 bg-[#80C531] rounded-full"></div>
                          <span className="text-sm font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-24 bg-gradient-to-br from-[#F8F8F8] via-white to-[#E1EED4]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📝 HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Get Your EPC in 3 Simple Steps</h2>
            <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
              Our streamlined process makes getting your Energy Performance Certificate quick and hassle-free
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Process Line */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#016837] via-[#80C531] to-[#016837] -z-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '01',
                    icon: '📞',
                    title: 'Book Your Assessment',
                    description: 'Contact us via phone, email, or online form to schedule your EPC inspection at your convenience.',
                    details: ['Free Instant Quote', 'Flexible Scheduling', 'Online Booking Available']
                  },
                  {
                    step: '02',
                    icon: '🏠',
                    title: 'Property Inspection',
                    description: 'Our accredited assessor visits your property for a comprehensive 30-60 minute inspection.',
                    details: ['Professional Assessment', 'Minimal Disruption', 'Comprehensive Check']
                  },
                  {
                    step: '03',
                    icon: '📄',
                    title: 'Receive Certificate',
                    description: 'Get your official EPC digitally within 24-48 hours, with physical copies available.',
                    details: ['Digital Delivery', '24-48 Hour Turnaround', 'Lodged on National Register']
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center relative">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl text-white mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <span className="text-3xl">{step.icon}</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-[#80C531] to-[#9CD35A] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#282828] mb-4">{step.title}</h3>
                    <p className="text-[#282828] opacity-90 mb-6 leading-relaxed">{step.description}</p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-[#282828]">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-full"></div>
                          <span className="text-sm font-semibold">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-gradient-to-r from-white to-[#F8F8F8] rounded-3xl p-8 shadow-lg border border-[#80C531]/20 text-center">
              <h3 className="text-2xl font-bold text-[#282828] mb-4">Ready to Start the Process?</h3>
              <p className="text-[#282828] opacity-90 mb-6 max-w-2xl mx-auto">
                Get your EPC certificate quickly and professionally. Contact us today for a free, no-obligation quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/booking" 
                  className="bg-gradient-to-r from-[#016837] to-[#80C531] hover:from-[#01572E] hover:to-[#70B52B] text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Book Assessment Now
                </Link>
                <Link 
                  href="#contact" 
                  className="bg-white text-[#282828] font-bold py-3 px-6 rounded-lg border border-[#80C531] hover:border-[#016837] transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Get Instant Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🛠️ OUR SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Comprehensive EPC Services</h2>
            <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
              Professional Energy Performance Certificates for all property types across the Manchester
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* EPC Services */}
            <div className="bg-gradient-to-br from-white to-[#F8F8F8] rounded-3xl p-8 shadow-lg border border-[#80C531]/20 group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#282828]">EPC Services</h3>
                  <p className="text-[#016837] font-semibold">From £49</p>
                </div>
              </div>
              
              <p className="text-[#282828] opacity-90 mb-6 leading-relaxed">
                We provide comprehensive Energy Performance Certificates for both domestic and commercial properties across the Manchester. 
                Every property transaction requires a valid EPC, and we ensure complete compliance with UK regulations.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Domestic EPCs',
                  'Commercial EPCs',
                  'New Build EPCs',
                  'Landlord EPCs',
                  'Property Sales EPCs',
                  'Rental Property EPCs'
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-[#F8F8F8] to-white rounded-xl p-3 shadow-sm border border-[#80C531]/10">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#80C531]/20 to-[#80C531]/10 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#016837]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-[#282828]">{service}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/booking" 
                className="w-full bg-gradient-to-r from-[#016837] to-[#80C531] hover:from-[#01572E] hover:to-[#70B52B] text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg text-center block"
              >
                Book EPC Service
              </Link>
            </div>

            {/* Design Consultancy */}
            <div className="bg-gradient-to-br from-white to-[#F8F8F8] rounded-3xl p-8 shadow-lg border border-[#80C531]/20 group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-[#80C531] to-[#9CD35A] rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#282828]">Design Consultancy</h3>
                  <p className="text-[#80C531] font-semibold">Expert Guidance</p>
                </div>
              </div>
              
              <p className="text-[#282828] opacity-90 mb-6 leading-relaxed">
                Strategic design consultancy isn't just an expense—it's an investment that pays for itself. 
                We provide expert guidance from concept to completion, ensuring your project achieves optimal efficiency and value.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Expert guidance from concept to completion',
                  'Save time and reduce project costs',
                  'Innovative sustainable design solutions',
                  'Compliance and safety assurance',
                  'Energy efficiency optimization',
                  'Cost-benefit analysis'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#80C531]/20 to-[#80C531]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#80C531]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-[#282828]">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href="#contact" 
                className="w-full bg-gradient-to-r from-white to-[#F8F8F8] text-[#282828] font-bold py-3 px-6 rounded-lg border border-[#80C531] hover:border-[#016837] transform hover:scale-105 transition-all duration-300 shadow-lg text-center block"
              >
                Learn More About Consultancy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faqs" className="py-24 bg-gradient-to-b from-[#F8F8F8] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ❓ FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-6">Common Questions About EPC</h2>
            <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">
              Find quick answers to the most frequently asked questions about Energy Performance Certificates
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-[#80C531]/10 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gradient-to-r from-[#F8F8F8] to-white transition-colors duration-200"
                  >
                    <h3 className="text-lg font-bold text-[#282828] pr-4">{faq.question}</h3>
                    <svg 
                      className={`w-5 h-5 text-[#016837] transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 pt-0 border-t border-[#80C531]/10">
                      <p className="text-[#282828] opacity-90 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ CTA */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                  Our team of EPC experts is here to help you with any questions about Energy Performance Certificates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="#contact" 
                    className="bg-white text-[#282828] font-bold py-3 px-6 rounded-lg hover:bg-[#F8F8F8] transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Contact Our Experts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - WHITE BACKGROUND */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern - Subtle Green Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23016837' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
              <span className="text-[#016837] text-sm font-semibold tracking-wide bg-[#80C531]/10 backdrop-blur-sm px-4 py-2 rounded-full">
                GET IN TOUCH TODAY
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-[#016837]">
              Contact Us
            </h2>
            
            <p className="text-xl text-[#282828] opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Ready to get your EPC or need expert design consultancy? Reach out to us for professional, stress-free service.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 shadow-lg border border-[#80C531]/20">
                <h3 className="text-3xl font-bold mb-8 text-white">Contact Information</h3>
                
                <div className="space-y-8 mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-[#016837]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#80C531] text-lg mb-1">Phone</h4>
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
                      <h4 className="font-semibold text-[#80C531] text-lg mb-1">Email</h4>
                      <p className="text-white font-bold text-lg">primeepc.design@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-[#016837]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#80C531] text-lg mb-1">Service Areas</h4>
                      <p className="text-white font-semibold text-lg">Manchester Coverage</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div>
                  <h4 className="font-semibold text-[#80C531] text-lg mb-6">Follow Us</h4>
                  <div className="flex gap-4">
                    {[
                      { 
                        name: 'Facebook', 
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        ), 
                        color: 'bg-blue-600 hover:bg-blue-700' 
                      },
                      { 
                        name: 'Twitter', 
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        ), 
                        color: 'bg-blue-400 hover:bg-blue-500' 
                      },
                      { 
                        name: 'LinkedIn', 
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        ), 
                        color: 'bg-blue-800 hover:bg-blue-900' 
                      },
                      { 
                        name: 'Instagram', 
                        icon: (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.2 14.816 3.71 13.665 3.71 12.368s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                          </svg>
                        ), 
                        color: 'bg-pink-600 hover:bg-pink-700' 
                      }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className={`w-14 h-14 ${social.color} rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form - WHITE BACKGROUND */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#80C531]/20">
                <h3 className="text-3xl font-bold mb-8 text-[#016837]">Send Us a Message</h3>
                
                {/* Success Message */}
                {formSuccess && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/5 border border-[#80C531] rounded-2xl text-[#016837]">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Message sent successfully! We'll get back to you within 24 hours.</span>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#016837] mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-[#F8F8F8] border border-[#80C531]/30 rounded-2xl focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#016837] mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-[#F8F8F8] border border-[#80C531]/30 rounded-2xl focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#016837] mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-[#F8F8F8] border border-[#80C531]/30 rounded-2xl focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                      placeholder="+44 XXX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-[#016837] mb-3">
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-[#F8F8F8] border border-[#80C531]/30 rounded-2xl focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828]"
                    >
                      <option value="" className="text-gray-800">Select a service</option>
                      <option value="domestic-epc" className="text-gray-800">Domestic EPC</option>
                      <option value="commercial-epc" className="text-gray-800">Commercial EPC</option>
                      <option value="design-consultancy" className="text-gray-800">Design Consultancy</option>
                      <option value="other" className="text-gray-800">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#016837] mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-[#F8F8F8] border border-[#80C531]/30 rounded-2xl focus:ring-2 focus:ring-[#80C531] focus:border-transparent transition-all duration-300 text-[#282828] placeholder-[#282828]/60"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-gradient-to-r from-[#016837] to-[#80C531] hover:from-[#01572E] hover:to-[#70B52B] text-white text-lg font-bold py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed border border-[#80C531]/30"
                  >
                    {formLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function BulkEpcPage() {
  const [form, setForm] = useState({
    propertyType: '',
    numberOfProperties: '',
    postcodes: '',
    name: '',
    email: '',
    phone: '',
    additionalInfo: '',
    agreed: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.primeepcdesign.co.uk'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agreed) { setError('Please agree to the privacy policy and terms.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/email/send-bulk-epc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError(data.message || 'Something went wrong. Please try again.')
    } catch {
      setError('Unable to submit. Please try again or call us directly.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen font-sans">

      {/* ── HERO ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/bg.avif" alt="Bulk EPC Orders Greater Manchester" fill priority fetchPriority="high" className="object-cover object-center" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#80C531]/70 via-[#016837]/80 to-[#016837]/90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#80C531]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#016837]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#80C531] rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-semibold tracking-wide bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">DISCOUNTED EPC ORDERS FOR LANDLORDS &amp; AGENTS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-white">Bulk EPC Orders</span>
              <span className="block text-[#80C531]">Save More, Order More</span>
            </h1>
            <p className="text-xl text-white opacity-90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Landlords, letting agents and property developers — get significant discounts on multiple EPCs across Greater Manchester and the North West. Fast turnaround, fully accredited assessors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#bulk-form" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">
                Request a Free Quote
              </a>
              <a href="tel:+447308658247" className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-xl transition-all">
                📞 07308 658247
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM — right after hero ── */}
      <section id="bulk-form" className="py-20 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">📦 BULK EPC ORDERS</div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#282828] mb-4">Request a Bulk EPC Quote</h2>
              <p className="text-xl text-[#282828] opacity-90 max-w-2xl mx-auto">Fill in the form and we will get back to you within 1 working day with a tailored quote and discounted pricing.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* FORM */}
              <div className="lg:col-span-2">
                {success ? (
                  <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-[#80C531]/20">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white text-4xl">✓</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#282828] mb-3">Quote Request Received!</h3>
                    <p className="text-[#282828] opacity-80 mb-2">Thank you <strong>{form.name}</strong>. We will get back to you within 1 working day with a tailored quote.</p>
                    <p className="text-sm text-gray-500">A confirmation has been sent to <strong>{form.email}</strong></p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">

                    {/* Property Details */}
                    <div>
                      <h3 className="font-bold text-[#282828] text-lg mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-lg flex items-center justify-center text-white text-sm">🏠</span>
                        Property Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#282828] mb-1.5">Type of properties *</label>
                          <select name="propertyType" value={form.propertyType} onChange={handleChange} required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#016837] transition-colors">
                            <option value="">Select property type</option>
                            <option value="domestic">Domestic (Houses/Flats)</option>
                            <option value="commercial">Commercial</option>
                            <option value="hmo">HMO</option>
                            <option value="mixed">Mixed (Domestic + Commercial)</option>
                            <option value="new-build">New Build</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#282828] mb-1.5">Number of properties *</label>
                          <input type="number" name="numberOfProperties" value={form.numberOfProperties} onChange={handleChange} required min="2"
                            placeholder="e.g. 10"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#016837] transition-colors"/>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-[#282828] mb-1.5">Postcode(s) / Areas</label>
                          <input type="text" name="postcodes" value={form.postcodes} onChange={handleChange}
                            placeholder="e.g. BL1, M14, SK3, Greater Manchester"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#016837] transition-colors"/>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Your Details */}
                    <div>
                      <h3 className="font-bold text-[#282828] text-lg mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-lg flex items-center justify-center text-white text-sm">👤</span>
                        Your Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#282828] mb-1.5">Full name *</label>
                          <input type="text" name="name" value={form.name} onChange={handleChange} required
                            placeholder="John Smith"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#016837] transition-colors"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#282828] mb-1.5">Email address *</label>
                          <input type="email" name="email" value={form.email} onChange={handleChange} required
                            placeholder="you@company.co.uk"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#016837] transition-colors"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#282828] mb-1.5">Phone number *</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                            placeholder="07123 456789"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#016837] transition-colors"/>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Additional Info */}
                    <div>
                      <h3 className="font-bold text-[#282828] text-lg mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-lg flex items-center justify-center text-white text-sm">📋</span>
                        Additional Information
                      </h3>
                      <textarea name="additionalInfo" value={form.additionalInfo} onChange={handleChange} rows={4}
                        placeholder="Any specific requirements? (e.g. floor plans needed, urgent turnaround, HMO licensing, etc.)"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#016837] transition-colors resize-none"/>
                      <p className="text-right text-xs text-gray-400 mt-1">{form.additionalInfo.length}/500</p>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                      <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange}
                        className="mt-1 w-4 h-4 accent-[#016837]" id="bulk-terms"/>
                      <label htmlFor="bulk-terms" className="text-sm text-[#282828] opacity-80">
                        I agree to the <Link href="/privacy" className="text-[#016837] underline hover:no-underline">privacy policy</Link> and <Link href="/terms" className="text-[#016837] underline hover:no-underline">terms of service</Link>.
                      </label>
                    </div>

                    {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

                    <button type="submit" disabled={loading}
                      className="w-full bg-gradient-to-r from-[#016837] to-[#80C531] hover:from-[#01572E] hover:to-[#70B52B] text-white font-bold py-4 rounded-xl text-sm transition-all disabled:opacity-50 shadow-lg">
                      {loading ? 'Submitting...' : '✈️ Request Bulk Quote →'}
                    </button>
                  </form>
                )}
              </div>

              {/* SIDEBAR */}
              <div className="space-y-5">
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl mb-4">🏠</div>
                  <h3 className="font-bold text-[#282828] text-lg mb-4">Why choose our Bulk EPC service?</h3>
                  <ul className="space-y-3">
                    {[
                      'Discounted rates for multiple properties',
                      'Fast turnaround (24-48hrs)',
                      'Fully accredited & experienced assessors',
                      'Nationwide coverage',
                      'Single point of contact',
                      'Simple, hassle-free process',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#282828] opacity-80">
                        <span className="w-5 h-5 bg-[#80C531]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#016837] font-bold text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#016837] to-[#014d28] rounded-3xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-3">🛡️ Need help?</h3>
                  <p className="text-white/80 text-sm mb-4">Call us or email us — we will be happy to discuss your requirements.</p>
                  <a href="tel:+447308658247" className="flex items-center gap-2 text-[#80C531] font-bold text-sm mb-3 hover:underline">
                    📞 07308 658247
                  </a>
                  <a href="mailto:info@primeepcdesign.co.uk" className="flex items-center gap-2 text-[#80C531] font-bold text-sm hover:underline">
                    ✉️ info@primeepcdesign.co.uk
                  </a>
                </div>

                <div className="bg-gradient-to-r from-[#80C531]/10 to-[#016837]/10 rounded-3xl p-6 border border-[#80C531]/20 text-center">
                  <p className="text-2xl font-black text-[#282828] mb-1">More properties?</p>
                  <p className="text-[#016837] font-bold text-xl">More savings! 🌿</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── WHY BULK ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">✅ WHY CHOOSE US</div>
              <h2 className="text-4xl font-bold text-[#282828] mb-4">Why Choose Bulk EPC with Prime EPC?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '💰', title: 'Discounted Rates', desc: 'The more properties you book, the more you save. Significant discounts available for multiple properties.' },
                { icon: '⚡', title: 'Fast Turnaround', desc: 'Certificates delivered within 24-48 hours of inspection. Multiple properties can be scheduled on the same day.' },
                { icon: '📋', title: 'Single Point of Contact', desc: 'One dedicated contact manages all your properties — no chasing multiple assessors.' },
                { icon: '✅', title: 'Fully Accredited', desc: 'All our assessors are Quidos-accredited. Certificates lodged on the national EPC register.' },
                { icon: '🗺️', title: 'Wide Coverage', desc: 'Greater Manchester, Lancashire, Cheshire, Merseyside and the wider North West.' },
                { icon: '🏢', title: 'All Property Types', desc: 'Domestic, commercial, HMO, new build — all property types in a single order.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#F8F8F8] rounded-2xl p-6 hover:shadow-lg transition-all border border-transparent hover:border-[#80C531]/30">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center text-2xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-[#282828] text-lg mb-2">{item.title}</h3>
                  <p className="text-[#282828] opacity-70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className="py-20 bg-gradient-to-b from-[#F8F8F8] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">👥 WHO IS IT FOR</div>
              <h2 className="text-4xl font-bold text-[#282828] mb-4">Who is Bulk EPC For?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🏠', title: 'Landlords', desc: 'Managing multiple rental properties and need MEES-compliant EPCs before the 2030 deadline.' },
                { icon: '🏢', title: 'Letting Agents', desc: 'Handling EPCs for your entire portfolio of managed properties efficiently.' },
                { icon: '🏗️', title: 'Property Developers', desc: 'New build completions or conversions requiring multiple EPCs at once.' },
                { icon: '🏦', title: 'Housing Associations', desc: 'Social housing providers with large property portfolios needing compliance.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:border-[#016837] hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-[#282828] mb-2">{item.title}</h3>
                  <p className="text-[#282828] opacity-70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#80C531]/10 to-[#80C531]/20 text-[#016837] px-4 py-2 rounded-full text-sm font-semibold mb-4">🔄 HOW IT WORKS</div>
              <h2 className="text-4xl font-bold text-[#282828] mb-4">Simple 4-Step Process</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', icon: '📝', title: 'Submit your quote request', desc: 'Fill in the form above with your property details.' },
                { step: '02', icon: '💬', title: 'Receive your tailored quote', desc: 'We confirm pricing and scheduling within 1 working day.' },
                { step: '03', icon: '🏠', title: 'Assessors visit properties', desc: 'Multiple properties scheduled on the same day where possible.' },
                { step: '04', icon: '📜', title: 'Receive all certificates', desc: 'All EPCs lodged on the register and emailed within 24-48 hours.' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#016837] to-[#80C531] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-black text-xl">{s.step}</span>
                  </div>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <h3 className="font-bold text-[#282828] mb-2 text-sm">{s.title}</h3>
                  <p className="text-[#282828] opacity-60 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#016837] to-[#014d28]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#80C531]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#80C531]/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Order Bulk EPCs?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Get discounted rates · One point of contact · 24-48h turnaround</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#bulk-form" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg">
              Request a Free Quote
            </a>
            <a href="tel:+447308658247" className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-xl transition-all">
              📞 07308 658247
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
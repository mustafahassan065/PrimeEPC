"use client"

import { useState } from 'react'
import Link from 'next/link'

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
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
      setError('Unable to submit. Please try again or call us.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#016837] to-[#014d28] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">Home</Link>
            <span className="text-white/50">›</span>
            <span>Bulk EPC Orders</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Bulk EPC Orders — Discounted Rates for Multiple Properties
          </h1>
          <p className="text-lg text-white/90 mb-6 max-w-2xl">
            Are you a landlord, letting agent or property developer with multiple properties?
            We offer significant discounts on bulk EPC orders across Greater Manchester and the North West.
            Fast turnaround, fully accredited assessors, one point of contact.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="tel:+447308658247" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-6 py-3 rounded-lg transition-all">
              📞 Call 07308 658247
            </a>
            <a href="#bulk-form" className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-6 py-3 rounded-lg transition-all">
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { val: '£50', label: 'Per EPC from' },
              { val: '10%+', label: 'Bulk Discount' },
              { val: '24-48h', label: 'Turnaround' },
              { val: '100%', label: 'Accredited' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#016837]">{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Bulk */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Bulk EPC with Prime EPC?</h2>
              <div className="space-y-4">
                {[
                  { icon: '💰', title: 'Discounted Rates', desc: 'The more properties you book, the more you save. Significant discounts available for 5+ properties.' },
                  { icon: '⚡', title: 'Fast Turnaround', desc: 'Certificates delivered within 24-48 hours of inspection. We can schedule multiple properties on the same day.' },
                  { icon: '📋', title: 'Single Point of Contact', desc: 'One dedicated contact manages all your properties — no chasing multiple assessors.' },
                  { icon: '✅', title: 'Fully Accredited', desc: 'All our assessors are Quidos-accredited. Certificates are lodged on the national EPC register.' },
                  { icon: '🗺️', title: 'Wide Coverage', desc: 'We cover Greater Manchester, Lancashire, Cheshire, Merseyside and the wider North West.' },
                  { icon: '🏢', title: 'All Property Types', desc: 'Domestic, commercial, HMO, new build — we handle all property types in a single order.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-[#f0fdf4] rounded-full flex items-center justify-center flex-shrink-0 text-lg">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing table */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Bulk EPC Pricing</h2>
              <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-[#016837] text-white">
                    <tr>
                      <th className="text-left px-5 py-3 text-sm">Number of Properties</th>
                      <th className="text-left px-5 py-3 text-sm">Price Per EPC</th>
                      <th className="text-left px-5 py-3 text-sm">Saving</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['1-4', '£50', 'Standard rate'],
                      ['5-9', '£47', 'Save £3/EPC'],
                      ['10-19', '£44', 'Save £6/EPC'],
                      ['20-49', '£40', 'Save £10/EPC'],
                      ['50+', 'Contact us', 'Custom quote'],
                    ].map(([qty, price, saving], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-5 py-3 text-sm text-gray-700">{qty}</td>
                        <td className="px-5 py-3 text-sm font-bold text-[#016837]">{price}</td>
                        <td className="px-5 py-3 text-sm text-gray-500">{saving}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl p-5">
                <p className="font-bold text-gray-900 mb-1">Need a custom quote?</p>
                <p className="text-sm text-gray-600 mb-3">For 50+ properties or mixed property types, contact us directly for a tailored package.</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+447308658247" className="text-[#016837] font-semibold text-sm hover:underline">📞 07308 658247</a>
                  <a href="mailto:info@primeepcdesign.co.uk" className="text-[#016837] font-semibold text-sm hover:underline">✉️ info@primeepcdesign.co.uk</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who is Bulk EPC For?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏠', title: 'Landlords', desc: 'Managing multiple rental properties and need MEES-compliant EPCs.' },
              { icon: '🏢', title: 'Letting Agents', desc: 'Handling EPCs for your entire portfolio of managed properties.' },
              { icon: '🏗️', title: 'Property Developers', desc: 'New build completions or conversions requiring multiple EPCs at once.' },
              { icon: '🏦', title: 'Housing Associations', desc: 'Social housing providers with large property portfolios.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Submit your quote request', desc: 'Fill in the form below with your property details and we will respond within 1 working day.' },
              { step: '02', title: 'Receive your tailored quote', desc: 'We will confirm pricing, scheduling and a single point of contact for your order.' },
              { step: '03', title: 'Assessors visit your properties', desc: 'We schedule all visits at times that suit you — multiple properties on the same day where possible.' },
              { step: '04', title: 'Receive all certificates', desc: 'All EPCs are lodged on the national register and emailed to you within 24-48 hours.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[#016837] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-600 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="bulk-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Request a Bulk EPC Quote</h2>
              <p className="text-gray-500 mb-6 text-sm">Save time and money with discounted rates for multiple properties. Fill in the form and we will get back to you within 1 working day with a tailored quote.</p>

              {success ? (
                <div className="bg-[#f0fdf4] border border-[#86efac] rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#016837] mb-2">Quote Request Received!</h3>
                  <p className="text-gray-600">Thank you {form.name}. We will get back to you within 1 working day with a tailored quote.</p>
                  <p className="text-gray-500 text-sm mt-2">A confirmation has been sent to {form.email}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Property Details */}
                  <div className="bg-white rounded-2xl p-5 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">🏠 Property Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Type of properties</label>
                        <select name="propertyType" value={form.propertyType} onChange={handleChange} required
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#016837]">
                          <option value="">Select property type</option>
                          <option value="domestic">Domestic (Houses/Flats)</option>
                          <option value="commercial">Commercial</option>
                          <option value="hmo">HMO</option>
                          <option value="mixed">Mixed (Domestic + Commercial)</option>
                          <option value="new-build">New Build</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Number of properties</label>
                        <select name="numberOfProperties" value={form.numberOfProperties} onChange={handleChange} required
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#016837]">
                          <option value="">Select range</option>
                          <option value="1-4">1-4</option>
                          <option value="5-9">5-9</option>
                          <option value="10-19">10-19</option>
                          <option value="20-49">20-49</option>
                          <option value="50+">50+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Postcode(s) / Areas</label>
                        <input type="text" name="postcodes" value={form.postcodes} onChange={handleChange}
                          placeholder="e.g. BL1, M14, SK3"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                      </div>
                    </div>
                  </div>

                  {/* Your Details */}
                  <div className="bg-white rounded-2xl p-5 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">👤 Your Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Full name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required
                          placeholder="John Smith"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Email address *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required
                          placeholder="you@company.co.uk"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Phone number *</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                          placeholder="07123 456789"
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-white rounded-2xl p-5 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">📋 Additional Information</h3>
                    <textarea name="additionalInfo" value={form.additionalInfo} onChange={handleChange} rows={4}
                      placeholder="Any specific requirements? (e.g. floor plans needed, landlord/agent, urgent turnaround, etc.)"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837] resize-none"/>
                    <p className="text-right text-xs text-gray-400 mt-1">{form.additionalInfo.length}/500</p>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange}
                      className="mt-1 w-4 h-4 accent-[#016837]" id="bulk-terms"/>
                    <label htmlFor="bulk-terms" className="text-sm text-gray-600">
                      I agree to the <Link href="/privacy" className="text-[#016837] underline">privacy policy</Link> and <Link href="/terms" className="text-[#016837] underline">terms of service</Link>.
                    </label>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="submit" disabled={loading}
                    className="w-full bg-[#016837] hover:bg-[#01572E] text-white font-bold py-4 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? 'Submitting...' : '✈️ Request Bulk Quote →'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-bold text-gray-900 mb-3">Why choose our Bulk EPC service?</h3>
                <ul className="space-y-2">
                  {[
                    'Discounted rates for multiple properties',
                    'Fast turnaround (24-48hrs)',
                    'Fully accredited & experienced assessors',
                    'Nationwide coverage',
                    'Simple, hassle-free process',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#016837] font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f0fdf4] rounded-2xl p-6 border border-[#86efac]">
                <h3 className="font-bold text-gray-900 mb-3">🛡️ Need help?</h3>
                <p className="text-sm text-gray-600 mb-3">Call us or email us and we will be happy to assist.</p>
                <a href="tel:+447308658247" className="flex items-center gap-2 text-[#016837] font-bold text-sm mb-2 hover:underline">
                  📞 07308 658247
                </a>
                <a href="mailto:info@primeepcdesign.co.uk" className="flex items-center gap-2 text-[#016837] font-bold text-sm hover:underline">
                  ✉️ info@primeepcdesign.co.uk
                </a>
              </div>

              <div className="bg-[#016837] rounded-2xl p-6 text-white text-center">
                <p className="text-2xl font-black mb-1">More properties?</p>
                <p className="text-[#80C531] font-bold text-xl">More savings! 🌿</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#016837] text-white py-14">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order Bulk EPCs?</h2>
          <p className="text-white/80 mb-8">Get discounted rates · One point of contact · 24-48h turnaround</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#bulk-form" className="bg-[#80C531] hover:bg-[#70B52B] text-white font-bold px-8 py-4 rounded-lg transition-all">
              Request a Quote
            </a>
            <a href="tel:+447308658247" className="border-2 border-white text-white hover:bg-white hover:text-[#016837] font-bold px-8 py-4 rounded-lg transition-all">
              📞 07308 658247
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
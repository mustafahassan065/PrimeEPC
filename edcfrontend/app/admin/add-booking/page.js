"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = 'https://primeepcdesign.co.uk'

const PRICE_MAP = {
  '1 bed. £50': 50, '2 bed. £55': 55, '3 bed. £60': 60,
  '4 bed. £65': 65, '5 bed. £70': 70, '6 bed. £75': 75,
  '6+ bedroom contact for quotation': 0,
  '0 -540 ft square (0 – 50 square metre) £144': 144,
  '540-1070 ft square (51 -100 square metres) £180': 180,
  '1070-1610 ft square (101 – 150 square metres) £228': 228,
  '1610 – 2150 ft square (151 - 200 square metres) £264': 264,
  '2150-2690 ft square (201- 250 square metres) £312': 312,
  '2690 – 3230 ft square (251 – 300 square metres) £360': 360,
  '1 Bedroom Flat £110': 110, '2 Bedroom Flat £120': 120,
  '2 Bedroom House £130': 130, '3 Bedroom House £140': 140,
  '4 Bedroom House £160': 160, '5 Bedroom House £180': 180,
}

const navItems = [
  { label:'Dashboard',   href:'/admin/dashboard',   icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label:'Bookings',    href:'/admin/bookings',    icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label:'Schedule',    href:'/admin/schedule',    icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label:'Blog Posts',  href:'/admin/create-blog', icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { label:'Add Booking', href:'/admin/add-booking', icon:'M12 4v16m8-8H4', active: true },
]

export default function AddBookingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    propertyType: 'domestic', propertyDetails: '',
    doorNumber: '', addressLine1: '', city: '', postcode: '',
    date: '', time: '',
    paymentMethod: 'cash', amount: ''
  })

  const domesticOptions = [
    '1 bed. £50','2 bed. £55','3 bed. £60','4 bed. £65','5 bed. £70','6 bed. £75','6+ bedroom contact for quotation'
  ]
  const commercialOptions = [
    '0 -540 ft square (0 – 50 square metre) £144','540-1070 ft square (51 -100 square metres) £180',
    '1070-1610 ft square (101 – 150 square metres) £228','1610 – 2150 ft square (151 - 200 square metres) £264',
    '2150-2690 ft square (201- 250 square metres) £312','2690 – 3230 ft square (251 – 300 square metres) £360'
  ]
  const eicrOptions = [
    '1 Bedroom Flat £110','2 Bedroom Flat £120','2 Bedroom House £130',
    '3 Bedroom House £140','4 Bedroom House £160','5 Bedroom House £180'
  ]

  const options = form.propertyType === 'domestic' ? domesticOptions
    : form.propertyType === 'eicr' ? eicrOptions : commercialOptions

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'propertyType') {
      setForm({ ...form, propertyType: value, propertyDetails: '', amount: '' })
      return
    }
    const updated = { ...form, [name]: value }
    if (name === 'propertyDetails') {
      updated.amount = PRICE_MAP[value] || ''
    }
    setForm(updated)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('adminToken')
      const propertyAddress = [form.doorNumber, form.addressLine1, form.city].filter(Boolean).join(', ')
      const preferredDate = form.date && form.time ? `${form.date}T${form.time}` : form.date

      const res = await fetch(`${API_URL}/api/booking/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name:            form.name,
          email:           form.email,
          phone:           form.phone,
          propertyType:    form.propertyType,
          propertyDetails: form.propertyDetails,
          propertyAddress,
          postcode:        form.postcode,
          preferredDate,
          paymentMethod:   form.paymentMethod,
          paymentStatus:   'pending',
          amount:          form.amount || 0,
          slotId:          'manual',   // manual booking — no slot
          message:         'Manual booking added by admin'
        })
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => router.push('/admin/bookings'), 2000)
      } else {
        setError(data.message || 'Failed to create booking')
      }
    } catch { setError('Unable to connect. Please try again.') }
    finally { setLoading(false) }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow p-10 text-center max-w-sm w-full">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Booking Added!</h2>
        <p className="text-gray-500 text-sm">Redirecting to bookings...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#0a1628] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#016837] rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Prime EPC</p>
              <p className="text-white/50 text-xs">& Design Consultants</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-2 mb-2">Management</p>
          {navItems.map(item => (
            <Link key={item.label} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-[#016837] text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
              onClick={() => setSidebarOpen(false)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#016837] rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-white/40 text-xs">Administrator</p>
            </div>
            <button onClick={handleLogout} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Add Manual Booking</h1>
          </div>
          <Link href="/admin/bookings" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            Bookings
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-6">Add a booking for a customer who called or walked in.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name:'name',  label:'Full Name *',    type:'text',  placeholder:'Customer name',  required:true },
                  { name:'email', label:'Email',          type:'email', placeholder:'customer@email.com' },
                  { name:'phone', label:'Phone Number *', type:'tel',   placeholder:'+44 7000 000000', required:true },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm text-gray-600 mb-1">{f.label}</label>
                    <input type={f.type} name={f.name} required={f.required} value={form[f.name]}
                      onChange={handleChange} placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                  </div>
                ))}

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Service Type *</label>
                  <select name="propertyType" value={form.propertyType} onChange={handleChange} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                    <option value="domestic">Domestic EPC</option>
                    <option value="commercial">Commercial EPC</option>
                    <option value="eicr">EICR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Property / Price *</label>
                  <select name="propertyDetails" value={form.propertyDetails} onChange={handleChange} required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                    <option value="">Select option</option>
                    {options.map((o,i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Price display */}
              {form.amount > 0 && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm text-gray-600">Assessment fee</span>
                  <span className="text-lg font-semibold text-[#016837]">£{form.amount}</span>
                </div>
              )}

              {/* Address */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Property Address *</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name:'doorNumber',   placeholder:'Door / Flat No', label:'Door No *' },
                    { name:'addressLine1', placeholder:'Street name',    label:'Street *' },
                    { name:'city',         placeholder:'City / Town',    label:'City *' },
                    { name:'postcode',     placeholder:'e.g. M1 1AB',   label:'Postcode *' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                      <input type="text" name={f.name} required value={form[f.name]}
                        onChange={handleChange} placeholder={f.placeholder}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Assessment Date *</label>
                  <input type="date" name="date" required value={form.date} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Time *</label>
                  <input type="time" name="time" required value={form.time} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#016837]"/>
                </div>
              </div>

              {/* Payment */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Payment Method *</label>
                <div className="grid grid-cols-4 gap-2">
                  {['cash','stripe','paypal','bank_transfer'].map(pm => (
                    <button key={pm} type="button" onClick={() => setForm({...form, paymentMethod: pm})}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${form.paymentMethod === pm ? 'border-[#016837] bg-[#016837]/5 text-[#016837]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      {pm === 'cash' ? 'Cash' : pm === 'stripe' ? 'Card' : pm === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Link href="/admin/bookings"
                  className="flex-1 py-2.5 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition-all text-sm text-center">
                  Cancel
                </Link>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 bg-[#016837] text-white rounded-lg hover:bg-[#01572E] transition-all text-sm font-medium disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>
                      Adding...
                    </span>
                  ) : 'Add Booking'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = 'https://primeepcdesign.co.uk'

export default function AdminBookings() {
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [sessionExpired, setSessionExpired] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expanded, setExpanded]   = useState(null)
  const router = useRouter()

  const handleAuthError = useCallback(() => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    setSessionExpired(true)
    setLoading(false)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
    fetchBookings(token)
  }, [router])

  const fetchBookings = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/booking/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.status === 401 || res.status === 403) { handleAuthError(); return }
      const data = await res.json()
      if (data.success) setBookings(data.data)
      else setError('Failed to fetch bookings')
    } catch { setError('Unable to connect to server.') }
    finally { setLoading(false) }
  }

  const updateStatus = async (bookingId, status) => {
    const token = localStorage.getItem('adminToken')
    try {
      const res = await fetch(`${API_URL}/api/booking/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({ status })
      })
      if (res.status === 401) { handleAuthError(); return }
      const data = await res.json()
      if (data.success) setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b))
    } catch { alert('Failed to update. Please try again.') }
  }

  const deleteBooking = async (bookingId, customerName) => {
    if (!confirm(`Delete booking for ${customerName}? This cannot be undone.`)) return
    const token = localStorage.getItem('adminToken')
    try {
      const res = await fetch(`${API_URL}/api/booking/admin/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization:`Bearer ${token}` }
      })
      if (res.status === 401) { handleAuthError(); return }
      const data = await res.json()
      if (data.success) setBookings(bookings.filter(b => b.id !== bookingId))
      else alert('Failed to delete booking.')
    } catch { alert('Unable to connect. Please try again.') }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  const statusColor = (s) => ({
    confirmed: 'bg-green-100 text-green-700',
    completed:  'bg-blue-100 text-blue-700',
    cancelled:  'bg-red-100 text-red-700',
    pending:    'bg-yellow-100 text-yellow-700'
  }[s] || 'bg-gray-100 text-gray-600')

  const avatarColor = (name) => {
    const colors = ['bg-green-500','bg-blue-500','bg-purple-500','bg-orange-500','bg-pink-500','bg-teal-500']
    return colors[(name?.charCodeAt(0) || 0) % colors.length]
  }

  const navItems = [
    { label:'Dashboard',  href:'/admin/dashboard',  icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label:'Bookings',   href:'/admin/bookings',   icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', active: true },
    { label:'Schedule',   href:'/admin/schedule',   icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label:'Blog Posts', href:'/admin/create-blog',icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ]

  if (sessionExpired) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow p-8 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Session Expired</h2>
        <p className="text-gray-500 text-sm mb-6">You need to login again.</p>
        <button onClick={() => router.push('/admin/login')} className="w-full bg-[#016837] text-white py-2.5 rounded-lg hover:bg-[#01572E] font-medium">Go to Login</button>
      </div>
    </div>
  )

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#016837] mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading bookings...</p>
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-[#016837] text-white' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}
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

        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Booking Management</h1>
          </div>
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            Dashboard
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-6">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
          )}

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label:'Total', value: bookings.length, color:'text-gray-800' },
              { label:'Pending', value: bookings.filter(b=>b.status==='pending').length, color:'text-yellow-600' },
              { label:'Confirmed', value: bookings.filter(b=>b.status==='confirmed').length, color:'text-green-600' },
              { label:'Completed', value: bookings.filter(b=>b.status==='completed').length, color:'text-blue-600' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl px-4 py-3 shadow-sm">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bookings table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">All Bookings <span className="text-gray-400 font-normal">({bookings.length})</span></h2>
            </div>

            {bookings.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No bookings found.</div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">CUSTOMER</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">SERVICE</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">FULL ADDRESS</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3 whitespace-nowrap">DATE & TIME</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">PAYMENT</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">STATUS</th>
                        <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">UPDATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {bookings.map(b => (
                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor(b.name)}`}>
                                {b.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{b.name}</p>
                                <p className="text-xs text-gray-400">{b.email}</p>
                                <p className="text-xs text-gray-400">{b.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <p className="text-gray-700 capitalize">{b.propertyType}</p>
                            <p className="text-xs text-gray-400">{b.propertyDetails}</p>
                          </td>
                          {/* Full address — no truncation */}
                          <td className="px-5 py-3">
                            <p className="text-gray-700 text-sm" style={{maxWidth:'200px', wordBreak:'break-word', whiteSpace:'normal'}}>{b.propertyAddress}</p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{b.postcode}</p>
                          </td>
                          <td className="px-5 py-3 whitespace-nowrap">
                            <p className="text-gray-700">{new Date(b.preferredDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</p>
                            <p className="text-xs text-gray-400">{new Date(b.preferredDate).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                          </td>
                          <td className="px-5 py-3">
                            <p className="text-gray-700 capitalize text-xs">{b.paymentMethod || 'cash'}</p>
                            {b.amount > 0 && <p className="text-xs text-gray-400 font-medium">£{b.amount}</p>}
                          </td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${statusColor(b.status)}`}>{b.status}</span>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => deleteBooking(b.id, b.name)}
                                title="Delete booking"
                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden divide-y divide-gray-100">
                  {bookings.map(b => (
                    <div key={b.id} className="px-4 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${avatarColor(b.name)}`}>
                            {b.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{b.name}</p>
                            <p className="text-xs text-gray-400">{b.email}</p>
                            <p className="text-xs text-gray-400">{b.phone}</p>
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize flex-shrink-0 ${statusColor(b.status)}`}>{b.status}</span>
                      </div>

                      <div className="mt-3 space-y-1.5 pl-12">
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-400 w-16 flex-shrink-0">Service</span>
                          <span className="text-gray-700 capitalize">{b.propertyType} — {b.propertyDetails}</span>
                        </div>
                        {/* Full address on mobile too */}
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-400 w-16 flex-shrink-0">Address</span>
                          <span className="text-gray-700" style={{wordBreak:'break-word'}}>{b.propertyAddress}, {b.postcode}</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-400 w-16 flex-shrink-0">Date</span>
                          <span className="text-gray-700">{new Date(b.preferredDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})} at {new Date(b.preferredDate).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>
                        </div>
                        {b.amount > 0 && (
                          <div className="flex gap-2 text-xs">
                            <span className="text-gray-400 w-16 flex-shrink-0">Payment</span>
                            <span className="text-gray-700 capitalize">{b.paymentMethod} — £{b.amount}</span>
                          </div>
                        )}
                        <div className="flex gap-2 text-xs items-center pt-1">
                          <span className="text-gray-400 w-16 flex-shrink-0">Update</span>
                          <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#016837] bg-white">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => deleteBooking(b.id, b.name)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
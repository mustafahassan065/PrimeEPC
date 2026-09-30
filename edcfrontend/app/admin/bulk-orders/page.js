"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.primeepcdesign.co.uk'

export default function BulkOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
    fetchOrders(token)
  }, [])

  const fetchOrders = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/email/bulk-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      if (data.success) setOrders(data.data || [])
      else setError('Failed to fetch bulk orders')
    } catch { setError('Unable to connect.') }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a1628] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#016837] rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <div><p className="font-semibold text-sm">Prime EPC</p><p className="text-xs text-white/50">& Design Consultants</p></div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs text-white/30 uppercase tracking-widest px-3 mb-2">Management</p>
          {[
            { label: 'Dashboard', href: '/admin/dashboard', icon: '🏠' },
            { label: 'Bookings', href: '/admin/bookings', icon: '📅' },
            { label: 'Bulk Orders', href: '/admin/bulk-orders', icon: '📦' },
            { label: 'Schedule', href: '/admin/schedule', icon: '🕐' },
            { label: 'Blog Posts', href: '/admin/blogs', icon: '📝' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.href === '/admin/bulk-orders' ? 'bg-[#016837] text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
          <Link href="/admin/add-booking" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <span>➕</span>Add Booking
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="text-white/40 hover:text-white text-xs transition-colors">Sign out</button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Bulk EPC Orders</h1>
              <p className="text-xs text-gray-400">Quote requests from potential bulk clients</p>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>}

          {loading ? (
            <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-[#016837] border-t-transparent rounded-full animate-spin"/></div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-gray-500">No bulk EPC orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-semibold text-gray-800 text-base">{order.name}</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'})}</p>
                    </div>
                    <span className="bg-[#f0fdf4] text-[#016837] text-xs font-semibold px-3 py-1 rounded-full border border-[#86efac]">
                      {order.numberOfProperties} properties
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div><p className="text-xs text-gray-400">Email</p><a href={`mailto:${order.email}`} className="text-blue-500 hover:underline text-xs">{order.email}</a></div>
                    <div><p className="text-xs text-gray-400">Phone</p><a href={`tel:${order.phone}`} className="text-green-600 hover:underline text-xs">{order.phone}</a></div>
                    <div><p className="text-xs text-gray-400">Property Type</p><p className="font-medium text-xs text-gray-700">{order.propertyType}</p></div>
                    <div><p className="text-xs text-gray-400">Postcodes</p><p className="font-medium text-xs text-gray-700">{order.postcodes || 'N/A'}</p></div>
                    {order.additionalInfo && (
                      <div className="col-span-2 md:col-span-3"><p className="text-xs text-gray-400">Notes</p><p className="text-xs text-gray-700">{order.additionalInfo}</p></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
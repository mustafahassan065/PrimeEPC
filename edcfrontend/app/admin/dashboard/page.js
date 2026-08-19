"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = 'https://primeepcdesign.co.uk'

const SidebarIcon = ({ path }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={path}/>
  </svg>
)

export default function AdminDashboard() {
  const [blogs, setBlogs]               = useState([])
  const [bookings, setBookings]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const router = useRouter()

  const handleAuthError = useCallback(() => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    setSessionExpired(true)
    setLoading(false)
  }, [])

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) { handleAuthError(); return }
    try {
      const [bRes, bookRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/blogs`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/booking/admin/bookings`, { headers: { Authorization: `Bearer ${token}` } })
      ])
      if (bRes.status === 401 || bookRes.status === 401) { handleAuthError(); return }
      const [bData, bookData] = await Promise.all([bRes.json(), bookRes.json()])
      if (bData.success) setBlogs(bData.data)
      if (bookData.success) setBookings(bookData.data)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }, [handleAuthError])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) { router.push('/admin/login'); return }
    fetchData()
  }, [router, fetchData])

  const handleDelete = async (blogId) => {
    if (!confirm('Delete this blog post?')) return
    const token = localStorage.getItem('adminToken')
    const res = await fetch(`${API_URL}/api/admin/blogs/${blogId}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
    })
    if (res.status === 401) { handleAuthError(); return }
    const data = await res.json()
    if (data.success) setBlogs(blogs.filter(b => b.id !== blogId))
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  const totalBookings   = bookings.length
  const pending         = bookings.filter(b => b.status === 'pending').length
  const completed       = bookings.filter(b => b.status === 'completed').length
  const uniqueCustomers = new Set(bookings.map(b => b.email)).size
  const recentBookings  = [...bookings].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)

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

  if (sessionExpired) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Session Expired</h2>
        <p className="text-gray-500 text-sm mb-6">You need to login again to continue.</p>
        <button onClick={() => router.push('/admin/login')} className="w-full bg-[#016837] text-white py-2.5 rounded-lg hover:bg-[#01572E] font-medium">Go to Login</button>
      </div>
    </div>
  )

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#016837] mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading dashboard...</p>
      </div>
    </div>
  )

  const navItems = [
    { label: 'Dashboard',   href: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true },
    { label: 'Bookings',    href: '/admin/bookings',  icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Schedule',    href: '/admin/schedule',  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Blog Posts',  href: '/admin/create-blog', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#0a1628] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#016837] rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Prime EPC</p>
              <p className="text-white/50 text-xs">& Design Consultants</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-2 mb-2">Management</p>
          {navItems.map(item => (
            <Link key={item.label} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-[#016837] text-white' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}
              onClick={() => setSidebarOpen(false)}>
              <SidebarIcon path={item.icon}/>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 mb-3">
            <p className="text-white/60 text-xs font-medium mb-1">Need Help?</p>
            <p className="text-white/40 text-xs">If you need any help please contact support.</p>
            <button className="mt-2 w-full bg-[#016837] text-white text-xs py-1.5 rounded-lg hover:bg-[#01572E] transition-colors">Contact Support</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#016837] rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Admin</p>
              <p className="text-white/40 text-xs">Administrator</p>
            </div>
            <button onClick={handleLogout} title="Logout" className="text-white/40 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Welcome back, Admin 👋</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" placeholder="Search..." className="bg-transparent text-sm focus:outline-none w-32 text-gray-600 placeholder-gray-400"/>
            </div>
            <div className="w-8 h-8 bg-[#016837] rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Total Bookings',   value: totalBookings,   icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color:'bg-green-50 text-green-600' },
              { label:'Pending',          value: pending,          icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',                                               color:'bg-orange-50 text-orange-500' },
              { label:'Completed',        value: completed,        icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',                                             color:'bg-blue-50 text-blue-500' },
              { label:'Total Customers',  value: uniqueCustomers,  icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color:'bg-purple-50 text-purple-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon}/>
                  </svg>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label:'Manage Bookings',  sub:'View and manage all bookings',   href:'/admin/bookings',     icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',     color:'text-[#016837]' },
                { label:'Manage Schedule',  sub:'View and manage schedule',        href:'/admin/schedule',     icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',                                                  color:'text-purple-600' },
                { label:'Create New Blog',  sub:'Add a new blog post',             href:'/admin/create-blog',  icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color:'text-blue-600' },
                { label:'View Reports',     sub:'See analytics and reports',       href:'#',                   icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color:'text-orange-500' },
              ].map(action => (
                <Link key={action.label} href={action.href}
                  className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-all group">
                  <div className={`mt-0.5 ${action.color}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={action.icon}/>
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${action.color}`}>{action.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{action.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-xs text-[#016837] font-medium hover:underline">View All Bookings →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">CUSTOMER</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">PROPERTY</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-5 py-3 whitespace-nowrap">DATE & TIME</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">STATUS</th>
                    <th className="text-left text-xs text-gray-400 font-medium px-5 py-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentBookings.length === 0 ? (
                    <tr><td colSpan={5} className="text-center text-gray-400 py-10 text-sm">No bookings yet</td></tr>
                  ) : recentBookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor(b.name)}`}>
                            {b.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{b.name}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[140px]">{b.email}</p>
                            <p className="text-xs text-gray-400">{b.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-gray-700 capitalize text-sm">{b.propertyType}</p>
                        <p className="text-xs text-gray-400 max-w-[180px] whitespace-normal break-words">{b.propertyAddress}</p>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap">
                        <p className="text-gray-700">{new Date(b.preferredDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</p>
                        <p className="text-xs text-gray-400">{new Date(b.preferredDate).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${statusColor(b.status)}`}>{b.status}</span>
                      </td>
                      <td className="px-5 py-3">
                        <Link href="/admin/bookings" className="text-gray-400 hover:text-gray-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Blog Posts</h2>
              <Link href="/admin/create-blog" className="text-xs text-[#016837] font-medium hover:underline">+ Create New</Link>
            </div>
            {blogs.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-sm">No blog posts yet</div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {blogs.map(blog => (
                  <li key={blog.id} className="px-5 py-3 flex items-start justify-between gap-4 hover:bg-gray-50">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{blog.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(blog.createdAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/admin/edit-blog/${blog.id}`} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">Edit</Link>
                      <button onClick={() => handleDelete(blog.id)} className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </main>
      </div>
    </div>
  )
}
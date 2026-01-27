"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// HARDCODED API URL - NO ENV VARIABLE ISSUES
const API_URL = 'https://primeepcdesign.co.uk'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchBookings()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      console.log('📊 Fetching bookings from:', `${API_URL}/api/booking/admin/bookings`)
      
      const response = await fetch(`${API_URL}/api/booking/admin/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('📊 Bookings response:', data)

      if (data.success) {
        setBookings(data.data)
      } else {
        setError(data.message || 'Failed to fetch bookings')
      }
    } catch (error) {
      console.error('❌ Fetch bookings error:', error)
      setError('Network error. Please check if backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('adminToken')
      console.log('🔄 Updating booking:', bookingId, 'status:', status)
      
      const response = await fetch(`${API_URL}/api/booking/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('🔄 Update response:', data)

      if (data.success) {
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status } : booking
        ))
        alert('✅ Booking status updated successfully')
      } else {
        alert('❌ Failed to update booking status: ' + data.message)
      }
    } catch (error) {
      console.error('❌ Update error:', error)
      alert('❌ Network error: ' + error.message)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile responsive */}
      <header className="bg-white shadow">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Management</h1>
              <span className="text-xs sm:text-sm text-gray-500">Prime EPC & Design Consultants</span>
            </div>
            <div className="flex flex-col xs:flex-row gap-2">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="w-full xs:w-auto bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 text-sm sm:text-base"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-4 sm:py-6 px-4 sm:px-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 sm:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="px-4 py-4 sm:px-6">
            <h3 className="text-lg sm:text-xl leading-6 font-medium text-gray-900">
              All Bookings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage EPC assessment bookings
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="px-4 py-8 sm:py-12 text-center">
              <p className="text-gray-500">No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Mobile-friendly horizontal table */}
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Customer
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Property
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Date & Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4">
                          <div className="min-w-[150px]">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-[150px]">
                              {booking.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              {booking.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4 min-w-[180px]">
                          <div className="text-sm text-gray-900 capitalize">
                            {booking.propertyType}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-[180px]">
                            {booking.propertyAddress}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 min-w-[140px]">
                          {new Date(booking.preferredDate).toLocaleDateString()}
                          <br />
                          <span className="text-xs text-gray-500">
                            {new Date(booking.preferredDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className="text-xs sm:text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-[120px]"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Horizontal Scroll Indicator for Mobile */}
        {bookings.length > 0 && (
          <div className="mt-4 text-center sm:hidden">
            <p className="text-xs text-gray-500">
              ← Scroll horizontally to view more →
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
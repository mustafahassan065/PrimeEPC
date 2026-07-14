"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = 'https://primeepcdesign.co.uk'

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sessionExpired, setSessionExpired] = useState(false)
  const router = useRouter()

  const handleAuthError = useCallback(() => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    setSessionExpired(true)
    setLoading(false)
  }, [])

  const fetchBlogs = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) { handleAuthError(); return }

      const response = await fetch(`${API_URL}/api/admin/blogs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      // Token expired or invalid
      if (response.status === 401 || response.status === 403) {
        handleAuthError()
        return
      }

      if (!response.ok) {
        setError('Failed to load blogs. Please refresh the page.')
        return
      }

      const data = await response.json()
      if (data.success) {
        setBlogs(data.data)
        setError('')
      } else {
        setError('Failed to fetch blogs: ' + data.message)
      }
    } catch {
      setError('Unable to connect to server. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }, [handleAuthError])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchBlogs()
  }, [router, fetchBlogs])

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${API_URL}/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.status === 401 || response.status === 403) {
        handleAuthError()
        return
      }

      const data = await response.json()
      if (data.success) {
        setBlogs(blogs.filter(blog => blog.id !== blogId))
      } else {
        alert('Failed to delete blog: ' + data.message)
      }
    } catch {
      alert('Unable to connect to server. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  // Session expired screen
  if (sessionExpired) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Session Expired</h2>
          <p className="text-gray-500 text-sm mb-6">You need to login again to continue.</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
            <div className="flex flex-col xs:flex-row gap-3">
              <div className="flex flex-wrap gap-2">
                <Link href="/admin/bookings" className="w-40 xs:w-48 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center text-sm sm:text-base">
                  Manage Bookings
                </Link>
                <Link href="/admin/schedule" className="w-40 xs:w-48 bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center text-sm sm:text-base">
                  Manage Schedule
                </Link>
              </div>
              <Link href="/admin/create-blog" className="w-full xs:w-40 sm:w-48 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center text-sm sm:text-base">
                Create New Blog
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="py-4 sm:py-6 px-4 sm:px-6">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md flex items-start gap-2 mb-4 sm:mb-6 text-sm">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="px-4 py-4 sm:px-6">
            <h3 className="text-lg sm:text-xl leading-6 font-medium text-gray-900">Blog Posts</h3>
            <p className="mt-1 text-sm text-gray-500">Manage your blog posts and content</p>
          </div>

          {blogs.length === 0 ? (
            <div className="px-4 py-8 sm:py-12 text-center">
              <p className="text-gray-500 mb-4">No blog posts found.</p>
              <Link href="/admin/create-blog" className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm sm:text-base">
                Create Your First Blog
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <li key={blog.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-medium text-gray-900 truncate">{blog.title}</h4>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2 sm:line-clamp-3">
                          {blog.content?.substring(0, 150)}...
                        </p>
                        <div className="mt-2 text-xs sm:text-sm text-gray-500">
                          Created: {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href={`/admin/edit-blog/${blog.id}`} className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 text-center">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(blog.id)} className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
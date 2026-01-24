"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchBlogs()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    }
  }

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/admin/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setBlogs(data.data)
      } else {
        setError('Failed to fetch blogs')
      }
    } catch (error) {
      setError('Network error. Please check if backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const token = localStorage.getItem('adminToken')
      
      console.log('🗑️ Deleting blog ID:', blogId)
      
      const response = await fetch(`http://localhost:5000/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      console.log('🗑️ Delete response:', data)

      if (data.success) {
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        alert('✅ Blog deleted successfully')
      } else {
        alert('❌ Failed to delete blog: ' + data.message)
      }
    } catch (error) {
      console.error('❌ Delete error:', error)
      alert('❌ Network error')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
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
      {/* Header - Mobile responsive */}
      <header className="bg-white shadow">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4">
            {/* Top row - Title */}
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Logout
              </button>
            </div>

            {/* Bottom row - Buttons */}
            <div className="flex flex-col xs:flex-row gap-3">
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/admin/bookings"
                  className="w-40 xs:w-48 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
                >
                  Manage Bookings
                </Link>
                <Link
                  href="/admin/schedule"
                  className="w-40 xs:w-48 bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center text-sm sm:text-base"
                 > Manage Schedule
                </Link>
              </div>
              <Link
                href="/admin/create-blog"
                className="w-full xs:w-40 sm:w-48 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-center text-sm sm:text-base"
  >

                Create New Blog
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-4 sm:py-6 px-4 sm:px-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 sm:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="px-4 py-4 sm:px-6">
            <h3 className="text-lg sm:text-xl leading-6 font-medium text-gray-900">
              Blog Posts
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your blog posts and content
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="px-4 py-8 sm:py-12 text-center">
              <p className="text-gray-500 mb-4">No blog posts found.</p>
              <Link
                href="/admin/create-blog"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm sm:text-base"
              >
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
                        <div className="mt-2 flex flex-col xs:flex-row xs:items-center text-xs sm:text-sm text-gray-500 gap-2">
                          <span>
                            Created: {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                          
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          href={`/admin/edit-blog/${blog.id}`}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 text-center"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700"
                        >
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
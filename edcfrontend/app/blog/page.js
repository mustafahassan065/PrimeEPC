"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// HARDCODED API URL - NO ENV VARIABLE ISSUES
const API_URL = 'https://primeepcdesign.co.uk'

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      console.log('📝 Fetching blogs from:', `${API_URL}/api/blogs`)
      
      const res = await fetch(`${API_URL}/api/blogs`, {
        next: { revalidate: 3600 } // Revalidate every hour
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('📝 Blogs API response:', data);
      
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError('Failed to load blogs: ' + data.message);
      }
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      setError('Network error. Please check your connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/blog-default.png';
    
    // If it's already a full URL, use it
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it starts with /, it's a relative path
    if (imagePath.startsWith('/')) return imagePath;
    
    // Otherwise, prepend with /images/
    return `/images/${imagePath}`;
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              EPC Blog & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights on Energy Performance Certificates, property efficiency, and regulations.
            </p>
          </div>

          {error && (
            <div className="max-w-6xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-center">
                <p className="font-semibold mb-2">⚠️ Unable to load blogs</p>
                <p className="text-sm mb-3">{error}</p>
                <button
                  onClick={fetchBlogs}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogs.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <p className="text-gray-500 text-lg mb-3">No blog posts available yet.</p>
                    <p className="text-gray-400 text-sm">Check back later for new articles.</p>
                  </div>
                </div>
              ) : (
                blogs.map((blog) => {
                  // Use featured_image (not featuredImage)
                  const imageUrl = getImageUrl(blog.featured_image || blog.featuredImage);
                  
                  return (
                    <article key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                      <div className="h-48 bg-gray-100 overflow-hidden relative">
                        <Link href={`/blog/${blog.slug}`}>
                          <Image 
                            src={imageUrl} 
                            alt={blog.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </Link>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors line-clamp-2">
                          <Link href={`/blog/${blog.slug}`}>
                            {blog.title}
                          </Link>
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {blog.excerpt || blog.meta_description || blog.metaDescription || 'Read more about this topic...'}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
                          <span>{new Date(blog.created_at || blog.createdAt).toLocaleDateString()}</span>
                          <Link 
                            href={`/blog/${blog.slug}`}
                            className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


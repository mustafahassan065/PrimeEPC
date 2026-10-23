'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') return '/images/blog-default.png';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return imagePath;
  return `/images/${imagePath}`;
};

const formatDate = (blog) => {
  const raw = blog.created_at || blog.createdAt;
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

function parseKeywords(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return raw.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

const POPULAR_TOPICS = [
  { label: 'All Articles', value: 'all' },
  { label: 'EPC Band C', value: 'Band C' },
  { label: 'MEES Regulations', value: 'MEES' },
  { label: 'Domestic EPC', value: 'Domestic' },
  { label: 'Commercial SBEM', value: 'Commercial' },
  { label: 'Landlord EICR', value: 'EICR' },
  { label: 'Manchester & Bolton', value: 'Manchester' },
];

export default function BlogListClient({ initialBlogs = [] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(initialBlogs.length === 0);
  const [activeTopic, setActiveTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback client-side fetch if SSR failed or returned 0 blogs
  useEffect(() => {
    if (blogs.length === 0) {
      let cancelled = false;
      async function fetchClientBlogs() {
        try {
          setLoading(true);
          // Try relative URL first (works in browser behind Nginx)
          let res = await fetch('/api/blogs').catch(() => null);
          if (!res || !res.ok) {
            // Try absolute canonical URL
            res = await fetch('https://www.primeepcdesign.co.uk/api/blogs').catch(() => null);
          }
          if (res && res.ok) {
            const data = await res.json();
            const list = Array.isArray(data.data) ? data.data : Array.isArray(data.blogs) ? data.blogs : [];
            if (!cancelled && list.length > 0) {
              setBlogs(list);
            }
          }
        } catch (err) {
          console.error('Client fallback blog fetch error:', err);
        } finally {
          if (!cancelled) setLoading(false);
        }
      }
      fetchClientBlogs();
      return () => {
        cancelled = true;
      };
    }
  }, [blogs.length]);

  // Filter blogs based on activeTopic and searchQuery
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const title = (blog.title || '').toLowerCase();
      const excerpt = (blog.excerpt || blog.meta_description || '').toLowerCase();
      const keywords = parseKeywords(blog.keywords).map((k) => k.toLowerCase());
      const query = searchQuery.trim().toLowerCase();

      // Topic filter
      let matchesTopic = true;
      if (activeTopic !== 'all') {
        const topicLower = activeTopic.toLowerCase();
        matchesTopic =
          title.includes(topicLower) ||
          excerpt.includes(topicLower) ||
          keywords.some((k) => k.includes(topicLower));
      }

      // Search filter
      let matchesSearch = true;
      if (query) {
        matchesSearch =
          title.includes(query) ||
          excerpt.includes(query) ||
          keywords.some((k) => k.includes(query));
      }

      return matchesTopic && matchesSearch;
    });
  }, [blogs, activeTopic, searchQuery]);

  return (
    <div>
      {/* Search & Topic Filters */}
      <div className="max-w-4xl mx-auto mb-12">
        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search compliance guides, MEES rules, EPC ratings..."
            className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 pl-12 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#016837] focus:border-transparent shadow-sm"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Popular Topic Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {POPULAR_TOPICS.map((topic) => {
            const isActive = activeTopic === topic.value;
            return (
              <button
                key={topic.value}
                onClick={() => setActiveTopic(topic.value)}
                className={`text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#016837] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#016837] hover:text-[#016837]'
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loading ? (
          // Skeleton loaders
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-1/3 pt-4" />
              </div>
            </div>
          ))
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              <p className="text-gray-800 font-semibold text-lg mb-2">No matching articles found</p>
              <p className="text-gray-500 text-sm mb-4">
                {searchQuery || activeTopic !== 'all'
                  ? 'Try broadening your search term or select "All Articles".'
                  : 'Check back later for new articles.'}
              </p>
              {(searchQuery || activeTopic !== 'all') && (
                <button
                  onClick={() => {
                    setActiveTopic('all');
                    setSearchQuery('');
                  }}
                  className="bg-[#016837] hover:bg-[#01572E] text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredBlogs.map((blog) => {
            const imageUrl = getImageUrl(blog.featured_image || blog.featuredImage);
            const dateStr = formatDate(blog);
            const blogKeywords = parseKeywords(blog.keywords);

            return (
              <article
                key={blog.id || blog.slug}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100"
              >
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
                  {/* Top Keyword Badge */}
                  {blogKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {blogKeywords.slice(0, 2).map((k, i) => (
                        <span
                          key={i}
                          className="bg-[#016837]/10 text-[#016837] text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="text-lg font-bold text-gray-900 mb-2.5 hover:text-[#016837] transition-colors line-clamp-2">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                    {blog.excerpt || blog.meta_description || 'Read more about this topic...'}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
                    <span>{dateStr}</span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-[#016837] font-bold hover:text-[#01572E] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

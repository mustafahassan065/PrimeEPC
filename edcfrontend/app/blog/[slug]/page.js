// app/blog/[slug]/page.js
import Head from 'next/head';
import Image from 'next/image';

// HARDCODED API URL - NO ENV VARIABLE ISSUES
const API_URL = 'https://primeepcdesign.co.uk'

async function getBlog(slug) {
  try {
    console.log('🔄 Fetching blog with slug:', slug);
    console.log('🌐 API URL:', `${API_URL}/api/blogs/${slug}`)
    
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
      cache: 'no-store'
    });
    
    console.log('📥 Response status:', res.status);
    
    if (!res.ok) {
      console.log('❌ API response not OK');
      return null;
    }
    
    const data = await res.json();
    console.log('📥 API data:', data);
    
    return data.success ? data.data : null;
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
    return null;
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  // Await the params Promise
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found | Prime EPC',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.metaTitle || blog.title} | Prime EPC & Design Consultants`,
    description: blog.metaDescription || blog.excerpt || 'EPC blog article',
    keywords: Array.isArray(blog.keywords) ? blog.keywords.join(', ') : blog.keywords || 'EPC, Energy Performance Certificate',
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || 'EPC blog article',
      type: 'article',
      images: blog.featured_image || blog.featuredImage ? 
        [{ url: getImageUrl(blog.featured_image || blog.featuredImage) }] : [],
    },
  };
}

// Helper function to get image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return imagePath;
  
  return `/images/${imagePath}`;
};

export default async function BlogPost({ params }) {
  // Await the params Promise
  const { slug } = await params;
  
  console.log('📖 Blog slug from params:', slug);
  
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Blog not found</h1>
          <p className="text-gray-600">The blog post "{slug}" could not be found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Check backend API: {API_URL}/api/blogs/{slug}
          </p>
          <a 
            href="/blog" 
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Back to Blog List
          </a>
        </div>
      </div>
    );
  }

  const featuredImage = getImageUrl(blog.featured_image || blog.featuredImage);

  return (
    <article className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>
          <div className="text-gray-600 flex justify-center items-center gap-4">
            <span>By {blog.author || 'Prime EPC'}</span>
            <span>•</span>
            <time dateTime={blog.created_at || blog.createdAt}>
              {new Date(blog.created_at || blog.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
          </div>
        </header>

        {featuredImage && (
          <div className="mb-12 rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-96 w-full">
              <Image 
                src={featuredImage} 
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 mb-12">
          {blog.content.split('\n\n').map((paragraph, index) => {
            // Check if paragraph is a heading
            if (paragraph.startsWith('# ')) {
              return <h2 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h2>;
            } else if (paragraph.startsWith('## ')) {
              return <h3 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h3>;
            } else if (paragraph.startsWith('### ')) {
              return <h4 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.substring(4)}</h4>;
            }
            // Check if paragraph is a list
            else if (paragraph.includes('* ') || paragraph.includes('- ') || /^\d+\./.test(paragraph)) {
              const items = paragraph.split('\n').filter(item => item.trim());
              return (
                <ul key={index} className="list-disc pl-6 my-4 space-y-2">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700">
                      {item.replace(/^[*\-]\s*|\d+\.\s*/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            // Regular paragraph
            else if (paragraph.trim()) {
              return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
            }
            return null;
          })}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a 
            href="/blog" 
            className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center"
          >
            ← Back to all articles
          </a>
        </div>
      </div>
    </article>
  );
}
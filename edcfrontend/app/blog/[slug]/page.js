import Head from 'next/head';

async function getBlog(slug) {
  try {
    console.log('🔄 Fetching blog with slug:', slug);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`, {
      cache: 'no-store'
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      console.log('❌ API response not OK');
      return null;
    }
    
    const data = await res.json();
    console.log('API data:', data);
    
    return data.success ? data.data : null;
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
    return null;
  }
}

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
          <p className="text-gray-600">Slug: {slug}</p>
          <p className="text-sm text-gray-500 mt-2">
            Check backend API: ${process.env.NEXT_PUBLIC_API_URL}/api/blogs/{slug}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.metaTitle}</title>
        <meta name="description" content={blog.metaDescription} />
        <meta
  name="keywords"
  content={Array.isArray(blog.keywords) ? blog.keywords.join(', ') : blog.keywords}
/>

        <link rel="canonical" href={`http://localhost:3000/blog/${blog.slug}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={blog.metaTitle} />
        <meta property="og:description" content={blog.metaDescription} />
        <meta property="og:type" content="article" />
        {blog.featuredImage && (
          <meta property="og:image" content={blog.featuredImage} />
        )}
      </Head>

      <article className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>
            <div className="text-gray-600 flex justify-center items-center gap-4">
              <span>By {blog.author}</span>
              <span>•</span>
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
          </header>

          {blog.featuredImage && (
            <div className="mb-12">
              <img 
                src={blog.featuredImage} 
                alt={blog.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ 
              __html: blog.content
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\* (.*?)(?=\n|$)/g, '<li>$1</li>')
                .replace(/(\d+\.) (.*?)(?=\n|$)/g, '<li>$2</li>')
            }}
          />
        </div>
      </article>
    </>
  );
}
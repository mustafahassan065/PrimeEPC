import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://primeepcdesign.co.uk';

async function getBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
    if (Array.isArray(data.blogs)) {
      return data.blogs;
    }
    return [];
  } catch (error) {
    console.error('Error fetching blogs on server:', error);
    return [];
  }
}

const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath.trim() === '') return '/images/blog-default.png';
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

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              EPC Blog &amp; Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights on Energy Performance Certificates, property efficiency, and regulations.
            </p>
          </div>

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
                const imageUrl = getImageUrl(blog.featured_image);
                const dateStr = formatDate(blog);

                return (
                  <article
                    key={blog.id || blog.slug}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
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
                      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {blog.excerpt || blog.meta_description || 'Read more about this topic...'}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
                        <span>{dateStr}</span>
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
        </div>
      </section>
    </div>
  );
}
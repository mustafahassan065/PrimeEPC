// app/blog/[slug]/page.js
import Head from 'next/head';
import Image from 'next/image';

const API_URL = 'https://primeepcdesign.co.uk'

async function getBlog(slug) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found | Prime EPC' };
  return {
    title: `${blog.meta_title || blog.title} | Prime EPC & Design Consultants`,
    description: blog.meta_description || blog.excerpt || 'EPC blog article',
    keywords: Array.isArray(blog.keywords) ? blog.keywords.join(', ') : blog.keywords || 'EPC',
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || 'EPC blog article',
      type: 'article',
      images: (blog.featured_image || blog.featuredImage)
        ? [{ url: getImageUrl(blog.featured_image || blog.featuredImage) }]
        : [],
    },
  };
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return imagePath;
  return `/images/${imagePath}`;
};

// ── Render inline bold/italic inside a text string ──────────────────────────
// Handles **bold**, *italic*, and plain text — returns React nodes
function renderInline(text, keyPrefix) {
  // Split on **...** and *...* patterns
  const parts = [];
  // Regex: captures **bold** and *italic* tokens
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;
  let partIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    // Plain text before match
    if (match.index > lastIndex) {
      parts.push(
        <span key={`${keyPrefix}-t${partIdx++}`}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }
    const token = match[0];
    if (token.startsWith('**')) {
      // Bold
      parts.push(
        <strong key={`${keyPrefix}-b${partIdx++}`} className="font-bold text-gray-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      // Italic
      parts.push(
        <em key={`${keyPrefix}-i${partIdx++}`}>
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = match.index + token.length;
  }
  // Remaining plain text
  if (lastIndex < text.length) {
    parts.push(
      <span key={`${keyPrefix}-t${partIdx++}`}>
        {text.slice(lastIndex)}
      </span>
    );
  }
  return parts.length > 0 ? parts : text;
}

// ── Render a single block (paragraph / heading / list) ──────────────────────
function renderBlock(block, index) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  // H1  (#)
  if (/^# /.test(trimmed)) {
    return (
      <h1 key={index} className="text-4xl font-bold text-gray-900 mt-10 mb-5">
        {renderInline(trimmed.slice(2), `h1-${index}`)}
      </h1>
    );
  }
  // H2  (##)
  if (/^## /.test(trimmed)) {
    return (
      <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
        {renderInline(trimmed.slice(3), `h2-${index}`)}
      </h2>
    );
  }
  // H3  (###)
  if (/^### /.test(trimmed)) {
    return (
      <h3 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
        {renderInline(trimmed.slice(4), `h3-${index}`)}
      </h3>
    );
  }
  // H4  (####)
  if (/^#### /.test(trimmed)) {
    return (
      <h4 key={index} className="text-xl font-bold text-gray-900 mt-5 mb-2">
        {renderInline(trimmed.slice(5), `h4-${index}`)}
      </h4>
    );
  }

  // Bullet list block — each line starts with - or *
  const lines = trimmed.split('\n');
  const isList = lines.every(l => /^[-*✔]\s/.test(l.trim()) || l.trim() === '');
  if (isList) {
    return (
      <ul key={index} className="list-disc pl-6 my-4 space-y-2">
        {lines
          .filter(l => l.trim())
          .map((item, i) => (
            <li key={i} className="text-gray-700">
              {renderInline(item.replace(/^[-*✔]\s*/, '').trim(), `li-${index}-${i}`)}
            </li>
          ))}
      </ul>
    );
  }

  // Numbered list block
  const isNumList = lines.every(l => /^\d+\.\s/.test(l.trim()) || l.trim() === '');
  if (isNumList) {
    return (
      <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
        {lines
          .filter(l => l.trim())
          .map((item, i) => (
            <li key={i} className="text-gray-700">
              {renderInline(item.replace(/^\d+\.\s*/, '').trim(), `ol-${index}-${i}`)}
            </li>
          ))}
      </ol>
    );
  }

  // Regular paragraph (may contain inline bold/italic)
  return (
    <p key={index} className="mb-4 leading-relaxed text-gray-700">
      {renderInline(trimmed, `p-${index}`)}
    </p>
  );
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Blog not found</h1>
          <p className="text-gray-600">The blog post could not be found.</p>
          <a href="/blog" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Back to Blog List
          </a>
        </div>
      </div>
    );
  }

  const featuredImage = getImageUrl(blog.featured_image || blog.featuredImage);

  // ── Date: use created_at (snake_case from DB) ──
  const rawDate = blog.created_at || blog.createdAt;
  const displayDate = rawDate
    ? new Date(rawDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    : '';

  // Split content into blocks on blank lines
  const blocks = (blog.content || '').split(/\n\n+/);

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
            {displayDate && (
              <time dateTime={rawDate}>{displayDate}</time>
            )}
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

        {/* Blog Content — fully rendered */}
        <div className="prose prose-lg max-w-none mb-12">
          {blocks.map((block, index) => renderBlock(block, index))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/blog" className="text-green-600 hover:text-green-700 font-semibold inline-flex items-center">
            ← Back to all articles
          </a>
        </div>
      </div>
    </article>
  );
}
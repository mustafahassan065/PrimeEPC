import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

function getCandidateUrls(slug) {
  return [
    process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}` : null,
    `http://127.0.0.1:5000/api/blogs/${slug}`,
    `http://localhost:5000/api/blogs/${slug}`,
    `https://www.primeepcdesign.co.uk/api/blogs/${slug}`,
    `https://primeepcdesign.co.uk/api/blogs/${slug}`,
  ].filter(Boolean);
}

async function getBlog(slug) {
  for (const url of getCandidateUrls(slug)) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(url, {
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) continue;
      const data = await res.json();
      if (data.success && data.data) return data.data;
      if (data.blog) return data.blog;
      if (data.data) return data.data;
    } catch {
      continue;
    }
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found | Prime EPC' };
  const imageUrl = getImageUrl(blog.featured_image || blog.featuredImage);
  const keywords = parseKeywords(blog.keywords);

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt || 'EPC, EICR & MEES compliance insights for Greater Manchester property owners.',
    keywords: keywords.length > 0 ? keywords : ['EPC Manchester', 'Energy Performance Certificate', 'MEES compliance', 'Commercial EPC', 'Landlord EICR'],
    alternates: {
      canonical: `https://www.primeepcdesign.co.uk/blog/${slug}`,
    },
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || 'EPC blog article',
      type: 'article',
      url: `https://www.primeepcdesign.co.uk/blog/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || 'EPC blog article',
      images: imageUrl ? [imageUrl] : [],
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
function renderInline(text, keyPrefix) {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;
  let partIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`${keyPrefix}-t${partIdx++}`}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(
        <strong key={`${keyPrefix}-b${partIdx++}`} className="font-bold text-gray-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <em key={`${keyPrefix}-i${partIdx++}`}>
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = match.index + token.length;
  }
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
  const isList = lines.every((l) => /^[-*✔]\s/.test(l.trim()) || l.trim() === '');
  if (isList) {
    return (
      <ul key={index} className="list-disc pl-6 my-4 space-y-2">
        {lines
          .filter((l) => l.trim())
          .map((item, i) => (
            <li key={i} className="text-gray-700">
              {renderInline(item.replace(/^[-*✔]\s*/, '').trim(), `li-${index}-${i}`)}
            </li>
          ))}
      </ul>
    );
  }

  // Numbered list block
  const isNumList = lines.every((l) => /^\d+\.\s/.test(l.trim()) || l.trim() === '');
  if (isNumList) {
    return (
      <ol key={index} className="list-decimal pl-6 my-4 space-y-2">
        {lines
          .filter((l) => l.trim())
          .map((item, i) => (
            <li key={i} className="text-gray-700">
              {renderInline(item.replace(/^\d+\.\s*/, '').trim(), `ol-${index}-${i}`)}
            </li>
          ))}
      </ol>
    );
  }

  // Regular paragraph
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
    notFound();
  }

  const featuredImage = getImageUrl(blog.featured_image || blog.featuredImage);
  const keywords = parseKeywords(blog.keywords);

  // ── Date: use created_at (snake_case from DB) ──
  const rawDate = blog.created_at || blog.createdAt;
  const displayDate = rawDate
    ? new Date(rawDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  // Split content into blocks on blank lines
  const blocks = (blog.content || '').split(/\n\n+/);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.meta_description || blog.excerpt || blog.title,
    keywords: keywords.join(', '),
    articleSection: 'Property Energy & Compliance Guides',
    image: featuredImage ? [featuredImage] : undefined,
    datePublished: blog.created_at || blog.createdAt,
    dateModified: blog.updated_at || blog.updatedAt || blog.created_at || blog.createdAt,
    author: {
      '@type': 'Organization',
      name: 'Prime EPC & Design Consultants',
      url: 'https://www.primeepcdesign.co.uk',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Prime EPC & Design Consultants',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.primeepcdesign.co.uk/images/logo3.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.primeepcdesign.co.uk/blog/${slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-white py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>
          <div className="text-gray-600 flex justify-center items-center gap-4 text-sm">
            <span>By {blog.author || 'Prime EPC'}</span>
            <span>•</span>
            {displayDate && <time dateTime={rawDate}>{displayDate}</time>}
          </div>
        </header>

        {/* Targeted Topics & Keywords Strip */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Targeted Topics:</span>
            {keywords.map((kw, i) => (
              <span
                key={i}
                className="bg-[#016837]/10 text-[#016837] text-xs font-semibold px-3 py-1 rounded-full border border-[#016837]/20"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}

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

        {/* Assessor Booking Callout */}
        <div className="my-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-[#016837]/20 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold text-[#016837] uppercase tracking-wider mb-1">Direct Assessor Booking</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Need an EPC, Commercial SBEM, or Landlord EICR?</h3>
              <p className="text-sm text-gray-600 max-w-xl">
                Accredited assessments across Greater Manchester, Merseyside, Lancashire, and Cheshire. Domestic EPCs from £50, commercial from £144, EICRs from £110. Fast 24–48h lodgement.
              </p>
            </div>
            <Link
              href="/booking"
              className="bg-[#016837] hover:bg-[#01572E] text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors whitespace-nowrap flex-shrink-0 text-sm"
            >
              Book Assessment Now →
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link href="/blog" className="text-[#016837] hover:text-[#01572E] font-semibold inline-flex items-center gap-1">
            <span>←</span>
            <span>Back to all compliance articles</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
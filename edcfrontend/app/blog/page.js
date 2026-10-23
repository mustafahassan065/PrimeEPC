import BlogListClient from './BlogListClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'EPC & Property Compliance Blog | Energy & Electrical Guides Manchester',
  description: 'Expert guides on EPC regulations, 2030 MEES compliance, landlord EICR electrical testing, and domestic & commercial energy ratings across Greater Manchester.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/blog',
  },
  openGraph: {
    title: 'EPC & Property Compliance Blog | Energy & Electrical Guides Manchester',
    description: 'Expert guides on EPC regulations, 2030 MEES compliance, landlord EICR testing, and commercial SBEM calculations.',
    url: 'https://www.primeepcdesign.co.uk/blog',
    type: 'website',
  },
};

const CANDIDATE_URLS = [
  process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/blogs` : null,
  'http://127.0.0.1:5000/api/blogs',
  'http://localhost:5000/api/blogs',
  'https://www.primeepcdesign.co.uk/api/blogs',
  'https://primeepcdesign.co.uk/api/blogs',
].filter(Boolean);

async function getBlogs() {
  for (const url of CANDIDATE_URLS) {
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
      const list = Array.isArray(data.data) ? data.data : Array.isArray(data.blogs) ? data.blogs : [];
      if (list.length > 0) {
        return list;
      }
    } catch {
      // Try next candidate URL
      continue;
    }
  }
  return [];
}

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              EPC Blog &amp; Compliance Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Accredited assessor guides on Energy Performance Certificates, 2030 MEES regulations, and electrical safety standards.
            </p>
          </div>

          <BlogListClient initialBlogs={blogs} />
        </div>
      </section>
    </div>
  );
}
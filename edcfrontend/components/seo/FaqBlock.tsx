import JsonLd from './JsonLd'

export type Faq = { q: string; a: string }

export default function FaqBlock({ faqs, title = 'Frequently asked questions', schema = true }:
  { faqs: Faq[]; title?: string; schema?: boolean }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-[#282828] mb-8">{title}</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q}
              className="bg-[#F8F8F8] rounded-2xl p-5 border border-[#80C531]/20 open:shadow-md">
              <summary className="cursor-pointer font-semibold text-lg text-[#282828]">{f.q}</summary>
              <p className="mt-3 text-[#282828]/80 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      {schema && (
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }} />
      )}
    </section>
  )
}
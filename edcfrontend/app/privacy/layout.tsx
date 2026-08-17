import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Prime EPC & Design Consultants Manchester',
  description: 'Learn how Prime EPC & Design Consultant Ltd collects, protects, and uses customer information across Greater Manchester.',
  keywords: ['Prime EPC Privacy Policy', 'Data Protection', 'GDPR Compliance EPC Manchester'],
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

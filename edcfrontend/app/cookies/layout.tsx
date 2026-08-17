import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Prime EPC & Design Consultants Manchester',
  description: 'Understand how Prime EPC uses cookies and analytical tracking to improve user experience on our website.',
  keywords: ['Prime EPC Cookie Policy', 'Cookie Preferences', 'Website Analytics'],
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/cookies' },
  robots: { index: true, follow: true },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

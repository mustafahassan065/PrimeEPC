import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Prime EPC & Design Consultants Manchester',
  description: 'Terms of service, policies, and booking terms for Prime EPC & Design Consultant Ltd across Greater Manchester.',
  keywords: ['Prime EPC Terms', 'EPC Service Agreement Manchester', 'Terms and Conditions'],
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/terms' },
  robots: { index: true, follow: true },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

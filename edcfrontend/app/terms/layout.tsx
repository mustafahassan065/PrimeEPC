import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Policies | Prime EPC & Design Consultants',
  description: 'Terms of service, policies, and booking terms for Prime EPC & Design Consultant Ltd.',
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/terms' },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

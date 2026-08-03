import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Prime EPC & Design Consultants',
  description: 'Privacy policy and data protection information for Prime EPC & Design Consultant Ltd.',
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/privacy' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

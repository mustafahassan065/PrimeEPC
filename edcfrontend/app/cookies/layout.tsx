import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Prime EPC & Design Consultants',
  description: 'Cookie policy and cookie preferences for Prime EPC & Design Consultant Ltd website.',
  alternates: { canonical: 'https://www.primeepcdesign.co.uk/cookies' },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

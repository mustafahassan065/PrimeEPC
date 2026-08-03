import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Why Choose Prime EPC | Manchester's Trusted Energy Assessors",
  description:
    'Discover why landlords and property managers trust Prime EPC. Accredited assessors, transparent pricing, and 4.9-star Trustpilot rating across Greater Manchester.',
  alternates: {
    canonical: 'https://www.primeepcdesign.co.uk/why-us',
  },
  openGraph: {
    title: "Why Choose Prime EPC | Manchester's Trusted Energy Assessors",
    description:
      'Discover why landlords and property managers trust Prime EPC. Accredited assessors, transparent pricing, and 4.9-star Trustpilot rating across Greater Manchester.',
    url: 'https://www.primeepcdesign.co.uk/why-us',
  },
}

export default function WhyUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

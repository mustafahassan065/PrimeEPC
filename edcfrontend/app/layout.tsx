import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MobileStickyBar from '../components/MobileStickyBar'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.primeepcdesign.co.uk'),
  title: {
    default: 'EPC Bolton & Greater Manchester from £50 | Prime EPC',
    template: '%s | Prime EPC',
  },
  description:
    'Accredited EPC assessor based in Bolton. Domestic EPCs from £50, commercial EPCs ' +
    'from £144 and landlord EICRs from £110 across Greater Manchester. Book online.',
  applicationName: 'Prime EPC & Design Consultants',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    siteName: 'Prime EPC & Design Consultants',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/images/logo3.png', width: 800, height: 600, alt: 'Prime EPC & Design Consultants' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/images/logo3.png', apple: '/images/logo3.png' },
  verification: { google: 'mQxn7SVa8G1rV70dryF0VWbsfZKSAj11i2zR7MgFCTk' },
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Favicon — circular, crisp, no blur */}
        <link rel="icon" href="/images/logo3.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/images/logo3.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo3.png" />
        <style>{`
          /* Force browser tab icon to render as circle */
          link[rel="icon"] {
            border-radius: 50%;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className={inter.className}>
        <LocalBusinessSchema />
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  )
}
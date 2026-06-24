import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import type { ReactNode } from "react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prime EPC and Design Consultants - Quick & Reliable EPC Certificates',
  description:
    'Get your Energy Performance Certificate within 24-48 hours. Accredited assessors serving across the Manchester.',
  icons: {
    icon: '/images/logo3.png',
    shortcut: '/images/logo3.png',
    apple: '/images/logo3.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
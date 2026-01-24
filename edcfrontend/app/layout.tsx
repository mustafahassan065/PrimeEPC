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
    icon: '/images/logo3.png',      // browser tab icon
    shortcut: '/images/logo3.png',
    apple: '/images/logo3.png',
  },
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

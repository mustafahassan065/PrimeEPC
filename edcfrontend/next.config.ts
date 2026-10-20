import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path((?!api/).*)',
        has: [{ type: 'host', value: 'primeepcdesign.co.uk' }],
        destination: 'https://www.primeepcdesign.co.uk/:path*',
        permanent: true,
      },
      { source: '/areas', destination: '/areas-we-serve', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/blog/how-to-get-home-epc-c-rating-manchester', destination: '/blog/improve-epc-rating-manchester', permanent: true },
      { source: '/blog/how-to-get-property-epc-c-rating-manchester', destination: '/blog/improve-epc-rating-manchester', permanent: true },
      { source: '/blog/commercial-epcs-manchester-rules', destination: '/blog/epc-regulations-commercial-property-manchester', permanent: true },
    ]
  },
}

export default nextConfig

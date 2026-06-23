import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free QR Code Generator | Create Custom QR Codes Online | CruxLogic',
  description: 'Create free custom QR codes for URLs, WiFi, vCards, email, and phone numbers. Customize colors and size. Download as PNG or SVG, no signup required.',
  keywords: ['free QR code generator', 'QR code maker', 'custom QR code', 'WiFi QR code', 'vCard QR code', 'URL QR code', 'QR code creator', 'business QR code', 'contact QR code'],
  openGraph: {
    title: 'Free QR Code Generator - Create Custom QR Codes',
    description: 'Create free custom QR codes for URLs, WiFi, contact cards, and more. Customize colors, download as PNG or SVG. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/qr-code-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator - Custom QR Codes',
    description: 'Generate custom QR codes for free. URLs, WiFi, contact cards, and more. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/qr-code-generator',
  },
}

export default function QRCodeGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

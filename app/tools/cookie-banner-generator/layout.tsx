import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free GDPR Cookie Banner Generator | Cookie Consent | CruxLogic',
  description: 'Create GDPR-compliant cookie consent banners for free. Customize colors, position, and text. Copy-paste ready HTML/CSS code. No signup required.',
  keywords: ['GDPR cookie banner', 'cookie consent banner', 'cookie banner generator', 'GDPR compliance', 'cookie notice', 'privacy banner', 'EU cookie law', 'consent popup'],
  openGraph: {
    title: 'Free GDPR Cookie Banner Generator',
    description: 'Create compliant cookie consent banners. Customize design, copy HTML code. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/cookie-banner-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free GDPR Cookie Banner Generator',
    description: 'Create GDPR-compliant cookie banners for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/cookie-banner-generator',
  },
}

export default function CookieBannerGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

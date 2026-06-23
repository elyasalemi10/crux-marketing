import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Business Letter Generator | Create Professional Letters | CruxLogic',
  description: 'Create professional business letters for free. Choose from formal, inquiry, complaint, and thank you templates. Download as PDF, no signup required.',
  keywords: ['business letter generator', 'formal letter template', 'business letter maker', 'professional letter generator', 'letter template', 'PDF letter', 'business correspondence'],
  openGraph: {
    title: 'Free Business Letter Generator - Create Professional Letters',
    description: 'Create professional business letters in minutes. Multiple templates, download as PDF. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/business-letter-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Business Letter Generator',
    description: 'Create and download professional business letters for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/business-letter-generator',
  },
}

export default function BusinessLetterGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

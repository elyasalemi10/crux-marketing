import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Quote Generator | Create Professional Quotes & Estimates | CruxLogic',
  description: 'Generate professional quotes and estimates for free. Add your logo, multiple line items, terms, and download as PDF. Perfect for businesses, contractors, and service providers. No signup required.',
  keywords: ['free quote generator', 'estimate generator', 'quotation maker', 'create quote online', 'quote template', 'PDF quote', 'business quote', 'proposal generator', 'estimate maker free'],
  openGraph: {
    title: 'Free Quote Generator - Create & Download PDF Quotes',
    description: 'Create professional quotes and estimates in seconds. Add your logo, line items, terms, and download as PDF. 100% free, no signup required.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/quote-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Quote Generator - Create Professional Estimates',
    description: 'Create and download professional PDF quotes and estimates for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/quote-generator',
  },
}

export default function QuoteGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

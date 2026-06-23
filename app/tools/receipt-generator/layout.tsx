import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Receipt Generator | Create Professional Receipts Online | CruxLogic',
  description: 'Create professional receipts for free. Add items, tax, and business details. Download as PDF instantly, no signup required. Perfect for small businesses and freelancers.',
  keywords: ['free receipt generator', 'receipt maker', 'receipt template', 'create receipt online', 'PDF receipt', 'business receipt', 'sales receipt generator', 'printable receipt'],
  openGraph: {
    title: 'Free Receipt Generator - Create & Download PDF Receipts',
    description: 'Create professional receipts in seconds. Add items, tax, customize details, and download as PDF. 100% free, no signup required.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/receipt-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Receipt Generator',
    description: 'Create and download professional PDF receipts for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/receipt-generator',
  },
}

export default function ReceiptGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

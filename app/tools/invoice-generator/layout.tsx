import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Invoice Generator | Create Professional Invoices Online | CruxLogic',
  description: 'Create professional invoices for free. Add your logo, multiple line items, tax calculations, and download as PDF. Perfect for freelancers, contractors, and small businesses. No signup required.',
  keywords: ['free invoice generator', 'invoice maker', 'create invoice online', 'invoice template', 'PDF invoice', 'invoice generator free', 'online invoice creator', 'business invoice', 'freelancer invoice'],
  openGraph: {
    title: 'Free Invoice Generator - Create & Download PDF Invoices',
    description: 'Create professional invoices in seconds. Add your logo, line items, tax, and download as PDF. 100% free, no signup required.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/invoice-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Invoice Generator - Create Professional Invoices',
    description: 'Create and download professional PDF invoices for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/invoice-generator',
  },
}

export default function InvoiceGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

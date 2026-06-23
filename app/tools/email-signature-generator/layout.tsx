import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Email Signature Generator | Create HTML Signatures | CruxLogic',
  description: 'Create professional HTML email signatures for free. Add social links, customize colors, choose from multiple templates. Works with Gmail, Outlook, and more. No signup required.',
  keywords: ['email signature generator', 'HTML email signature', 'email signature maker', 'professional email signature', 'free email signature', 'Gmail signature', 'Outlook signature', 'signature template'],
  openGraph: {
    title: 'Free Email Signature Generator - Create Professional Signatures',
    description: 'Create beautiful HTML email signatures in seconds. Multiple templates, social links, custom colors. Works with all email clients. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/email-signature-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Signature Generator',
    description: 'Create professional HTML email signatures for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/email-signature-generator',
  },
}

export default function EmailSignatureGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

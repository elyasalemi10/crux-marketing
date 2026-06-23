import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Thank You Card Generator | Create Beautiful Cards | CruxLogic',
  description: 'Create beautiful thank you cards for free. Choose from elegant themes, add your message, and download as high-quality PNG. Perfect for business and personal use. No signup required.',
  keywords: ['thank you card generator', 'thank you card maker', 'free thank you cards', 'printable thank you cards', 'business thank you cards', 'appreciation cards', 'gratitude cards'],
  openGraph: {
    title: 'Free Thank You Card Generator - Create Beautiful Cards',
    description: 'Create stunning thank you cards in seconds. Multiple themes, personalized messages, download as PNG. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/thank-you-card-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Thank You Card Generator',
    description: 'Create beautiful thank you cards for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/thank-you-card-generator',
  },
}

export default function ThankYouCardGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

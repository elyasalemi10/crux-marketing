import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Cover Letter Generator | Create Professional Cover Letters | CruxLogic',
  description: 'Create professional cover letters for free. Customize for any job application with structured sections. Download as PDF, no signup required.',
  keywords: ['cover letter generator', 'cover letter maker', 'free cover letter', 'job application letter', 'professional cover letter', 'cover letter template', 'PDF cover letter'],
  openGraph: {
    title: 'Free Cover Letter Generator - Create Professional Letters',
    description: 'Build compelling cover letters in minutes. Structured sections, professional format, download as PDF. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/cover-letter-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cover Letter Generator',
    description: 'Create and download professional cover letters for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/cover-letter-generator',
  },
}

export default function CoverLetterGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Contract Generator | Create Professional Contracts Online | CruxLogic',
  description: 'Create professional legal contracts for free. Generate service agreements, NDAs, freelance contracts, and consulting agreements. Download as PDF, no signup required.',
  keywords: ['free contract generator', 'contract maker', 'contract template', 'NDA template', 'service agreement', 'freelance contract', 'consulting contract', 'legal document generator', 'free legal templates'],
  openGraph: {
    title: 'Free Contract Generator - Create Professional Legal Contracts',
    description: 'Create professional contracts in minutes. Service agreements, NDAs, freelance & consulting contracts. Download as PDF, 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/contract-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Contract Generator - Create Professional Contracts',
    description: 'Generate professional legal contracts for free. Service agreements, NDAs, and more. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/contract-generator',
  },
}

export default function ContractGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

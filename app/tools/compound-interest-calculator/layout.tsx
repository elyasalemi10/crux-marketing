import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Compound Interest Calculator | Investment Growth Report | CruxLogic',
  description: 'Calculate compound interest and see how your investments grow over time. Visualize returns with regular contributions. Export detailed PDF reports, no signup required.',
  keywords: ['compound interest calculator', 'investment calculator', 'interest rate calculator', 'investment growth', 'savings calculator', 'compound growth', 'retirement calculator', 'financial planning'],
  openGraph: {
    title: 'Free Compound Interest Calculator - Investment Growth Report',
    description: 'Calculate compound interest with regular contributions. Visualize investment growth and export detailed PDF reports. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/compound-interest-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Compound Interest Calculator',
    description: 'Calculate investment growth with compound interest. Export PDF reports. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/compound-interest-calculator',
  },
}

export default function CompoundInterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

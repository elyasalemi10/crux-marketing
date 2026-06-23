import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Loan & Mortgage Calculator | Amortization Schedule | CruxLogic',
  description: 'Calculate loan payments, mortgage costs, and view amortization schedules for free. Include property tax, insurance, and down payment. Export detailed PDF reports, no signup required.',
  keywords: ['free loan calculator', 'mortgage calculator', 'amortization schedule', 'loan payment calculator', 'mortgage payment calculator', 'home loan calculator', 'interest calculator', 'loan amortization', 'monthly payment calculator'],
  openGraph: {
    title: 'Free Loan & Mortgage Calculator with Amortization Schedule',
    description: 'Calculate loan payments and mortgage costs. View full amortization schedules and export detailed PDF reports. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/loan-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Loan & Mortgage Calculator',
    description: 'Calculate loan payments with amortization schedules. Export PDF reports. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/loan-calculator',
  },
}

export default function LoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

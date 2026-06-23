import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Budget Planner | Track Income & Expenses | CruxLogic',
  description: 'Plan your budget with our free online tool. Track income, expenses, and savings rate. Download professional budget reports as PDF. No signup required.',
  keywords: ['budget planner', 'expense tracker', 'income tracker', 'personal finance', 'budget calculator', 'free budget tool', 'savings calculator'],
  openGraph: {
    title: 'Free Budget Planner - Track Income & Expenses',
    description: 'Plan your monthly budget, track expenses by category, and download professional PDF reports. 100% free, no signup required.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/budget-planner',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Budget Planner | CruxLogic',
    description: 'Track your income and expenses. Download professional budget reports as PDF.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/budget-planner',
  },
}

export default function BudgetPlannerLayout({ children }: { children: React.ReactNode }) {
  return children
}

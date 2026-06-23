import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Business Tools | Invoice, Resume, Contract, QR Code & More | CruxLogic',
  description: 'Free online tools for business owners and professionals. Create invoices, resumes, contracts, QR codes, email signatures, meeting agendas, and more. Download as PDF, no signup required.',
  keywords: ['free business tools', 'free invoice generator', 'free resume builder', 'free contract generator', 'free QR code generator', 'loan calculator', 'cover letter generator', 'email signature', 'meeting agenda', 'receipt generator'],
  openGraph: {
    title: 'Free Business Tools - Invoices, Resumes, Contracts & More',
    description: '14+ free tools for business owners and professionals. Create invoices, resumes, contracts, QR codes, and more. Download as PDF. No signup required.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

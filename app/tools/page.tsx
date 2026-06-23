'use client'

import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'
import { Footer } from '@/components/footer'

const FREE_TOOLS = [
  {
    slug: 'invoice-generator',
    title: 'Free Invoice Generator',
    description: 'Create professional invoices with your logo, line items, tax calculations, and download as PDF. Perfect for freelancers and small businesses.',
    icon: '📄',
    category: 'Finance',
  },
  {
    slug: 'quote-generator',
    title: 'Free Quote Generator',
    description: 'Generate professional quotes and estimates for your clients. Add line items, terms, and export as PDF.',
    icon: '📝',
    category: 'Finance',
  },
  {
    slug: 'receipt-generator',
    title: 'Free Receipt Generator',
    description: 'Create professional receipts instantly. Add items, tax, and business details. Download as PDF.',
    icon: '🧾',
    category: 'Finance',
  },
  {
    slug: 'budget-planner',
    title: 'Budget Planner',
    description: 'Plan and track your income and expenses. Visualize savings rate and download budget reports as PDF.',
    icon: '💰',
    category: 'Finance',
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Calculate investment growth with compound interest. Visualize returns over time and export PDF reports.',
    icon: '📈',
    category: 'Finance',
  },
  {
    slug: 'loan-calculator',
    title: 'Loan & Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and generate amortization schedules. Export detailed reports as PDF.',
    icon: '🏠',
    category: 'Finance',
  },
  {
    slug: 'contract-generator',
    title: 'Free Contract Generator',
    description: 'Create professional service agreements, NDAs, and freelance contracts. Customize terms and download as PDF.',
    icon: '📋',
    category: 'Legal',
  },
  {
    slug: 'cover-letter-generator',
    title: 'Cover Letter Generator',
    description: 'Create compelling cover letters for job applications. Structured sections, professional format.',
    icon: '✉️',
    category: 'Career',
  },
  {
    slug: 'email-signature-generator',
    title: 'Email Signature Generator',
    description: 'Create professional HTML email signatures. Add social links, customize colors, works with all email clients.',
    icon: '✍️',
    category: 'Business',
  },
  {
    slug: 'business-letter-generator',
    title: 'Business Letter Generator',
    description: 'Create professional formal letters. Multiple templates for inquiries, complaints, and thank you notes.',
    icon: '💼',
    category: 'Business',
  },
  {
    slug: 'meeting-agenda-generator',
    title: 'Meeting Agenda Generator',
    description: 'Create professional meeting agendas with topics, presenters, and time allocations. Export as PDF.',
    icon: '📅',
    category: 'Business',
  },
  {
    slug: 'graph-generator',
    title: 'Graph & Chart Generator',
    description: 'Create professional bar charts, line graphs, and pie charts. Add custom data and download as PNG.',
    icon: '📊',
    category: 'Business',
  },
  {
    slug: 'thank-you-card-generator',
    title: 'Thank You Card Generator',
    description: 'Create beautiful thank you cards with multiple themes and styles. Download as high-quality PNG.',
    icon: '💝',
    category: 'Personal',
  },
  {
    slug: 'qr-code-generator',
    title: 'Free QR Code Generator',
    description: 'Generate QR codes for URLs, text, WiFi networks, vCards, and more. Download in PNG or SVG format.',
    icon: '🔳',
    category: 'Utility',
  },
  {
    slug: 'cookie-banner-generator',
    title: 'GDPR Cookie Banner Generator',
    description: 'Create compliant cookie consent banners. Customize design and copy ready-to-use HTML code.',
    icon: '🍪',
    category: 'Utility',
  },
]

const categories = [...new Set(FREE_TOOLS.map(t => t.category))]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2bb1ea]/10 text-[#2bb1ea] text-sm font-medium mb-4">
              100% Free, No Signup Required
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Free Tools for Business Owners
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Boost your productivity with our collection of free AI-powered tools. No account needed, no strings attached.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#2bb1ea]/10 hover:text-[#2bb1ea] transition-colors cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Tools grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#2bb1ea]/30"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-600 mb-3">
                  {tool.category}
                </span>
                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#2bb1ea] transition-colors">
                  {tool.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-gradient-to-br from-[#2bb1ea]/10 to-white rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want even more automation?
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              CruxLogic connects to your email, calendar, and tasks to automate your entire workflow with AI.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2bb1ea] text-white font-medium hover:bg-[#2bb1ea]/90 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

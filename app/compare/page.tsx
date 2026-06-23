import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import { comparisons } from '@/data/comparisons'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compare CruxLogic | See How We Stack Up',
  description: 'Compare CruxLogic AI assistant with popular automation tools like Zapier, n8n, Motion, and more.',
  openGraph: {
    title: 'Compare CruxLogic',
    description: 'See how CruxLogic compares to popular automation tools',
    type: 'website',
  },
}

export default function ComparePage() {
  const comparisonList = Object.values(comparisons)

  return (
    <div className="min-h-screen bg-white">
      {/* Orange gradient background */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ 
          height: '400px',
          background: 'linear-gradient(to bottom, #f97316 0%, #f97316 50px, #fb923c 120px, #fed7aa 220px, #ffffff 350px)'
        }}
      />

      <LandingNavbar />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare CruxLogic</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how CruxLogic stacks up against popular automation tools. We believe in transparency — here&apos;s an honest comparison.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {comparisonList.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}`}
              className="group flex items-center gap-5 p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#2bb1ea] hover:shadow-lg transition-all"
            >
              {/* Competitor Logo */}
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={comparison.logo}
                  alt={comparison.name}
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#2bb1ea] transition-colors">
                  CruxLogic vs {comparison.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {comparison.tagline}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {comparison.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#2bb1ea] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#2bb1ea]/10 to-[#2bb1ea]/5 border border-[#2bb1ea]/20">
            <span className="text-gray-700">Ready to try CruxLogic?</span>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-1 text-[#2bb1ea] font-medium hover:underline"
            >
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Link href="/login" className="text-sm text-gray-500 hover:text-[#2bb1ea] mr-6">
            Login
          </Link>
          <span className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CruxLogic Inc. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}

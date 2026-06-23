import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getComparison, getAllComparisonSlugs } from '@/data/comparisons'
import { LandingNavbar } from '@/components/landing-navbar'

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparison(slug)
  
  if (!comparison) {
    return { title: 'Comparison Not Found | CruxLogic' }
  }

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      type: 'website',
    },
  }
}

function FeatureCheck({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    )
  }
  return <span className="text-sm text-gray-600">{value}</span>
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const comparison = getComparison(slug)

  if (!comparison) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Orange gradient background (same as compare list) */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ 
          height: '350px',
          background: 'linear-gradient(to bottom, #f97316 0%, #f97316 40px, #fb923c 100px, #fed7aa 180px, #ffffff 300px)'
        }}
      />

      <LandingNavbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-50 to-white pt-28 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-8 mb-8">
                <Image
                  src="/logos/cruxlogic-favicon.webp"
                  alt="CruxLogic"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                  unoptimized
                />
                <span className="text-4xl font-light text-gray-300">vs</span>
                <Image
                  src={comparison.logo}
                  alt={comparison.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                  unoptimized
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {comparison.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {comparison.description}
              </p>
            </div>
          </div>
        </section>

        {/* Feature Comparison - Side by Side */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Feature Comparison
            </h2>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              {/* Header with logos */}
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                <div className="py-6 px-6 text-center font-medium text-gray-600">
                  Feature
                </div>
                <div className="py-6 px-6 text-center border-l border-gray-200">
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src="/logos/cruxlogic-favicon.webp"
                      alt="CruxLogic"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                      unoptimized
                    />
                    <span className="font-semibold text-[#2bb1ea]">CruxLogic</span>
                  </div>
                </div>
                <div className="py-6 px-6 text-center border-l border-gray-200">
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      src={comparison.logo}
                      alt={comparison.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                      unoptimized
                    />
                    <span className="font-semibold text-gray-700">{comparison.name}</span>
                  </div>
                </div>
              </div>
              
              {/* All features in one list */}
              <div>
                {comparison.features.flatMap(category => category.items).map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`grid grid-cols-3 border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <div className="py-4 px-6 text-gray-900 flex items-center">
                      {item.feature}
                    </div>
                    <div className="py-4 px-6 text-center border-l border-gray-100 flex items-center justify-center">
                      <FeatureCheck value={item.cruxlogic} />
                    </div>
                    <div className="py-4 px-6 text-center border-l border-gray-100 flex items-center justify-center">
                      <FeatureCheck value={item.competitor} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Quick Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* CruxLogic */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#2bb1ea]">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/logos/cruxlogic-favicon.webp"
                    alt="CruxLogic"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    unoptimized
                  />
                  <h3 className="text-xl font-bold text-gray-900">CruxLogic</h3>
                </div>
                <ul className="space-y-3">
                  {comparison.summary.cruxlogic.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#2bb1ea]/20 text-[#2bb1ea] flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Competitor */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={comparison.logo}
                    alt={comparison.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    unoptimized
                  />
                  <h3 className="text-xl font-bold text-gray-900">{comparison.name}</h3>
                </div>
                <ul className="space-y-3">
                  {comparison.summary.competitor.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {comparison.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {comparison.ctaDescription}
            </p>
            <div className="flex items-center justify-center">
              <Link 
                href="/sign-up" 
                className="bg-[#2bb1ea] text-white px-8 py-4 rounded-full hover:bg-[#2bb1ea]/90 font-medium text-lg"
              >
                Start for free
              </Link>
            </div>
          </div>
        </section>

        {/* Other Comparisons */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
              Other Comparisons
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {getAllComparisonSlugs()
                .filter((s) => s !== slug)
                .map((s) => {
                  const comp = getComparison(s)
                  if (!comp) return null
                  return (
                    <Link
                      key={s}
                      href={`/compare/${s}`}
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-[#2bb1ea] hover:shadow-sm transition-all"
                    >
                      <Image
                        src={comp.logo}
                        alt={comp.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                        unoptimized
                      />
                      <span className="text-sm text-gray-700">vs {comp.name}</span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
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

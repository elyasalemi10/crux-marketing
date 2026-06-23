'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { LandingNavbar } from '@/components/landing-navbar'

// Handle OAuth code redirect in a separate component with Suspense
// This catches cases where Supabase redirects to root with ?code= instead of /api/auth/callback
function OAuthRedirectHandler() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (code && typeof window !== 'undefined') {
      // Check if we've already tried to redirect (prevent loops)
      const hasRedirected = sessionStorage.getItem('oauth_redirect_attempted')
      if (!hasRedirected) {
        sessionStorage.setItem('oauth_redirect_attempted', 'true')
        // Redirect to the signup callback route (most common case when landing on homepage with code)
        window.location.href = `/api/auth/callback/signup?code=${code}`
      } else {
        // Clear the flag and let the user see the page
        sessionStorage.removeItem('oauth_redirect_attempted')
      }
    }
  }, [searchParams])

  return null
}

const TIMELINE_SLIDES = [
  {
    number: '01',
    subtitle: 'File Organisation',
    title: 'Your documents, organised automatically',
    description: '"Get the past month of invoices from my email and categorise them in my Google Drive based on date and category." Your AI scans your inbox, extracts attachments, and files them exactly where they belong — no manual sorting required.',
    icon: '📁',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    subtitle: 'Morning Briefings',
    title: 'Every inbox, one summary',
    description: '"Summarise all my emails from both my Gmail accounts and my two Outlook accounts." Wake up to a consolidated briefing across all your email accounts. Your AI reads through everything overnight and delivers what matters.',
    icon: '☀️',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    number: '03',
    subtitle: 'Lead Generation',
    title: 'Prospects found while you sleep',
    description: '"Scrape leads for potential customers every hour during the night, then send me a report in the morning." Your AI works around the clock, finding and qualifying leads so you wake up to a fresh list of opportunities.',
    icon: '🎯',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    number: '04',
    subtitle: 'Customer Support',
    title: 'Never miss an urgent case',
    description: '"Check my emails every hour and respond to customer queries. Message me on Telegram if a case needs escalation." Your AI handles routine support tickets automatically while alerting you to high-priority issues in real-time.',
    icon: '💬',
    gradient: 'from-green-500 to-emerald-500',
  },
]

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineSectionRef = useRef<HTMLDivElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0)
  const [timelineProgress, setTimelineProgress] = useState(0)

  // Handle timeline scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineSectionRef.current) return
      
      const rect = timelineSectionRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const navbarHeight = 80 // ~5rem for navbar
      
      // Section starts when its top reaches the navbar bottom
      // Section ends when its bottom reaches the viewport bottom
      const sectionTop = rect.top - navbarHeight
      const sectionHeight = rect.height
      const scrollableDistance = sectionHeight - viewportHeight + navbarHeight
      
      if (sectionTop <= 0 && sectionTop >= -scrollableDistance) {
        // We're inside the sticky section
        const progress = Math.abs(sectionTop) / scrollableDistance
        const clampedProgress = Math.max(0, Math.min(1, progress))
        
        setTimelineProgress(clampedProgress)
        
        // Calculate which slide should be active
        const slideIndex = Math.min(
          TIMELINE_SLIDES.length - 1,
          Math.floor(clampedProgress * TIMELINE_SLIDES.length)
        )
        setActiveTimelineIndex(slideIndex)
      } else if (sectionTop > 0) {
        // Before section
        setActiveTimelineIndex(0)
        setTimelineProgress(0)
      } else {
        // After section
        setActiveTimelineIndex(TIMELINE_SLIDES.length - 1)
        setTimelineProgress(1)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.playsInline = true
      
      const playVideo = () => {
        video.play().catch((e) => {
          console.error('Video play error:', e)
        })
      }
      
      video.addEventListener('canplay', playVideo)
      video.load()
      
      return () => {
        video.removeEventListener('canplay', playVideo)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Handle OAuth code redirect from Supabase */}
      <Suspense fallback={null}>
        <OAuthRedirectHandler />
      </Suspense>

      {/* Static gradient background - absolute, not fixed */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ 
          height: '600px',
          background: 'linear-gradient(to bottom, #2bb1ea 0%, #2bb1ea 80px, #5ec8f0 180px, #a8e0f7 320px, #ffffff 500px)'
        }}
      />

      {/* Navbar */}
      <LandingNavbar />

      {/* Scrollable content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="pt-24 pb-8 text-center sm:pt-32 lg:pt-40 sm:pb-12">
            <h1 className="shimmer-text mx-auto text-[1.6rem] font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              The AI Assistant you've always wanted
            </h1>
            
            <p className="mx-auto mt-4 sm:mt-6 text-sm text-gray-600 sm:text-base md:text-lg max-w-2xl px-2">
              Manage emails, calendars, and tasks across Google and Microsoft — all from one intelligent dashboard.
            </p>

            <div className="mt-6 sm:mt-8 flex items-center justify-center">
              <Link href="/waitlist">
                <Button 
                  size="lg"
                  className="h-11 sm:h-12 px-6 sm:px-8 bg-[#2bb1ea] text-white hover:bg-[#2bb1ea]/90 shadow-lg font-medium text-sm sm:text-base"
                >
                  Join the waitlist
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Video with Thumbnail */}
          <div id="demo" className="relative mx-auto max-w-4xl pb-10 sm:pb-16 px-2 sm:px-0">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 bg-gray-900">
              {/* Thumbnail shown until video loads */}
              {!videoLoaded && (
                <Image
                  src="/thumbnail.webp"
                  alt="CruxLogic Dashboard Demo"
                  width={1200}
                  height={675}
                  className="w-full"
                  unoptimized
                  priority
                />
              )}
              {/* Video - hidden until loaded, then replaces thumbnail */}
              <video
                ref={videoRef}
                className={`w-full block ${videoLoaded ? '' : 'absolute inset-0 opacity-0'}`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src="https://pub-9ac98018eb6548d584943265bac2b34c.r2.dev/demo.webm" type="video/webm" />
              </video>
            </div>
          </div>

          {/* Integration logos */}
          <div className="pb-12 sm:pb-20">
            <p className="mb-4 sm:mb-6 text-center text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
              Integrates with
            </p>
            
            {/* Infinite Carousel */}
            <div className="relative overflow-hidden py-4">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              {/* Scrolling track - using inline-flex for precise width calculation */}
              <div className="inline-flex animate-scroll-seamless" style={{ width: 'max-content' }}>
                {/* First set of logos - fixed width items */}
                {[1, 2].map((set) => (
                  <div key={set} className="flex items-center shrink-0">
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/gmail.webp" alt="Gmail" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/gcalendar.webp" alt="Google Calendar" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/gtasks.webp" alt="Google Tasks" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/gdrive.webp" alt="Google Drive" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/outlook.webp" alt="Outlook" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/outlook-calendar.webp" alt="Outlook Calendar" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/microsoft-to-do.webp" alt="Microsoft To Do" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/onedrive.webp" alt="OneDrive" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                    <div className="w-20 sm:w-28 flex justify-center"><Image src="/logos/telegram.webp" alt="Telegram" width={48} height={48} className="h-10 sm:h-12 w-auto" unoptimized /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        {/* Full-width Aqua Gradient Line - Taller with soft edges */}
        <div className="w-full h-[120px] sm:h-[180px] md:h-[220px]" style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(43, 177, 234, 0.05) 5%, rgba(43, 177, 234, 0.2) 15%, rgba(43, 177, 234, 0.5) 35%, rgba(43, 177, 234, 0.65) 50%, rgba(43, 177, 234, 0.5) 65%, rgba(43, 177, 234, 0.2) 85%, rgba(43, 177, 234, 0.05) 95%, transparent 100%)'
        }} />
        
        {/* "Your AI that feels alive" - Fixed in center, grey section scrolls over it - Desktop only */}
        <div className="relative md:block hidden" style={{ height: '40vh' }}>
          {/* Fixed headline that stays in center of viewport */}
          <div className="sticky top-0 h-screen flex items-start justify-center bg-white pt-8 sm:pt-12">
            <div className="text-center px-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Your AI that feels </span>
                <span className="animate-pulse-gradient bg-gradient-to-r from-[#2bb1ea] via-[#e879f9] to-[#2bb1ea] bg-[length:200%_auto] bg-clip-text text-transparent">alive</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Timeline Section - Gray section with first card that covers the headline as you scroll */}
        <section ref={timelineSectionRef} className="relative md:block hidden" style={{ height: `${(TIMELINE_SLIDES.length + 1) * 100}vh` }}>
          {/* Sticky container - stays at top while scrolling through section */}
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Gray background that slides up from bottom */}
            <div 
              className="absolute inset-0 bg-gray-100 transition-transform duration-100"
              style={{ 
                transform: `translateY(${Math.max(0, 100 - timelineProgress * 150)}%)`,
              }}
            />
            
            {/* Card Stack Container - First card visible with gray */}
            <div className="relative h-full flex items-center justify-center pt-4 sm:pt-6 pb-16 sm:pb-20 z-10">
              <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6" style={{ height: '500px' }}>
                {TIMELINE_SLIDES.map((slide, idx) => {
                  // Calculate when each card should appear (after gray covers screen)
                  const grayFullyCovered = timelineProgress > 0.15
                  const cardStartProgress = 0.15 + (idx * 0.85 / TIMELINE_SLIDES.length)
                  const cardEndProgress = 0.15 + ((idx + 1) * 0.85 / TIMELINE_SLIDES.length)
                  const cardProgress = grayFullyCovered ? Math.max(0, Math.min(1, (timelineProgress - cardStartProgress) / (cardEndProgress - cardStartProgress))) : 0
                  
                  const isFirstCard = idx === 0
                  const isVisible = isFirstCard ? grayFullyCovered : cardProgress > 0
                  const isFullyVisible = isFirstCard ? grayFullyCovered : cardProgress >= 1
                  
                  const translateY = isFirstCard 
                    ? (grayFullyCovered ? 0 : 500) 
                    : (isVisible ? Math.max(0, (1 - cardProgress) * 500) : 500)
                  const scale = isFullyVisible ? 1 - (activeTimelineIndex - idx) * 0.08 : 1
                  const opacity = isVisible ? 1 : 0
                  
                  return (
                    <div
                      key={idx}
                      className="absolute inset-x-0 top-0 transition-all duration-500 ease-out"
                      style={{
                        transform: `translateY(${translateY}px) scale(${Math.max(0.95, scale)})`,
                        opacity,
                        zIndex: idx + 1,
                      }}
                    >
                      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                        <div className="flex flex-col md:flex-row">
                          {/* Left - Content */}
                          <div className="flex-1 p-6 sm:p-8 md:p-12">
                            {/* Slide Counter */}
                            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                              <span className="text-gray-900 font-semibold">{slide.number}</span>
                              <span className="mx-2">/</span>
                              <span>0{TIMELINE_SLIDES.length}</span>
                              <span className="ml-3 sm:ml-4 text-[#2bb1ea] font-medium">{slide.subtitle}</span>
                            </p>
                            
                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
                              {slide.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                              {slide.description}
                            </p>
                            
                            {/* CTA */}
                            <Link href="/waitlist">
                              <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-5 sm:px-6 py-2 sm:py-2.5 h-auto text-xs sm:text-sm">
                                Start building
                              </Button>
                            </Link>
                          </div>
                          
                          {/* Right - Icon */}
                          <div 
                            className={`flex-1 relative min-h-[200px] sm:min-h-[300px] md:min-h-[400px] bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}
                          >
                            <span className="text-[100px] sm:text-[140px] md:text-[180px] opacity-90 drop-shadow-lg">
                              {slide.icon}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20" style={{ opacity: timelineProgress > 0.15 ? 1 : 0, transition: 'opacity 0.3s' }}>
              {TIMELINE_SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-full transition-all duration-300 ${
                    idx <= activeTimelineIndex 
                      ? 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#2bb1ea]' 
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {/* Scroll hint - only show after gray covers screen */}
            {activeTimelineIndex === 0 && timelineProgress > 0.15 && (
              <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 flex flex-col items-center gap-1 text-gray-400 animate-pulse z-20">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider">Scroll</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        </section>
        
        {/* Mobile Timeline Section - Simple scrollable cards */}
        <section className="md:hidden bg-gray-100 py-12">
          <div className="px-4 text-center mb-8">
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Your AI that feels </span>
              <span className="animate-pulse-gradient bg-gradient-to-r from-[#2bb1ea] via-[#e879f9] to-[#2bb1ea] bg-[length:200%_auto] bg-clip-text text-transparent">alive</span>
            </h2>
          </div>
          
          <div className="space-y-6 px-4">
            {TIMELINE_SLIDES.map((slide, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                {/* Icon */}
                <div 
                  className={`relative h-48 bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}
                >
                  <span className="text-[80px] opacity-90 drop-shadow-lg">
                    {slide.icon}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    <span className="text-gray-900 font-semibold">{slide.number}</span>
                    <span className="mx-2">/</span>
                    <span>0{TIMELINE_SLIDES.length}</span>
                    <span className="ml-3 text-[#2bb1ea] font-medium">{slide.subtitle}</span>
                  </p>
                  
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                    {slide.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {slide.description}
                  </p>
                  
                  <Link href="/waitlist">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-5 py-2 h-auto text-xs">
                      Start building
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600">
                Start free, upgrade as you grow.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {/* Free Plan */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">Perfect for trying out CruxLogic</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1,000 interactions/month
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    3 integrations
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Web dashboard
                  </li>
                </ul>
                <Link href="/waitlist">
                  <Button variant="outline" className="w-full h-11 sm:h-12 rounded-full font-medium">
                    Get started free
                  </Button>
                </Link>
              </div>

              {/* Pro Plan - Featured */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#2bb1ea] shadow-lg relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#2bb1ea] text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">$150</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">For professionals who need more power</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    $100 included usage
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited integrations
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Telegram bot access
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority email support
                  </li>
                </ul>
                <Link href="/waitlist">
                  <Button className="w-full h-11 sm:h-12 rounded-full bg-[#2bb1ea] hover:bg-[#2bb1ea]/90 font-medium">
                    Start free trial
                  </Button>
                </Link>
              </div>

              {/* Ultra Plan */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Ultra</h3>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">$300</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">For power users and teams</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    $250 included usage
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Voice calling with AI
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Lower token rates
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Link href="/waitlist">
                  <Button variant="outline" className="w-full h-11 sm:h-12 rounded-full font-medium">
                    Start free trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Full Width */}
        <section className="py-20 sm:py-24 md:py-32 bg-white">
          <div className="px-6 sm:px-10 lg:px-20">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-32">
              {/* Left - Title */}
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                  Frequently<br />asked questions
                </h2>
              </div>

              {/* Right - FAQ Items */}
              <div className="space-y-0">
                {[
                  {
                    question: 'What is CruxLogic?',
                    answer: 'CruxLogic is an AI-powered productivity assistant that connects to your email, calendar, tasks, and cloud storage across both Google and Microsoft platforms. It lets you manage everything through natural conversation.'
                  },
                  {
                    question: 'How do I connect my accounts?',
                    answer: 'Simply click "Connect" next to any integration in your dashboard. You\'ll be redirected to sign in with your Google or Microsoft account using secure OAuth. We never see or store your passwords.'
                  },
                  {
                    question: 'Is my data secure?',
                    answer: 'Absolutely. We use bank-grade encryption for all data in transit and at rest. Your data is never used to train AI models, and you can revoke access to any connected account at any time.'
                  },
                  {
                    question: 'Can I use CruxLogic on mobile?',
                    answer: 'Yes! You can access CruxLogic through our web dashboard on any device. Plus, you can connect your Telegram account to chat with your assistant directly from your phone.'
                  },
                  {
                    question: 'What happens if I exceed my usage limit?',
                    answer: 'If you approach your limit, we\'ll notify you. You can top up your account at any time, or upgrade to a higher plan for more included usage.'
                  },
                ].map((faq, idx) => (
                  <details key={idx} className="group border-t border-gray-200 last:border-b">
                    <summary className="flex items-center justify-between py-6 sm:py-8 cursor-pointer list-none">
                      <span className="text-lg sm:text-xl font-medium text-gray-900 pr-4">{faq.question}</span>
                      <span className="flex-shrink-0 ml-2 text-gray-400 group-open:rotate-45 transition-transform duration-200">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </summary>
                    <div className="pb-6 sm:pb-8 pr-10">
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Interactive Cyan Boxes Grid */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-[#2bb1ea]" />
          
          {/* Interactive boxes grid - diagonal gradient effect */}
          <div 
            className="absolute inset-0 pointer-events-auto"
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(30, 1fr)',
              gridTemplateRows: 'repeat(18, 1fr)',
              gap: '1px',
            }}
          >
            {Array.from({ length: 30 * 18 }).map((_, i) => {
              const cols = 30
              const rows = 18
              const row = Math.floor(i / cols)
              const col = i % cols
              const maxDiagonal = cols + rows - 2
              const diagonalIndex = row + col
              const opacity = Math.max(0, 0.5 - (diagonalIndex / maxDiagonal) * 0.5)
              
              return (
                <div
                  key={i}
                  className="relative group"
                  style={{ aspectRatio: '1' }}
                >
                  <div 
                    className="absolute inset-0 transition-transform duration-75 ease-out group-hover:scale-150"
                    style={{
                      background: `rgba(255, 255, 255, ${opacity})`,
                      transformOrigin: 'center',
                    }}
                  />
                </div>
              )
            })}
          </div>

          {/* Centered card */}
          <div className="relative flex items-center justify-center px-4 z-20 pointer-events-none">
            <div className="bg-[#e8f7fc] rounded-2xl sm:rounded-3xl p-10 sm:p-14 md:p-16 text-center shadow-2xl max-w-md w-full pointer-events-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                So, what are<br />we building?
              </h2>
              <Link href="/waitlist">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 sm:px-8 py-3 h-auto text-base sm:text-lg font-medium inline-flex items-center gap-2">
                  Get started
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#a8e0f7]">
                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 py-10 sm:py-12 md:py-16">
          <div className="px-4 sm:px-6 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
              {/* Brand Column */}
              <div className="col-span-2">
                <Image
                  src="/logos/CruxLogic-Black-Text-Full.webp"
                  alt="CruxLogic"
                  width={200}
                  height={50}
                  className="h-8 sm:h-10 md:h-12 w-auto mb-4 sm:mb-6"
                  unoptimized
                />
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-5 max-w-sm">
                  Your AI assistant that connects all your productivity tools.
                </p>
                <address className="text-xs sm:text-sm md:text-base text-gray-500 not-italic">
                  Level 19, 263 William St<br />
                  Melbourne VIC 3000
                </address>
              </div>

              {/* Product Column */}
              <div>
                <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 uppercase tracking-wider mb-4 sm:mb-6">Product</h4>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                  <li><Link href="#demo" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Demo</Link></li>
                  <li><Link href="/pricing" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Pricing</Link></li>
                  <li><Link href="/login" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Login</Link></li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 uppercase tracking-wider mb-4 sm:mb-6">Resources</h4>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                  <li><Link href="/blog" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Blog</Link></li>
                  <li><Link href="/compare" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Compare</Link></li>
                  <li><Link href="/tools" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Free Tools</Link></li>
                  <li><Link href="/support" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Support</Link></li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 uppercase tracking-wider mb-4 sm:mb-6">Legal</h4>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                  <li><Link href="/privacy-policy" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Terms of Service</Link></li>
                  <li><Link href="/security" className="text-sm sm:text-base md:text-lg text-gray-600 hover:text-[#2bb1ea]">Security</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center md:text-left">
                &copy; {new Date().getFullYear()} CruxLogic Inc. All rights reserved.
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <a href="https://x.com/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://discord.gg/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
                <a href="https://linkedin.com/company/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #4b5563 0%,
            #4b5563 35%,
            #00d4ff 50%,
            #4b5563 65%,
            #4b5563 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </div>
  )
}

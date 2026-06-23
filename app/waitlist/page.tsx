'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'waitlist-page' }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('idle')
        return
      }

      setStatus('success')
    } catch {
      setError('Network error. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingNavbar />

      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-md text-center">
          {status === 'success' ? (
            <div>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <IconCheck className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">You&apos;re on the list!</h1>
              <p className="text-gray-600 mb-8">
                Thanks for joining the CruxLogic waitlist. We&apos;ll email you as soon as your
                spot is ready.
              </p>
              <Link href="/">
                <Button variant="outline" className="rounded-full h-11 px-6">
                  Back to home
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Join the waitlist</h1>
              <p className="text-gray-600 mb-8">
                Be the first to know when CruxLogic opens up. Drop your email and we&apos;ll reach
                out with early access.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Name <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'submitting'}
                  className="w-full h-12 bg-[#2bb1ea] text-white hover:bg-[#2bb1ea]/90 shadow-lg font-medium"
                >
                  {status === 'submitting' ? (
                    <>
                      <IconLoader2 className="h-5 w-5 mr-2 animate-spin" />
                      Joining…
                    </>
                  ) : (
                    'Join the waitlist'
                  )}
                </Button>
              </form>

              <p className="text-xs text-gray-400 mt-4">
                We&apos;ll only use your email to contact you about CruxLogic.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

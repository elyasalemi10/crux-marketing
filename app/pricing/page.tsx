import { Metadata } from 'next'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing | CruxLogic - AI Assistant',
  description: 'Simple, transparent pricing for CruxLogic AI assistant. Start free, upgrade when you need more.',
  openGraph: {
    title: 'CruxLogic Pricing',
    description: 'Simple, transparent pricing for your AI assistant',
    type: 'website',
  },
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out CruxLogic',
    features: [
      'Connect 1 Google or Microsoft account',
      'Email reading & basic responses',
      'Calendar viewing',
      'Task management',
      'Web dashboard access',
      '50 AI interactions per day',
    ],
    cta: 'Join the Waitlist',
    href: '/waitlist',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For professionals who want more',
    features: [
      'Connect unlimited accounts',
      'Full email management (read, draft, send)',
      'Calendar scheduling & event creation',
      'Advanced task automation',
      'Telegram integration',
      'Voice messages & notes',
      'File search (Drive & OneDrive)',
      'Unlimited AI interactions',
      'Priority support',
    ],
    cta: 'Join the Waitlist',
    href: '/waitlist',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Team management',
      'Advanced security controls',
      'SSO & SAML authentication',
      'Dedicated account manager',
      'SLA guarantees',
      'On-premise deployment option',
    ],
    cta: 'Contact Sales',
    href: 'mailto:sales@cruxlogic.ai',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Green gradient background */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ 
          height: '500px',
          background: 'linear-gradient(to bottom, #10b981 0%, #10b981 50px, #34d399 150px, #a7f3d0 280px, #ffffff 420px)'
        }}
      />

      <LandingNavbar />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? 'border-[#2bb1ea] bg-white shadow-xl shadow-[#2bb1ea]/10 ring-1 ring-[#2bb1ea]'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-[#2bb1ea] px-4 py-1 text-sm font-medium text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#2bb1ea] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`w-full ${
                  plan.highlighted
                    ? 'bg-[#2bb1ea] hover:bg-[#2bb1ea]/90 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
                size="lg"
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-sm text-gray-600">Yes, you can cancel your subscription at any time. No long-term contracts or hidden fees.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-sm text-gray-600">Absolutely. We use bank-level encryption and never store your credentials. You can revoke access anytime.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What happens when I hit my limit?</h3>
              <p className="text-sm text-gray-600">On the free plan, you&apos;ll be notified when approaching your daily limit. Upgrade to Pro for unlimited usage.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-sm text-gray-600">Yes, we offer a 14-day money-back guarantee if you&apos;re not satisfied with Pro.</p>
            </div>
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

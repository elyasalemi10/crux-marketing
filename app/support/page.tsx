import { Metadata } from 'next'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, FileText, HelpCircle, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support | CruxLogic - Get Help',
  description: 'Get help with CruxLogic. Contact our support team, browse FAQs, or join our community.',
  openGraph: {
    title: 'CruxLogic Support',
    description: 'Get help with your AI assistant',
    type: 'website',
  },
}

const supportOptions = [
  {
    title: 'Email Support',
    description: 'Send us an email and we\'ll get back to you within 24 hours.',
    icon: Mail,
    action: 'support@cruxlogic.ai',
    href: 'mailto:support@cruxlogic.ai',
    buttonText: 'Send Email',
  },
  {
    title: 'Discord Community',
    description: 'Join our Discord server to chat with other users and get quick help.',
    icon: MessageCircle,
    action: 'discord.gg/cruxlogic',
    href: 'https://discord.gg/cruxlogic',
    buttonText: 'Join Discord',
    external: true,
  },
  {
    title: 'X (Twitter)',
    description: 'Follow us for updates and reach out via DM.',
    icon: ExternalLink,
    action: '@cruxlogic',
    href: 'https://x.com/cruxlogic',
    buttonText: 'Follow Us',
    external: true,
  },
]

const faqs = [
  {
    question: 'How do I connect my Gmail account?',
    answer: 'Go to Connections in your dashboard, click "Add Connection", and select Gmail. Follow the OAuth prompts to grant CruxLogic access.',
  },
  {
    question: 'Can CruxLogic send emails on my behalf?',
    answer: 'Yes, but only when you explicitly ask it to. You can also enable "Ask before sending" to review emails before they\'re sent.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption, never store your passwords, and you can revoke access at any time using the Kill Switch.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'Go to Settings > Billing and click "Cancel Subscription". You\'ll retain access until the end of your billing period.',
  },
  {
    question: 'Can I use CruxLogic with multiple email accounts?',
    answer: 'Yes! Pro users can connect unlimited Google and Microsoft accounts. Your AI assistant works across all of them seamlessly.',
  },
  {
    question: 'What\'s the Kill Switch?',
    answer: 'The Kill Switch instantly revokes all AI access to your accounts. Use it if you ever need to immediately stop CruxLogic from accessing your data.',
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Pink gradient background */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ 
          height: '450px',
          background: 'linear-gradient(to bottom, #ec4899 0%, #ec4899 50px, #f472b6 140px, #fbcfe8 260px, #ffffff 400px)'
        }}
      />

      <LandingNavbar />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the best way to get support. We&apos;re here to help you get the most out of CruxLogic.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid gap-6 md:grid-cols-3 mb-20">
          {supportOptions.map((option) => {
            const Icon = option.icon
            return (
              <div
                key={option.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2bb1ea]/10 mb-5">
                  <Icon className="h-7 w-7 text-[#2bb1ea]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4 text-base">{option.description}</p>
                <p className="text-sm text-gray-500 mb-5">{option.action}</p>
                <Button asChild className="bg-[#2bb1ea] hover:bg-[#2bb1ea]/90 text-white">
                  <Link 
                    href={option.href} 
                    target={option.external ? '_blank' : undefined}
                    rel={option.external ? 'noopener noreferrer' : undefined}
                  >
                    {option.buttonText}
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>

        {/* FAQs */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <HelpCircle className="h-6 w-6 text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-6 hover:border-[#2bb1ea]/50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{faq.question}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Still need help */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-[#2bb1ea]/10 to-[#2bb1ea]/5 border border-[#2bb1ea]/20">
            <FileText className="h-5 w-5 text-[#2bb1ea]" />
            <span className="text-gray-700 text-base">Still need help?</span>
            <Link
              href="mailto:support@cruxlogic.ai"
              className="inline-flex items-center gap-1 text-[#2bb1ea] font-medium hover:underline text-base"
            >
              Contact us directly
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-5">
                <span className="text-2xl font-bold text-gray-900">CruxLogic</span>
              </Link>
              <p className="text-base text-gray-600 leading-relaxed">
                Your AI assistant that connects all your productivity tools.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Product</h4>
              <ul className="space-y-4">
                <li><Link href="/pricing" className="text-base text-gray-600 hover:text-[#2bb1ea]">Pricing</Link></li>
                <li><Link href="/login" className="text-base text-gray-600 hover:text-[#2bb1ea]">Login</Link></li>
                <li><Link href="/waitlist" className="text-base text-gray-600 hover:text-[#2bb1ea]">Join Waitlist</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="/blog" className="text-base text-gray-600 hover:text-[#2bb1ea]">Blog</Link></li>
                <li><Link href="/compare" className="text-base text-gray-600 hover:text-[#2bb1ea]">Compare</Link></li>
                <li><Link href="/support" className="text-base text-gray-600 hover:text-[#2bb1ea]">Support</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-base text-gray-600 hover:text-[#2bb1ea]">Privacy Policy</Link></li>
                <li><Link href="#" className="text-base text-gray-600 hover:text-[#2bb1ea]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base text-gray-500">
              &copy; {new Date().getFullYear()} CruxLogic Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="https://x.com/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://discord.gg/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="https://linkedin.com/company/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

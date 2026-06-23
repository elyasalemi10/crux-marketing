'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { IconArrowLeft, IconSend, IconCheck } from '@tabler/icons-react'

const INQUIRY_CATEGORIES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'integration', label: 'Integration Request' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'enterprise', label: 'Enterprise Solutions' },
  { value: 'other', label: 'Other' },
]

export default function ContactUsPage() {
  const [category, setCategory] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [notRobot, setNotRobot] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  const selectedCategory = INQUIRY_CATEGORIES.find(c => c.value === category)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!category || !email || !message || !notRobot) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate sending - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <IconCheck className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
          <Link href="/">
            <Button className="bg-[#2bb1ea] hover:bg-[#239cc9]">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <IconArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have a question, feedback, or need help? We&apos;d love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2bb1ea] focus:border-transparent transition-colors"
                >
                  <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedCategory?.label || 'Select a category...'}
                  </span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showCategoryDropdown && (
                  <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
                    {INQUIRY_CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setCategory(cat.value)
                          setShowCategoryDropdown(false)
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          category === cat.value ? 'bg-[#2bb1ea]/10 text-[#2bb1ea]' : 'text-gray-900'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help..."
                required
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Not a Robot Checkbox */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50">
              <Checkbox
                id="not-robot"
                checked={notRobot}
                onCheckedChange={(checked) => setNotRobot(checked === true)}
                className="h-5 w-5"
              />
              <label 
                htmlFor="not-robot" 
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                I&apos;m not a robot
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!category || !email || !message || !notRobot || isSubmitting}
              className="w-full h-12 bg-[#2bb1ea] hover:bg-[#239cc9] text-white font-medium gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Sending...
                </>
              ) : (
                <>
                  <IconSend className="h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Prefer email? Reach us directly at{' '}
              <a href="mailto:support@cruxlogic.com" className="text-[#2bb1ea] hover:underline">
                support@cruxlogic.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

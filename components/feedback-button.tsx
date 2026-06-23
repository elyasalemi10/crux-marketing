'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconMessage, IconX, IconBulb, IconBug, IconQuestionMark, IconRoad, IconSend } from '@tabler/icons-react'

type FeedbackType = 'feature' | 'bug' | 'question' | 'other'

const feedbackTypes: { id: FeedbackType; label: string; icon: typeof IconBulb; color: string }[] = [
  { id: 'feature', label: 'Feature Request', icon: IconBulb, color: 'text-yellow-500' },
  { id: 'bug', label: 'Report a Bug', icon: IconBug, color: 'text-red-500' },
  { id: 'question', label: 'Ask a Question', icon: IconQuestionMark, color: 'text-blue-500' },
  { id: 'other', label: 'Other Feedback', icon: IconRoad, color: 'text-purple-500' },
]

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'type' | 'form'>('type')
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [canSubmit, setCanSubmit] = useState(true)

  useEffect(() => {
    const lastSubmission = localStorage.getItem('feedback_last_submission')
    if (lastSubmission) {
      const lastTime = new Date(lastSubmission).getTime()
      const now = Date.now()
      const hoursSince = (now - lastTime) / (1000 * 60 * 60)
      if (hoursSince < 24) {
        setCanSubmit(false)
      }
    }
  }, [])

  const handleSelectType = (type: FeedbackType) => {
    setSelectedType(type)
    setStep('form')
    setError(null)
  }

  const handleSubmit = async () => {
    if (!selectedType || !title.trim() || !description.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!canSubmit) {
      setError('You can only submit feedback once every 24 hours')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          title: title.trim(),
          description: description.trim(),
          page_url: window.location.href,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback')
      }

      localStorage.setItem('feedback_last_submission', new Date().toISOString())
      setSubmitted(true)
      setCanSubmit(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStep('type')
      setSelectedType(null)
      setTitle('')
      setDescription('')
      setSubmitted(false)
      setError(null)
    }, 300)
  }

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all text-gray-700 hover:text-[#2bb1ea]"
      >
        <IconMessage className="w-5 h-5" />
        <span className="text-sm font-medium">Give Feedback</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* Popup */}
      <div
        className={`fixed bottom-20 right-6 z-50 w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900">
              {submitted ? 'Thank you!' : 'We value your feedback'}
            </h3>
            {!submitted && (
              <p className="text-sm text-gray-500">Help us improve your experience</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">
                Your feedback has been submitted successfully. We appreciate you taking the time to help us improve!
              </p>
            </div>
          ) : step === 'type' ? (
            <div className="space-y-2">
              {feedbackTypes.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => handleSelectType(id)}
                  disabled={!canSubmit}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#2bb1ea]/30 hover:bg-[#2bb1ea]/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className={`p-2 rounded-lg bg-gray-100 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900">{label}</span>
                </button>
              ))}
              {!canSubmit && (
                <p className="text-sm text-amber-600 text-center mt-4">
                  You can submit feedback again in 24 hours
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setStep('type')}
                className="text-sm text-gray-500 hover:text-[#2bb1ea] flex items-center gap-1"
              >
                ← Back
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary of your feedback"
                  className="bg-white"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more details..."
                  className="w-full h-28 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#2bb1ea]/50 focus:border-[#2bb1ea] bg-white"
                  maxLength={1000}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !title.trim() || !description.trim()}
                className="w-full bg-[#2bb1ea] hover:bg-[#2bb1ea]/90"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <IconSend className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

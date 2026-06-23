'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IconArrowLeft, IconDownload, IconHeart } from '@tabler/icons-react'
import html2canvas from 'html2canvas'

const CARD_THEMES = [
  { id: 'elegant', name: 'Elegant', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#ffffff' },
  { id: 'warm', name: 'Warm', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: '#ffffff' },
  { id: 'nature', name: 'Nature', bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', text: '#ffffff' },
  { id: 'sunset', name: 'Sunset', bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', text: '#333333' },
  { id: 'ocean', name: 'Ocean', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#ffffff' },
  { id: 'minimal', name: 'Minimal', bg: '#ffffff', text: '#333333', border: '#e5e5e5' },
  { id: 'gold', name: 'Gold', bg: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)', text: '#ffffff' },
  { id: 'royal', name: 'Royal', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', text: '#f0c674' },
]

const CARD_STYLES = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'playful', name: 'Playful' },
]

export default function ThankYouCardGeneratorPage() {
  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('Thank you so much for your kindness and generosity. Your thoughtfulness means more than words can express.')
  const [theme, setTheme] = useState('elegant')
  const [cardStyle, setCardStyle] = useState('classic')
  const [generating, setGenerating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const selectedTheme = CARD_THEMES.find(t => t.id === theme) || CARD_THEMES[0]

  const downloadCard = async () => {
    if (!cardRef.current) return
    setGenerating(true)
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      })
      
      const link = document.createElement('a')
      link.download = `thank-you-card-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Download error:', error)
    } finally {
      setGenerating(false)
    }
  }

  const getCardContent = () => {
    if (cardStyle === 'modern') {
      return (
        <>
          <div className="text-center">
            <p className="text-6xl mb-4">🙏</p>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>Thank You</h2>
            {recipientName && <p className="text-lg opacity-80">{recipientName}</p>}
          </div>
          <div className="flex-1 flex items-center justify-center px-8">
            <p className="text-center text-lg leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              "{message}"
            </p>
          </div>
          <div className="text-center">
            {senderName && <p className="text-lg">— {senderName}</p>}
          </div>
        </>
      )
    }

    if (cardStyle === 'playful') {
      return (
        <>
          <div className="text-center">
            <div className="text-5xl mb-2">✨ 💝 ✨</div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: 'cursive' }}>Thank You!</h2>
          </div>
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center">
              {recipientName && <p className="text-xl mb-4">Dear {recipientName},</p>}
              <p className="text-lg leading-relaxed">{message}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💖</div>
            {senderName && <p className="text-lg font-medium">With love, {senderName}</p>}
          </div>
        </>
      )
    }

    // Classic style
    return (
      <>
        <div className="text-center pt-4">
          <div className="w-16 h-0.5 mx-auto mb-4" style={{ backgroundColor: selectedTheme.text, opacity: 0.3 }} />
          <h2 className="text-4xl font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Thank You
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: selectedTheme.text, opacity: 0.3 }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-10">
          {recipientName && (
            <p className="text-xl mb-6 opacity-80">Dear {recipientName},</p>
          )}
          <p className="text-center text-lg leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
            {message}
          </p>
        </div>
        <div className="text-center pb-4">
          {senderName && (
            <p className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              With gratitude,<br />
              <span className="font-medium">{senderName}</span>
            </p>
          )}
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <IconArrowLeft className="h-4 w-4" />
          <span>Back to tools</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white">
            <IconHeart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thank You Card Generator</h1>
            <p className="text-gray-600">Create beautiful thank you cards</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Card Details</h2>
              <Input placeholder="Recipient's Name" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
              <Textarea
                placeholder="Your thank you message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <Input placeholder="Your Name" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Card Style</h2>
              <div className="flex gap-2">
                {CARD_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCardStyle(s.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      cardStyle === s.id ? 'bg-[#2bb1ea] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Color Theme</h2>
              <div className="grid grid-cols-4 gap-3">
                {CARD_THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`h-12 rounded-lg transition-all ${
                      theme === t.id ? 'ring-2 ring-offset-2 ring-[#2bb1ea] scale-105' : ''
                    }`}
                    style={{
                      background: t.bg,
                      border: t.border ? `2px solid ${t.border}` : 'none',
                    }}
                    title={t.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="flex justify-center">
                <div
                  ref={cardRef}
                  className="w-[400px] h-[560px] rounded-2xl shadow-2xl flex flex-col justify-between p-8 overflow-hidden"
                  style={{
                    background: selectedTheme.bg,
                    color: selectedTheme.text,
                    border: selectedTheme.border ? `2px solid ${selectedTheme.border}` : 'none',
                  }}
                >
                  {getCardContent()}
                </div>
              </div>
            </div>

            <Button
              onClick={downloadCard}
              disabled={generating}
              className="w-full h-12 bg-[#2bb1ea] hover:bg-[#239cc9] gap-2"
            >
              {generating ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Generating...
                </>
              ) : (
                <>
                  <IconDownload className="h-4 w-4" />
                  Download Card (PNG)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IconArrowLeft, IconCopy, IconCheck, IconCookie } from '@tabler/icons-react'
import { toast } from 'sonner'

type BannerPosition = 'bottom' | 'top' | 'bottom-left' | 'bottom-right'
type BannerStyle = 'minimal' | 'full' | 'floating'

export default function CookieBannerGeneratorPage() {
  const [websiteName, setWebsiteName] = useState('')
  const [privacyUrl, setPrivacyUrl] = useState('/privacy-policy')
  const [message, setMessage] = useState('We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.')
  const [acceptText, setAcceptText] = useState('Accept All')
  const [rejectText, setRejectText] = useState('Reject All')
  const [settingsText, setSettingsText] = useState('Cookie Settings')
  const [primaryColor, setPrimaryColor] = useState('#2bb1ea')
  const [backgroundColor, setBackgroundColor] = useState('#1a1a2e')
  const [textColor, setTextColor] = useState('#ffffff')
  const [position, setPosition] = useState<BannerPosition>('bottom')
  const [style, setStyle] = useState<BannerStyle>('full')
  const [showSettings, setShowSettings] = useState(true)
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  const generateCode = () => {
    const positionStyles = {
      bottom: 'bottom: 0; left: 0; right: 0;',
      top: 'top: 0; left: 0; right: 0;',
      'bottom-left': 'bottom: 20px; left: 20px; max-width: 400px;',
      'bottom-right': 'bottom: 20px; right: 20px; max-width: 400px;',
    }

    const isFloating = position === 'bottom-left' || position === 'bottom-right'
    const borderRadius = isFloating ? 'border-radius: 12px;' : ''
    const boxShadow = isFloating ? 'box-shadow: 0 10px 40px rgba(0,0,0,0.3);' : 'box-shadow: 0 -4px 20px rgba(0,0,0,0.15);'

    return `<!-- GDPR Cookie Banner -->
<div id="cookie-banner" style="
  position: fixed;
  ${positionStyles[position]}
  background-color: ${backgroundColor};
  color: ${textColor};
  padding: 20px 24px;
  ${borderRadius}
  ${boxShadow}
  z-index: 99999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
">
  <div style="flex: 1; min-width: 200px;">
    <p style="margin: 0;">
      ${message}
      <a href="${privacyUrl}" style="color: ${primaryColor}; text-decoration: underline;">Learn more</a>
    </p>
  </div>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    ${showSettings ? `<button onclick="document.getElementById('cookie-banner').style.display='none'" style="
      background: transparent;
      border: 1px solid ${textColor}40;
      color: ${textColor};
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    ">${settingsText}</button>` : ''}
    <button onclick="document.getElementById('cookie-banner').style.display='none';localStorage.setItem('cookies_rejected','true')" style="
      background: transparent;
      border: 1px solid ${textColor}40;
      color: ${textColor};
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    ">${rejectText}</button>
    <button onclick="document.getElementById('cookie-banner').style.display='none';localStorage.setItem('cookies_accepted','true')" style="
      background: ${primaryColor};
      border: none;
      color: white;
      padding: 10px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    ">${acceptText}</button>
  </div>
</div>
<script>
  if(localStorage.getItem('cookies_accepted') || localStorage.getItem('cookies_rejected')) {
    document.getElementById('cookie-banner').style.display = 'none';
  }
</script>`
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateCode())
      setCopied(true)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <IconArrowLeft className="h-4 w-4" />
          <span>Back to tools</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <IconCookie className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GDPR Cookie Banner Generator</h1>
            <p className="text-gray-600">Create compliant cookie consent banners</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Content</h2>
              <Input placeholder="Website Name (optional)" value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} />
              <Textarea
                placeholder="Banner message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <Input placeholder="Privacy Policy URL" value={privacyUrl} onChange={(e) => setPrivacyUrl(e.target.value)} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Button Text</h2>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Accept button" value={acceptText} onChange={(e) => setAcceptText(e.target.value)} />
                <Input placeholder="Reject button" value={rejectText} onChange={(e) => setRejectText(e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={showSettings}
                  onChange={(e) => setShowSettings(e.target.checked)}
                  className="rounded"
                  id="show-settings"
                />
                <label htmlFor="show-settings" className="text-sm text-gray-700">Show settings button</label>
              </div>
              {showSettings && (
                <Input placeholder="Settings button text" value={settingsText} onChange={(e) => setSettingsText(e.target.value)} />
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Style</h2>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Primary</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Background</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Text</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700 mb-2 block">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['bottom', 'top', 'bottom-left', 'bottom-right'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPosition(p)}
                      className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                        position === p ? 'bg-[#2bb1ea] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {p.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Code */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="relative bg-gray-200 rounded-lg h-64 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  Your Website
                </div>
                {/* Banner Preview */}
                <div
                  className={`absolute ${position === 'top' ? 'top-0 left-0 right-0' : position === 'bottom' ? 'bottom-0 left-0 right-0' : position === 'bottom-left' ? 'bottom-2 left-2 max-w-[250px]' : 'bottom-2 right-2 max-w-[250px]'}`}
                  style={{
                    backgroundColor,
                    color: textColor,
                    padding: '12px 16px',
                    borderRadius: position.includes('bottom-') ? '8px' : '0',
                    fontSize: '10px',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  <p className="mb-2 leading-tight" style={{ fontSize: '9px' }}>
                    {message.slice(0, 80)}...
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {showSettings && (
                      <span style={{ border: `1px solid ${textColor}40`, padding: '4px 8px', borderRadius: '4px', fontSize: '8px' }}>
                        {settingsText}
                      </span>
                    )}
                    <span style={{ border: `1px solid ${textColor}40`, padding: '4px 8px', borderRadius: '4px', fontSize: '8px' }}>
                      {rejectText}
                    </span>
                    <span style={{ backgroundColor: primaryColor, padding: '4px 10px', borderRadius: '4px', fontSize: '8px', color: 'white' }}>
                      {acceptText}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Generated Code</h2>
                <Button
                  onClick={copyCode}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <pre
                ref={codeRef}
                className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-auto max-h-64"
              >
                {generateCode()}
              </pre>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-medium text-green-900 mb-2">GDPR Compliant Features:</h3>
              <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                <li>Clear explanation of cookie usage</li>
                <li>Link to privacy policy</li>
                <li>Option to reject all cookies</li>
                <li>Remembers user preference</li>
                <li>Easy to customize and implement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

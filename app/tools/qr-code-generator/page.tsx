'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LandingNavbar } from '@/components/landing-navbar'
import { Footer } from '@/components/footer'

const QR_TYPES = [
  { id: 'url', name: 'URL', icon: '🔗', placeholder: 'https://example.com' },
  { id: 'text', name: 'Text', icon: '📝', placeholder: 'Enter any text...' },
  { id: 'wifi', name: 'WiFi', icon: '📶', placeholder: '' },
  { id: 'vcard', name: 'Contact Card', icon: '👤', placeholder: '' },
  { id: 'email', name: 'Email', icon: '✉️', placeholder: 'email@example.com' },
  { id: 'phone', name: 'Phone', icon: '📞', placeholder: '+1234567890' },
]

const COLORS = [
  { fg: '#000000', bg: '#ffffff', name: 'Classic' },
  { fg: '#1e3a5f', bg: '#ffffff', name: 'Navy' },
  { fg: '#2bb1ea', bg: '#ffffff', name: 'Brand' },
  { fg: '#059669', bg: '#ffffff', name: 'Green' },
  { fg: '#7c3aed', bg: '#ffffff', name: 'Purple' },
  { fg: '#dc2626', bg: '#ffffff', name: 'Red' },
]

export default function QRCodeGeneratorPage() {
  const [qrType, setQrType] = useState('url')
  const [content, setContent] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [selectedColor, setSelectedColor] = useState(0)
  const [size, setSize] = useState(256)
  
  const [wifiSsid, setWifiSsid] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiEncryption, setWifiEncryption] = useState('WPA')
  
  const [vcardName, setVcardName] = useState('')
  const [vcardPhone, setVcardPhone] = useState('')
  const [vcardEmail, setVcardEmail] = useState('')
  const [vcardCompany, setVcardCompany] = useState('')
  const [vcardTitle, setVcardTitle] = useState('')
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getQRContent = () => {
    switch (qrType) {
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`
      case 'vcard':
        // Split name into first/last for proper N field
        const nameParts = vcardName.trim().split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${vcardName}
TEL:${vcardPhone}
EMAIL:${vcardEmail}
ORG:${vcardCompany}
TITLE:${vcardTitle}
END:VCARD`
      case 'email':
        return `mailto:${content}`
      case 'phone':
        return `tel:${content}`
      default:
        return content
    }
  }

  useEffect(() => {
    const generateQR = async () => {
      const qrContent = getQRContent()
      if (!qrContent || qrContent.length < 1) {
        setQrDataUrl('')
        return
      }

      try {
        const QRCode = (await import('qrcode')).default
        const color = COLORS[selectedColor]
        
        const dataUrl = await QRCode.toDataURL(qrContent, {
          width: size,
          margin: 2,
          color: {
            dark: color.fg,
            light: color.bg,
          },
          errorCorrectionLevel: 'M',
        })
        
        setQrDataUrl(dataUrl)
      } catch {
        setQrDataUrl('')
      }
    }

    const debounce = setTimeout(generateQR, 300)
    return () => clearTimeout(debounce)
  }, [content, qrType, wifiSsid, wifiPassword, wifiEncryption, vcardName, vcardPhone, vcardEmail, vcardCompany, vcardTitle, selectedColor, size])

  const downloadPNG = () => {
    if (!qrDataUrl) return
    const link = document.createElement('a')
    link.download = `qr-code-${Date.now()}.png`
    link.href = qrDataUrl
    link.click()
  }

  const downloadSVG = async () => {
    const qrContent = getQRContent()
    if (!qrContent) return

    try {
      const QRCode = (await import('qrcode')).default
      const color = COLORS[selectedColor]
      
      const svgString = await QRCode.toString(qrContent, {
        type: 'svg',
        width: size,
        margin: 2,
        color: {
          dark: color.fg,
          light: color.bg,
        },
      })
      
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `qr-code-${Date.now()}.svg`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('SVG generation error:', error)
    }
  }

  const hasContent = () => {
    switch (qrType) {
      case 'wifi': return wifiSsid.length > 0
      case 'vcard': return vcardName.length > 0 || vcardPhone.length > 0 || vcardEmail.length > 0
      default: return content.length > 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/tools" className="text-[#2bb1ea] hover:underline text-sm">&larr; Back to Tools</Link>
          </div>
          
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2bb1ea]/10 text-[#2bb1ea] text-sm font-medium mb-4">
              Free Tool • No Signup Required
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
              QR Code Generator
            </h1>
            <p className="text-gray-600">
              Create QR codes for URLs, WiFi, contacts, and more
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">QR Code Type</h2>
                <div className="grid grid-cols-3 gap-2">
                  {QR_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => { setQrType(type.id); setContent('') }}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        qrType === type.id 
                          ? 'border-[#2bb1ea] bg-[#2bb1ea]/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{type.icon}</span>
                      <span className="text-xs font-medium text-gray-700">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Content</h2>
                
                {qrType === 'wifi' ? (
                  <div className="space-y-3">
                    <Input 
                      placeholder="Network Name (SSID)" 
                      value={wifiSsid} 
                      onChange={e => setWifiSsid(e.target.value)} 
                    />
                    <Input 
                      placeholder="Password" 
                      type="password"
                      value={wifiPassword} 
                      onChange={e => setWifiPassword(e.target.value)} 
                    />
                    <select 
                      className="w-full h-10 px-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2bb1ea]"
                      value={wifiEncryption}
                      onChange={e => setWifiEncryption(e.target.value)}
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                  </div>
                ) : qrType === 'vcard' ? (
                  <div className="space-y-3">
                    <Input placeholder="Full Name" value={vcardName} onChange={e => setVcardName(e.target.value)} />
                    <Input placeholder="Phone Number" value={vcardPhone} onChange={e => setVcardPhone(e.target.value)} />
                    <Input placeholder="Email" type="email" value={vcardEmail} onChange={e => setVcardEmail(e.target.value)} />
                    <Input placeholder="Company" value={vcardCompany} onChange={e => setVcardCompany(e.target.value)} />
                    <Input placeholder="Job Title" value={vcardTitle} onChange={e => setVcardTitle(e.target.value)} />
                  </div>
                ) : qrType === 'text' ? (
                  <textarea
                    placeholder="Enter your text..."
                    className="w-full h-32 px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#2bb1ea]"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                  />
                ) : (
                  <Input 
                    placeholder={QR_TYPES.find(t => t.id === qrType)?.placeholder}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                  />
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Style</h2>
                
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-2 block">Color Theme</label>
                  <div className="flex gap-2">
                    {COLORS.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          selectedColor === idx ? 'border-[#2bb1ea] scale-110' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color.bg }}
                        title={color.name}
                      >
                        <div 
                          className="w-4 h-4 rounded mx-auto"
                          style={{ backgroundColor: color.fg }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Size: {size}px</label>
                  <input 
                    type="range" 
                    min="128" 
                    max="512" 
                    step="32"
                    value={size}
                    onChange={e => setSize(Number(e.target.value))}
                    className="w-full accent-[#2bb1ea]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 space-y-4 h-fit">
              <div className="bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center justify-center min-h-[400px]">
                {qrDataUrl ? (
                  <>
                    <img 
                      src={qrDataUrl} 
                      alt="QR Code" 
                      className="max-w-full"
                      style={{ width: Math.min(size, 300), height: Math.min(size, 300) }}
                    />
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Scan with your phone camera
                    </p>
                  </>
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🔳</span>
                    </div>
                    <p>Enter content to generate QR code</p>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={downloadPNG}
                  disabled={!hasContent()}
                  className="h-12 bg-[#2bb1ea] hover:bg-[#2bb1ea]/90 text-white font-medium"
                >
                  Download PNG
                </Button>
                <Button 
                  onClick={downloadSVG}
                  disabled={!hasContent()}
                  variant="outline"
                  className="h-12 border-[#2bb1ea] text-[#2bb1ea] hover:bg-[#2bb1ea]/5 font-medium"
                >
                  Download SVG
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                SVG format is scalable and perfect for print materials
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

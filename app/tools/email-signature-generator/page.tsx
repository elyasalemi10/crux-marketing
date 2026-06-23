'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconArrowLeft, IconCopy, IconCheck, IconMail, IconBrandLinkedin, IconBrandTwitter, IconBrandInstagram, IconWorld, IconPhone } from '@tabler/icons-react'
import { toast } from 'sonner'

type TemplateStyle = 'modern' | 'classic' | 'minimal' | 'bold'

export default function EmailSignatureGeneratorPage() {
  const [fullName, setFullName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#2bb1ea')
  const [template, setTemplate] = useState<TemplateStyle>('modern')
  const [copied, setCopied] = useState(false)
  const signatureRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = async () => {
    if (!signatureRef.current) return

    // Get the full HTML including the wrapper
    const html = signatureRef.current.outerHTML

    try {
      // Try modern clipboard API first
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([signatureRef.current.innerText], { type: 'text/plain' }),
        }),
      ])
      setCopied(true)
      toast.success('Signature copied with formatting!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: select and copy the element visually
      try {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(signatureRef.current)
        selection?.removeAllRanges()
        selection?.addRange(range)
        document.execCommand('copy')
        selection?.removeAllRanges()
        setCopied(true)
        toast.success('Signature copied! Paste into your email client.')
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Last resort: copy as plain HTML text
        await navigator.clipboard.writeText(html)
        setCopied(true)
        toast.success('HTML code copied!')
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const renderSignature = () => {
    const socialLinks = []
    if (linkedin) socialLinks.push({ icon: 'linkedin', url: linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}` })
    if (twitter) socialLinks.push({ icon: 'twitter', url: twitter.startsWith('http') ? twitter : `https://twitter.com/${twitter}` })
    if (instagram) socialLinks.push({ icon: 'instagram', url: instagram.startsWith('http') ? instagram : `https://instagram.com/${instagram}` })

    if (template === 'modern') {
      return (
        <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333' }}>
          <tbody>
            <tr>
              <td style={{ paddingRight: '15px', borderRight: `3px solid ${primaryColor}` }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
                  {fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AB'}
                </div>
              </td>
              <td style={{ paddingLeft: '15px' }}>
                <p style={{ margin: '0 0 2px', fontWeight: 'bold', fontSize: '16px', color: '#222' }}>{fullName || 'Your Name'}</p>
                <p style={{ margin: '0 0 8px', color: primaryColor, fontSize: '13px' }}>{jobTitle || 'Job Title'}{company ? ` | ${company}` : ''}</p>
                {(email || phone) && (
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#666' }}>
                    {email && <span>{email}</span>}
                    {email && phone && <span> | </span>}
                    {phone && <span>{phone}</span>}
                  </p>
                )}
                {website && (
                  <p style={{ margin: '0 0 8px', fontSize: '12px' }}>
                    <a href={website.startsWith('http') ? website : `https://${website}`} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a>
                  </p>
                )}
                {socialLinks.length > 0 && (
                  <p style={{ margin: '0' }}>
                    {socialLinks.map((social, i) => (
                      <a key={i} href={social.url} style={{ marginRight: '8px', color: primaryColor, textDecoration: 'none', fontSize: '12px' }}>
                        {social.icon === 'linkedin' ? 'LinkedIn' : social.icon === 'twitter' ? 'Twitter' : 'Instagram'}
                      </a>
                    ))}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    if (template === 'classic') {
      return (
        <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#333' }}>
          <tbody>
            <tr>
              <td>
                <p style={{ margin: '0 0 2px', fontWeight: 'bold', fontSize: '15px' }}>{fullName || 'Your Name'}</p>
                <p style={{ margin: '0 0 2px', fontStyle: 'italic', color: '#666' }}>{jobTitle || 'Job Title'}</p>
                {company && <p style={{ margin: '0 0 8px', color: '#666' }}>{company}</p>}
                <div style={{ borderTop: `1px solid ${primaryColor}`, paddingTop: '8px', marginTop: '8px' }}>
                  {email && <p style={{ margin: '0 0 2px', fontSize: '12px' }}>Email: <a href={`mailto:${email}`} style={{ color: primaryColor }}>{email}</a></p>}
                  {phone && <p style={{ margin: '0 0 2px', fontSize: '12px' }}>Phone: {phone}</p>}
                  {website && <p style={{ margin: '0', fontSize: '12px' }}>Web: <a href={website.startsWith('http') ? website : `https://${website}`} style={{ color: primaryColor }}>{website.replace(/^https?:\/\//, '')}</a></p>}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    if (template === 'minimal') {
      return (
        <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '13px', color: '#444' }}>
          <tbody>
            <tr>
              <td>
                <p style={{ margin: '0', fontWeight: '600' }}>{fullName || 'Your Name'}</p>
                <p style={{ margin: '2px 0 0', color: '#888', fontSize: '12px' }}>
                  {jobTitle || 'Job Title'}{company ? ` · ${company}` : ''}
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#666' }}>
                  {[email, phone, website?.replace(/^https?:\/\//, '')].filter(Boolean).join(' · ')}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )
    }

    // Bold template
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
        <tbody>
          <tr>
            <td style={{ backgroundColor: primaryColor, padding: '15px 20px', borderRadius: '8px' }}>
              <p style={{ margin: '0 0 2px', fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{fullName || 'Your Name'}</p>
              <p style={{ margin: '0 0 10px', color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>{jobTitle || 'Job Title'}{company ? ` | ${company}` : ''}</p>
              <p style={{ margin: '0', fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                {email && <span style={{ marginRight: '15px' }}>{email}</span>}
                {phone && <span>{phone}</span>}
              </p>
              {website && (
                <p style={{ margin: '5px 0 0', fontSize: '12px' }}>
                  <a href={website.startsWith('http') ? website : `https://${website}`} style={{ color: 'white' }}>{website.replace(/^https?:\/\//, '')}</a>
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <IconMail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Signature Generator</h1>
            <p className="text-gray-600">Create professional HTML email signatures</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Personal Info</h2>
              <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <Input placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Contact Details</h2>
              <div className="relative">
                <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="relative">
                <IconPhone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="relative">
                <IconWorld className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Social Links</h2>
              <div className="relative">
                <IconBrandLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="LinkedIn username or URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="relative">
                <IconBrandTwitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="Twitter username" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
              </div>
              <div className="relative">
                <IconBrandInstagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input className="pl-10" placeholder="Instagram username" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Style</h2>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Primary Color:</label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-28 font-mono text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['modern', 'classic', 'minimal', 'bold'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      template === t
                        ? 'bg-[#2bb1ea] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="border rounded-lg p-6 bg-gray-50 min-h-[200px]">
                <div ref={signatureRef}>
                  {renderSignature()}
                </div>
              </div>
            </div>

            <Button
              onClick={copyToClipboard}
              className="w-full h-12 bg-[#2bb1ea] hover:bg-[#239cc9] gap-2"
            >
              {copied ? (
                <>
                  <IconCheck className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <IconCopy className="h-4 w-4" />
                  Copy Signature to Clipboard
                </>
              )}
            </Button>

            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-medium text-blue-900 mb-2">How to use:</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Fill in your details and customize the style</li>
                <li>Click "Copy Signature to Clipboard"</li>
                <li>Open your email client settings</li>
                <li>Paste into the signature editor</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

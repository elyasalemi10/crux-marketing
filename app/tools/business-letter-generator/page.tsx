'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IconArrowLeft, IconDownload, IconFileText } from '@tabler/icons-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const LETTER_TEMPLATES = [
  { id: 'formal', name: 'Formal Business Letter', salutation: 'Dear Sir/Madam,', closing: 'Yours faithfully,' },
  { id: 'semi-formal', name: 'Semi-Formal Letter', salutation: 'Dear [Name],', closing: 'Kind regards,' },
  { id: 'inquiry', name: 'Inquiry Letter', salutation: 'To Whom It May Concern,', closing: 'Best regards,' },
  { id: 'complaint', name: 'Complaint Letter', salutation: 'Dear Customer Service,', closing: 'Sincerely,' },
  { id: 'thank-you', name: 'Thank You Letter', salutation: 'Dear [Name],', closing: 'With gratitude,' },
]

export default function BusinessLetterGeneratorPage() {
  const [template, setTemplate] = useState('formal')
  const [senderName, setSenderName] = useState('')
  const [senderTitle, setSenderTitle] = useState('')
  const [senderCompany, setSenderCompany] = useState('')
  const [senderAddress, setSenderAddress] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientTitle, setRecipientTitle] = useState('')
  const [recipientCompany, setRecipientCompany] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [letterDate, setLetterDate] = useState('')
  const [subject, setSubject] = useState('')
  const [salutation, setSalutation] = useState('Dear Sir/Madam,')
  const [body, setBody] = useState('')
  const [closing, setClosing] = useState('Yours faithfully,')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setLetterDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  useEffect(() => {
    const t = LETTER_TEMPLATES.find(lt => lt.id === template)
    if (t) {
      setSalutation(t.salutation.replace('[Name]', recipientName || 'Name'))
      setClosing(t.closing)
    }
  }, [template, recipientName])

  const generatePDF = async () => {
    setGenerating(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([612, 792])
      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

      let yPos = 740
      const margin = 72

      const drawText = (text: string, options: { size?: number; bold?: boolean; align?: 'left' | 'right' } = {}) => {
        const { size = 11, bold = false, align = 'left' } = options
        const usedFont = bold ? fontBold : font
        const textWidth = usedFont.widthOfTextAtSize(text, size)
        const x = align === 'right' ? 612 - margin - textWidth : margin
        page.drawText(text, { x, y: yPos, size, font: usedFont, color: rgb(0, 0, 0) })
        yPos -= size + 4
      }

      const drawMultiline = (text: string, options: { size?: number; maxWidth?: number } = {}) => {
        const { size = 11, maxWidth = 468 } = options
        const words = text.split(' ')
        let line = ''
        for (const word of words) {
          const testLine = line + (line ? ' ' : '') + word
          const width = font.widthOfTextAtSize(testLine, size)
          if (width > maxWidth && line) {
            page.drawText(line, { x: margin, y: yPos, size, font, color: rgb(0, 0, 0) })
            yPos -= size + 4
            line = word
          } else {
            line = testLine
          }
        }
        if (line) {
          page.drawText(line, { x: margin, y: yPos, size, font, color: rgb(0, 0, 0) })
          yPos -= size + 4
        }
      }

      // Sender Info (right aligned)
      if (senderName) drawText(senderName, { align: 'right', bold: true })
      if (senderTitle) drawText(senderTitle, { size: 10, align: 'right' })
      if (senderCompany) drawText(senderCompany, { size: 10, align: 'right' })
      if (senderAddress) {
        senderAddress.split('\n').forEach(line => drawText(line.trim(), { size: 10, align: 'right' }))
      }
      if (senderEmail) drawText(senderEmail, { size: 10, align: 'right' })
      if (senderPhone) drawText(senderPhone, { size: 10, align: 'right' })
      
      yPos -= 20

      // Date
      drawText(letterDate)
      yPos -= 15

      // Recipient Info
      if (recipientName) drawText(recipientName, { bold: true })
      if (recipientTitle) drawText(recipientTitle, { size: 10 })
      if (recipientCompany) drawText(recipientCompany, { size: 10 })
      if (recipientAddress) {
        recipientAddress.split('\n').forEach(line => drawText(line.trim(), { size: 10 }))
      }
      yPos -= 15

      // Subject
      if (subject) {
        drawText(`Re: ${subject}`, { bold: true })
        yPos -= 10
      }

      // Salutation
      drawText(salutation)
      yPos -= 10

      // Body
      const paragraphs = body.split('\n\n')
      for (const paragraph of paragraphs) {
        if (paragraph.trim()) {
          drawMultiline(paragraph.trim())
          yPos -= 8
        }
      }
      yPos -= 10

      // Closing
      drawText(closing)
      yPos -= 30

      // Signature
      if (senderName) drawText(senderName, { bold: true })
      if (senderTitle) drawText(senderTitle, { size: 10 })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `business-letter-${Date.now()}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF generation error:', error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <IconArrowLeft className="h-4 w-4" />
          <span>Back to tools</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-white">
            <IconFileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Letter Generator</h1>
            <p className="text-gray-600">Create professional formal letters</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Letter Template</h2>
            <div className="flex flex-wrap gap-2">
              {LETTER_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    template === t.id ? 'bg-[#2bb1ea] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Your Details (Sender)</h2>
              <Input placeholder="Your Name" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
              <Input placeholder="Your Title" value={senderTitle} onChange={(e) => setSenderTitle(e.target.value)} />
              <Input placeholder="Company" value={senderCompany} onChange={(e) => setSenderCompany(e.target.value)} />
              <Textarea placeholder="Address" value={senderAddress} onChange={(e) => setSenderAddress(e.target.value)} rows={2} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />
                <Input placeholder="Phone" value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Recipient Details</h2>
              <Input placeholder="Recipient Name" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
              <Input placeholder="Recipient Title" value={recipientTitle} onChange={(e) => setRecipientTitle(e.target.value)} />
              <Input placeholder="Company" value={recipientCompany} onChange={(e) => setRecipientCompany(e.target.value)} />
              <Textarea placeholder="Address" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} rows={2} />
              <Input placeholder="Date" value={letterDate} onChange={(e) => setLetterDate(e.target.value)} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Letter Content</h2>
            <Input placeholder="Subject Line" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Salutation" value={salutation} onChange={(e) => setSalutation(e.target.value)} />
              <Input placeholder="Closing" value={closing} onChange={(e) => setClosing(e.target.value)} />
            </div>
            <Textarea
              placeholder="Letter body (separate paragraphs with blank lines)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
            />
          </div>

          <Button
            onClick={generatePDF}
            disabled={generating || !body}
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
                Download Letter PDF
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

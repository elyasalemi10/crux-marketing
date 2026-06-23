'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IconArrowLeft, IconDownload, IconMail } from '@tabler/icons-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export default function CoverLetterGeneratorPage() {
  const [yourName, setYourName] = useState('')
  const [yourEmail, setYourEmail] = useState('')
  const [yourPhone, setYourPhone] = useState('')
  const [yourAddress, setYourAddress] = useState('')
  const [letterDate, setLetterDate] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientTitle, setRecipientTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [salutation, setSalutation] = useState('Dear Hiring Manager,')
  const [opening, setOpening] = useState('')
  const [bodyParagraph1, setBodyParagraph1] = useState('')
  const [bodyParagraph2, setBodyParagraph2] = useState('')
  const [closing, setClosing] = useState('')
  const [signOff, setSignOff] = useState('Sincerely,')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setLetterDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  useEffect(() => {
    if (recipientName && !salutation.includes(recipientName)) {
      setSalutation(`Dear ${recipientName},`)
    }
  }, [recipientName])

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
        page.drawText(text, { x, y: yPos, size, font: usedFont, color: rgb(0.1, 0.1, 0.1) })
        yPos -= size + 5
      }

      const drawParagraph = (text: string, options: { size?: number; indent?: boolean } = {}) => {
        const { size = 11, indent = true } = options
        const maxWidth = 468
        const words = text.split(' ')
        let line = indent ? '    ' : ''
        
        for (const word of words) {
          const testLine = line + (line.trim() ? ' ' : '') + word
          const width = font.widthOfTextAtSize(testLine, size)
          if (width > maxWidth && line.trim()) {
            page.drawText(line, { x: margin, y: yPos, size, font, color: rgb(0.1, 0.1, 0.1) })
            yPos -= size + 4
            line = word
          } else {
            line = testLine
          }
        }
        if (line.trim()) {
          page.drawText(line, { x: margin, y: yPos, size, font, color: rgb(0.1, 0.1, 0.1) })
          yPos -= size + 4
        }
        yPos -= 8
      }

      // Your contact info (right aligned)
      if (yourName) drawText(yourName, { align: 'right', bold: true })
      if (yourAddress) {
        yourAddress.split('\n').forEach(line => drawText(line.trim(), { size: 10, align: 'right' }))
      }
      if (yourEmail) drawText(yourEmail, { size: 10, align: 'right' })
      if (yourPhone) drawText(yourPhone, { size: 10, align: 'right' })
      
      yPos -= 15

      // Date
      drawText(letterDate)
      yPos -= 10

      // Recipient info
      if (recipientName) drawText(recipientName, { bold: true })
      if (recipientTitle) drawText(recipientTitle, { size: 10 })
      if (companyName) drawText(companyName, { size: 10 })
      if (companyAddress) {
        companyAddress.split('\n').forEach(line => drawText(line.trim(), { size: 10 }))
      }
      yPos -= 10

      // Re: Job Title
      if (jobTitle) {
        drawText(`Re: Application for ${jobTitle} Position`, { bold: true })
        yPos -= 10
      }

      // Salutation
      drawText(salutation)
      yPos -= 5

      // Opening paragraph
      if (opening) {
        drawParagraph(opening)
      }

      // Body paragraphs
      if (bodyParagraph1) {
        drawParagraph(bodyParagraph1)
      }

      if (bodyParagraph2) {
        drawParagraph(bodyParagraph2)
      }

      // Closing paragraph
      if (closing) {
        drawParagraph(closing)
      }

      yPos -= 5

      // Sign off
      drawText(signOff)
      yPos -= 25

      // Signature
      if (yourName) drawText(yourName, { bold: true })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `cover-letter-${companyName || 'company'}.pdf`
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
            <IconMail className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cover Letter Generator</h1>
            <p className="text-gray-600">Create professional cover letters</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Your Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Your Information</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Input placeholder="Your Name" value={yourName} onChange={(e) => setYourName(e.target.value)} />
              <Input placeholder="Email" value={yourEmail} onChange={(e) => setYourEmail(e.target.value)} />
              <Input placeholder="Phone" value={yourPhone} onChange={(e) => setYourPhone(e.target.value)} />
              <Input placeholder="Date" value={letterDate} onChange={(e) => setLetterDate(e.target.value)} />
            </div>
            <Textarea placeholder="Your Address" value={yourAddress} onChange={(e) => setYourAddress(e.target.value)} rows={2} />
          </div>

          {/* Recipient Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Recipient / Company</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Input placeholder="Hiring Manager Name (if known)" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
              <Input placeholder="Their Title" value={recipientTitle} onChange={(e) => setRecipientTitle(e.target.value)} />
              <Input placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              <Input placeholder="Position You're Applying For" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <Textarea placeholder="Company Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} rows={2} />
          </div>

          {/* Letter Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Letter Content</h2>
            <Input placeholder="Salutation" value={salutation} onChange={(e) => setSalutation(e.target.value)} />
            
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Opening Paragraph</label>
              <Textarea
                placeholder="Introduce yourself and state the position you're applying for. Mention how you learned about the opportunity..."
                value={opening}
                onChange={(e) => setOpening(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Why You're Qualified</label>
              <Textarea
                placeholder="Highlight your relevant experience, skills, and achievements that make you a strong candidate..."
                value={bodyParagraph1}
                onChange={(e) => setBodyParagraph1(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Why This Company</label>
              <Textarea
                placeholder="Explain why you're interested in this company specifically. Show you've done your research..."
                value={bodyParagraph2}
                onChange={(e) => setBodyParagraph2(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Closing Paragraph</label>
              <Textarea
                placeholder="Thank them for their consideration, express enthusiasm, and include a call to action..."
                value={closing}
                onChange={(e) => setClosing(e.target.value)}
                rows={2}
              />
            </div>

            <Input placeholder="Sign-off (e.g., Sincerely, Best regards)" value={signOff} onChange={(e) => setSignOff(e.target.value)} />
          </div>

          <Button
            onClick={generatePDF}
            disabled={generating || !yourName || !opening}
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
                Download Cover Letter PDF
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

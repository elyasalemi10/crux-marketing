'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LandingNavbar } from '@/components/landing-navbar'
import { Footer } from '@/components/footer'

const CONTRACT_TEMPLATES = [
  { id: 'service', name: 'Service Agreement', description: 'General service contract for freelancers and businesses' },
  { id: 'nda', name: 'Non-Disclosure Agreement', description: 'Protect confidential information between parties' },
  { id: 'freelance', name: 'Freelance Contract', description: 'Project-based contract for independent contractors' },
  { id: 'consulting', name: 'Consulting Agreement', description: 'Professional consulting services contract' },
]

export default function ContractGeneratorPage() {
  const [template, setTemplate] = useState('service')
  const [generating, setGenerating] = useState(false)
  
  const [partyA, setPartyA] = useState({ name: '', address: '', email: '' })
  const [partyB, setPartyB] = useState({ name: '', address: '', email: '' })
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentTerms, setPaymentTerms] = useState('Net 30')
  const [governingLaw, setGoverningLaw] = useState('')
  
  const contractRef = useRef<HTMLDivElement>(null)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '[DATE]'
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const generatePdf = async () => {
    setGenerating(true)
    try {
      const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib')
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      
      let page = pdfDoc.addPage([612, 792])
      const { width, height } = page.getSize()
      const margin = 50
      let yPos = height - margin
      const lineHeight = 14
      const paragraphSpacing = 20
      
      const drawText = (text: string, options: { bold?: boolean; size?: number; indent?: number } = {}) => {
        const { bold = false, size = 11, indent = 0 } = options
        const usedFont = bold ? fontBold : font
        const maxWidth = width - margin * 2 - indent
        
        const words = text.split(' ')
        let line = ''
        
        for (const word of words) {
          const testLine = line ? `${line} ${word}` : word
          const textWidth = usedFont.widthOfTextAtSize(testLine, size)
          
          if (textWidth > maxWidth) {
            if (yPos < margin + 50) {
              page = pdfDoc.addPage([612, 792])
              yPos = height - margin
            }
            page.drawText(line, { x: margin + indent, y: yPos, size, font: usedFont, color: rgb(0.1, 0.1, 0.1) })
            yPos -= lineHeight
            line = word
          } else {
            line = testLine
          }
        }
        
        if (line) {
          if (yPos < margin + 50) {
            page = pdfDoc.addPage([612, 792])
            yPos = height - margin
          }
          page.drawText(line, { x: margin + indent, y: yPos, size, font: usedFont, color: rgb(0.1, 0.1, 0.1) })
          yPos -= lineHeight
        }
      }
      
      const addParagraph = () => { yPos -= paragraphSpacing }
      
      const templateName = CONTRACT_TEMPLATES.find(t => t.id === template)?.name || 'Contract'
      
      drawText(templateName.toUpperCase(), { bold: true, size: 18 })
      yPos -= 10
      drawText(`Effective Date: ${formatDate(startDate)}`, { size: 10 })
      addParagraph()
      
      drawText('PARTIES', { bold: true, size: 12 })
      yPos -= 5
      drawText(`This ${templateName} ("Agreement") is entered into by and between:`)
      addParagraph()
      
      drawText(`Party A: ${partyA.name || '[PARTY A NAME]'}`, { bold: true })
      if (partyA.address) drawText(`Address: ${partyA.address}`, { indent: 20 })
      if (partyA.email) drawText(`Email: ${partyA.email}`, { indent: 20 })
      addParagraph()
      
      drawText(`Party B: ${partyB.name || '[PARTY B NAME]'}`, { bold: true })
      if (partyB.address) drawText(`Address: ${partyB.address}`, { indent: 20 })
      if (partyB.email) drawText(`Email: ${partyB.email}`, { indent: 20 })
      addParagraph()
      
      if (template === 'nda') {
        drawText('1. DEFINITION OF CONFIDENTIAL INFORMATION', { bold: true, size: 12 })
        yPos -= 5
        drawText('For purposes of this Agreement, "Confidential Information" shall include all information or data that has or could have commercial value or other utility in the business in which the Disclosing Party is engaged. This includes, but is not limited to: technical data, trade secrets, know-how, research, product plans, products, services, customer lists, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances, or other business information.')
        addParagraph()
        
        drawText('2. OBLIGATIONS OF RECEIVING PARTY', { bold: true, size: 12 })
        yPos -= 5
        drawText('The Receiving Party agrees to: (a) hold and maintain the Confidential Information in strict confidence; (b) not to disclose the Confidential Information to any third parties; (c) not to use any of the Confidential Information for any purpose except as expressly permitted herein; (d) protect the Confidential Information using the same degree of care it uses to protect its own confidential information of like kind.')
        addParagraph()
        
        drawText('3. TIME PERIODS', { bold: true, size: 12 })
        yPos -= 5
        drawText(`The obligations of confidentiality shall remain in effect for a period of two (2) years from the date of disclosure.`)
        addParagraph()
        
      } else {
        drawText('1. SCOPE OF SERVICES', { bold: true, size: 12 })
        yPos -= 5
        if (projectTitle) drawText(`Project: ${projectTitle}`, { bold: true })
        drawText(projectDescription || 'Party A agrees to provide the services as described and agreed upon by both parties.')
        addParagraph()
        
        drawText('2. TERM', { bold: true, size: 12 })
        yPos -= 5
        drawText(`This Agreement shall commence on ${formatDate(startDate)} and shall continue until ${formatDate(endDate) || 'completion of the services'}, unless terminated earlier in accordance with the provisions of this Agreement.`)
        addParagraph()
        
        drawText('3. COMPENSATION', { bold: true, size: 12 })
        yPos -= 5
        drawText(`In consideration for the services to be provided, Party B agrees to pay Party A the amount of ${paymentAmount || '[AMOUNT]'}. Payment terms: ${paymentTerms}.`)
        addParagraph()
        
        drawText('4. INTELLECTUAL PROPERTY', { bold: true, size: 12 })
        yPos -= 5
        drawText('All intellectual property rights in any work product created under this Agreement shall be owned by Party B upon full payment, unless otherwise agreed in writing.')
        addParagraph()
        
        drawText('5. CONFIDENTIALITY', { bold: true, size: 12 })
        yPos -= 5
        drawText('Both parties agree to maintain the confidentiality of any proprietary information received during the course of this Agreement.')
        addParagraph()
      }
      
      drawText(`${template === 'nda' ? '4' : '6'}. TERMINATION`, { bold: true, size: 12 })
      yPos -= 5
      drawText('Either party may terminate this Agreement with 30 days written notice. In the event of termination, Party A shall be compensated for all services rendered up to the date of termination.')
      addParagraph()
      
      drawText(`${template === 'nda' ? '5' : '7'}. GOVERNING LAW`, { bold: true, size: 12 })
      yPos -= 5
      drawText(`This Agreement shall be governed by and construed in accordance with the laws of ${governingLaw || '[JURISDICTION]'}.`)
      addParagraph()
      
      drawText(`${template === 'nda' ? '6' : '8'}. ENTIRE AGREEMENT`, { bold: true, size: 12 })
      yPos -= 5
      drawText('This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements relating to this subject matter.')
      addParagraph()
      addParagraph()
      
      drawText('SIGNATURES', { bold: true, size: 12 })
      addParagraph()
      
      drawText('Party A:', { bold: true })
      yPos -= 30
      drawText('_________________________________')
      drawText(`Name: ${partyA.name || ''}`)
      drawText('Date: _____________')
      addParagraph()
      
      drawText('Party B:', { bold: true })
      yPos -= 30
      drawText('_________________________________')
      drawText(`Name: ${partyB.name || ''}`)
      drawText('Date: _____________')
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${template}-contract-${Date.now()}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/tools" className="text-[#2bb1ea] hover:underline text-sm">&larr; Back to Tools</Link>
          </div>
          
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2bb1ea]/10 text-[#2bb1ea] text-sm font-medium mb-4">
              Free Tool • No Signup Required
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Contract Generator
            </h1>
            <p className="text-gray-600">
              Create professional contracts and agreements in minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Contract Type</h2>
                <div className="grid grid-cols-2 gap-3">
                  {CONTRACT_TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        template === t.id 
                          ? 'border-[#2bb1ea] bg-[#2bb1ea]/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Party A (Service Provider)</h2>
                <div className="space-y-3">
                  <Input placeholder="Full Name / Company Name" value={partyA.name} onChange={e => setPartyA({...partyA, name: e.target.value})} />
                  <Input placeholder="Address" value={partyA.address} onChange={e => setPartyA({...partyA, address: e.target.value})} />
                  <Input placeholder="Email" type="email" value={partyA.email} onChange={e => setPartyA({...partyA, email: e.target.value})} />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Party B (Client)</h2>
                <div className="space-y-3">
                  <Input placeholder="Full Name / Company Name" value={partyB.name} onChange={e => setPartyB({...partyB, name: e.target.value})} />
                  <Input placeholder="Address" value={partyB.address} onChange={e => setPartyB({...partyB, address: e.target.value})} />
                  <Input placeholder="Email" type="email" value={partyB.email} onChange={e => setPartyB({...partyB, email: e.target.value})} />
                </div>
              </div>

              {template !== 'nda' && (
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">Project Details</h2>
                  <div className="space-y-3">
                    <Input placeholder="Project Title" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
                    <textarea 
                      placeholder="Project Description / Scope of Work"
                      className="w-full h-24 px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#2bb1ea]"
                      value={projectDescription}
                      onChange={e => setProjectDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
                        <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">End Date</label>
                        <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {template !== 'nda' && (
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">Payment</h2>
                  <div className="space-y-3">
                    <Input placeholder="Total Amount (e.g. $5,000 USD)" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} />
                    <select 
                      className="w-full h-10 px-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2bb1ea]"
                      value={paymentTerms}
                      onChange={e => setPaymentTerms(e.target.value)}
                    >
                      <option value="50% upfront, 50% on completion">50% upfront, 50% on completion</option>
                      <option value="Due upon receipt">Due upon receipt</option>
                      <option value="Net 15">Net 15</option>
                      <option value="Net 30">Net 30</option>
                      <option value="Net 60">Net 60</option>
                      <option value="Monthly installments">Monthly installments</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Legal</h2>
                <Input placeholder="Governing Law / Jurisdiction (e.g. State of California)" value={governingLaw} onChange={e => setGoverningLaw(e.target.value)} />
              </div>
            </div>

            <div className="lg:sticky lg:top-24 space-y-4 h-fit">
              <div ref={contractRef} className="bg-white rounded-2xl shadow-sm border p-8 min-h-[600px]">
                <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {CONTRACT_TEMPLATES.find(t => t.id === template)?.name}
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Effective Date: {formatDate(startDate)}
                </p>
                
                <div className="text-sm text-gray-700 space-y-4">
                  <p>
                    This Agreement is entered into by and between <strong>{partyA.name || '[Party A]'}</strong> and <strong>{partyB.name || '[Party B]'}</strong>.
                  </p>
                  
                  {template === 'nda' ? (
                    <>
                      <p><strong>Purpose:</strong> The parties wish to explore a potential business relationship and may need to disclose confidential information to each other.</p>
                      <p><strong>Obligations:</strong> The Receiving Party agrees to hold all Confidential Information in strict confidence and not disclose it to any third parties without prior written consent.</p>
                    </>
                  ) : (
                    <>
                      {projectTitle && <p><strong>Project:</strong> {projectTitle}</p>}
                      {projectDescription && <p><strong>Scope:</strong> {projectDescription}</p>}
                      {paymentAmount && <p><strong>Compensation:</strong> {paymentAmount} ({paymentTerms})</p>}
                    </>
                  )}
                  
                  {governingLaw && <p><strong>Governing Law:</strong> {governingLaw}</p>}
                  
                  <div className="pt-8 border-t mt-8">
                    <p className="text-xs text-gray-400 italic">
                      This preview shows a summary. The downloaded PDF will contain the full contract with all standard clauses.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={generatePdf}
                disabled={generating}
                className="w-full h-12 bg-[#2bb1ea] hover:bg-[#2bb1ea]/90 text-white font-medium"
              >
                {generating ? 'Generating PDF...' : 'Download Contract (PDF)'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

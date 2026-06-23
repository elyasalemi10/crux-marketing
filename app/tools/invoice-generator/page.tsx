'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
}

export default function InvoiceGeneratorPage() {
  const [logo, setLogo] = useState<string | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  
  // Initialize date-dependent values on client only to avoid hydration mismatch
  useEffect(() => {
    setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`)
    setInvoiceDate(new Date().toISOString().split('T')[0])
  }, [])
  const [dueDate, setDueDate] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 }
  ])
  const [taxRate, setTaxRate] = useState(0)
  const [notes, setNotes] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }
    ])
  }

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id))
    }
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/tools/invoice-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logo,
          companyName,
          companyAddress,
          companyEmail,
          companyPhone,
          recipientName,
          recipientEmail,
          recipientAddress,
          invoiceNumber,
          invoiceDate,
          dueDate,
          lineItems,
          taxRate,
          subtotal,
          taxAmount,
          total,
          notes,
        }),
      })

      if (!response.ok) throw new Error('Failed to generate PDF')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${invoiceNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/tools" className="text-[#2bb1ea] hover:underline text-sm">
              &larr; Back to Free Tools
            </Link>
          </div>

          {/* Hero */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#2bb1ea]/10 text-[#2bb1ea] text-sm font-medium mb-4">
              100% Free, No Signup Required
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Free Invoice Generator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create professional invoices in seconds. Add your logo, line items, tax, and download as PDF.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="space-y-8">
              {/* Logo Upload */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Logo</h2>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#2bb1ea] transition-colors"
                >
                  {logo ? (
                    <img src={logo} alt="Logo" className="max-h-20 mx-auto" />
                  ) : (
                    <div className="text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Click to upload logo</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/png,image/jpeg,image/jpg" 
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>

              {/* Your Details */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Details</h2>
                <div className="space-y-4">
                  <Input 
                    placeholder="Company / Your Name" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <Textarea 
                    placeholder="Address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    rows={2}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      placeholder="Email"
                      type="email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                    />
                    <Input 
                      placeholder="Phone"
                      type="tel"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Recipient */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Bill To</h2>
                <div className="space-y-4">
                  <Input 
                    placeholder="Client Name / Company"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                  <Input 
                    placeholder="Client Email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                  <Textarea 
                    placeholder="Client Address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Invoice Details */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice #</label>
                    <Input 
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <Input 
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <Input 
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Items</h2>
                <div className="space-y-4">
                  {lineItems.map((item, idx) => (
                    <div key={item.id} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <Input 
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div className="w-20">
                        <Input 
                          type="number"
                          placeholder="Qty"
                          min="0"
                          step="1"
                          value={item.quantity || ''}
                          onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                        />
                      </div>
                      <div className="w-28">
                        <Input 
                          type="number"
                          placeholder="Rate"
                          min="0"
                          step="0.01"
                          value={item.rate || ''}
                          onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                        />
                      </div>
                      <div className="w-24 pt-2 text-right font-medium text-gray-900">
                        {formatCurrency(item.quantity * item.rate)}
                      </div>
                      {lineItems.length > 1 && (
                        <button 
                          onClick={() => removeLineItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={addLineItem}
                    className="w-full"
                  >
                    + Add Item
                  </Button>
                </div>

                {/* Tax */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Tax Rate (%)</label>
                    <Input 
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={taxRate || ''}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes / Terms</h2>
                <Textarea 
                  placeholder="Payment terms, thank you note, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Invoice Preview</h3>
                  <p className="text-sm text-gray-500">This is how your invoice will look</p>
                </div>

                {/* Mini Preview */}
                <div className="bg-gray-50 rounded-xl p-6 text-sm">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      {logo ? (
                        <img src={logo} alt="Logo" className="h-12 object-contain mb-2" />
                      ) : (
                        <div className="h-12 w-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs mb-2">
                          Logo
                        </div>
                      )}
                      <p className="font-semibold text-gray-900">{companyName || 'Your Company'}</p>
                      <p className="text-gray-500 text-xs whitespace-pre-line">{companyAddress || 'Your Address'}</p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-2xl font-bold text-gray-900">INVOICE</h4>
                      <p className="text-gray-500 text-xs mt-1">{invoiceNumber}</p>
                    </div>
                  </div>

                  {/* Bill To */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
                      <p className="font-medium text-gray-900">{recipientName || 'Client Name'}</p>
                      <p className="text-gray-500 text-xs">{recipientEmail || 'client@email.com'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</p>
                      <p className="text-gray-900">{invoiceDate}</p>
                      {dueDate && (
                        <>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 mt-2">Due</p>
                          <p className="text-gray-900">{dueDate}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="grid grid-cols-12 gap-2 text-xs text-gray-400 uppercase tracking-wider mb-2">
                      <div className="col-span-6">Item</div>
                      <div className="col-span-2 text-right">Qty</div>
                      <div className="col-span-2 text-right">Rate</div>
                      <div className="col-span-2 text-right">Amount</div>
                    </div>
                    {lineItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 text-xs py-1">
                        <div className="col-span-6 text-gray-700 truncate">{item.description || '-'}</div>
                        <div className="col-span-2 text-right text-gray-600">{item.quantity}</div>
                        <div className="col-span-2 text-right text-gray-600">{formatCurrency(item.rate)}</div>
                        <div className="col-span-2 text-right font-medium text-gray-900">{formatCurrency(item.quantity * item.rate)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                    </div>
                    {taxRate > 0 && (
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Tax ({taxRate}%)</span>
                        <span className="text-gray-900">{formatCurrency(taxAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 mt-2">
                      <span className="text-gray-900">Total</span>
                      <span className="text-[#2bb1ea]">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <Button 
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="w-full mt-6 bg-[#2bb1ea] hover:bg-[#2bb1ea]/90 text-white"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* FAQ Section for SEO */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is this invoice generator really free?</h3>
                <p className="text-gray-600 text-sm">Yes, our invoice generator is 100% free to use. No signup required, no hidden fees, no watermarks on your invoices. Create unlimited professional invoices.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I add my company logo?</h3>
                <p className="text-gray-600 text-sm">Yes, you can upload your company logo in PNG or JPG format. It will appear at the top of your invoice for a professional branded look.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Does it calculate tax automatically?</h3>
                <p className="text-gray-600 text-sm">Yes, simply enter your tax rate (e.g., 10%) and the invoice generator will automatically calculate and add the tax amount to your total.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I add multiple products or services?</h3>
                <p className="text-gray-600 text-sm">Absolutely. Add as many line items as you need. Each item can have its own description, quantity, and rate. The totals update automatically.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What format is the invoice downloaded in?</h3>
                <p className="text-gray-600 text-sm">Invoices are downloaded as professional PDF files that you can email to clients, print, or save for your records.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is my data saved or stored?</h3>
                <p className="text-gray-600 text-sm">No, we don't store any of your invoice data. The PDF is generated instantly and your information is never saved on our servers.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-gradient-to-br from-[#2bb1ea]/10 to-white rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need automated invoicing?
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              CruxLogic can automatically generate and send invoices based on your calendar events and tasks.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2bb1ea] text-white font-medium hover:bg-[#2bb1ea]/90 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconArrowLeft, IconDownload, IconReceipt2, IconPlus, IconTrash } from '@tabler/icons-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface ReceiptItem {
  id: string
  description: string
  quantity: number
  price: number
}

export default function ReceiptGeneratorPage() {
  const [businessName, setBusinessName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessPhone, setBusinessPhone] = useState('')
  const [receiptNumber, setReceiptNumber] = useState('')
  const [receiptDate, setReceiptDate] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [items, setItems] = useState<ReceiptItem[]>([
    { id: '1', description: '', quantity: 1, price: 0 }
  ])
  const [taxRateStr, setTaxRateStr] = useState('0')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    setReceiptNumber(`RCP-${Date.now().toString().slice(-6)}`)
    setReceiptDate(new Date().toISOString().split('T')[0])
  }, [])

  const taxRate = parseFloat(taxRateStr) || 0
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, price: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof ReceiptItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const generatePDF = async () => {
    setGenerating(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([300, 500])
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      let yPos = 470

      const drawCenteredText = (text: string, options: { size?: number; bold?: boolean; color?: number[] } = {}) => {
        const { size = 10, bold = false, color = [0, 0, 0] } = options
        const usedFont = bold ? fontBold : font
        const textWidth = usedFont.widthOfTextAtSize(text, size)
        page.drawText(text, {
          x: (300 - textWidth) / 2,
          y: yPos,
          size,
          font: usedFont,
          color: rgb(color[0], color[1], color[2]),
        })
        yPos -= size + 4
      }

      const drawLeftText = (text: string, options: { size?: number; bold?: boolean } = {}) => {
        const { size = 9, bold = false } = options
        page.drawText(text, { x: 20, y: yPos, size, font: bold ? fontBold : font, color: rgb(0, 0, 0) })
        yPos -= size + 3
      }

      const drawLine = () => {
        page.drawLine({
          start: { x: 20, y: yPos },
          end: { x: 280, y: yPos },
          thickness: 0.5,
          color: rgb(0.7, 0.7, 0.7),
        })
        yPos -= 10
      }

      // Header
      if (businessName) {
        drawCenteredText(businessName.toUpperCase(), { size: 14, bold: true })
      }
      if (businessAddress) {
        drawCenteredText(businessAddress, { size: 8, color: [0.4, 0.4, 0.4] })
      }
      if (businessPhone) {
        drawCenteredText(businessPhone, { size: 8, color: [0.4, 0.4, 0.4] })
      }
      
      yPos -= 10
      drawLine()
      
      drawCenteredText('RECEIPT', { size: 12, bold: true })
      yPos -= 5
      
      drawLeftText(`Receipt #: ${receiptNumber}`)
      drawLeftText(`Date: ${receiptDate}`)
      if (customerName) {
        drawLeftText(`Customer: ${customerName}`)
      }
      drawLeftText(`Payment: ${paymentMethod}`)
      
      yPos -= 5
      drawLine()

      // Items header
      page.drawText('Item', { x: 20, y: yPos, size: 8, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      page.drawText('Qty', { x: 160, y: yPos, size: 8, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      page.drawText('Price', { x: 195, y: yPos, size: 8, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      page.drawText('Total', { x: 240, y: yPos, size: 8, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      yPos -= 15

      // Items
      for (const item of items) {
        if (!item.description) continue
        const itemTotal = item.quantity * item.price
        const desc = item.description.length > 20 ? item.description.slice(0, 20) + '...' : item.description
        page.drawText(desc, { x: 20, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(item.quantity.toString(), { x: 165, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(`$${item.price.toFixed(2)}`, { x: 195, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(`$${itemTotal.toFixed(2)}`, { x: 240, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        yPos -= 14
      }

      yPos -= 5
      drawLine()

      // Totals
      page.drawText('Subtotal:', { x: 160, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
      page.drawText(`$${subtotal.toFixed(2)}`, { x: 240, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
      yPos -= 14

      if (taxRate > 0) {
        page.drawText(`Tax (${taxRate}%):`, { x: 160, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(`$${tax.toFixed(2)}`, { x: 240, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        yPos -= 14
      }

      page.drawText('TOTAL:', { x: 160, y: yPos, size: 11, font: fontBold, color: rgb(0, 0, 0) })
      page.drawText(`$${total.toFixed(2)}`, { x: 240, y: yPos, size: 11, font: fontBold, color: rgb(0, 0, 0) })
      yPos -= 25

      drawLine()
      
      drawCenteredText('Thank you for your business!', { size: 9, color: [0.4, 0.4, 0.4] })
      yPos -= 5
      drawCenteredText('Please keep this receipt for your records', { size: 7, color: [0.5, 0.5, 0.5] })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `receipt-${receiptNumber}.pdf`
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
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/tools" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <IconArrowLeft className="h-4 w-4" />
          <span>Back to tools</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <IconReceipt2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Receipt Generator</h1>
            <p className="text-gray-600">Create professional receipts instantly</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Business Details</h2>
              <Input
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <Input
                placeholder="Business Address"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
              />
              <Input
                placeholder="Phone Number"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Receipt Info</h2>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Receipt #"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                />
                <Input
                  type="date"
                  value={receiptDate}
                  onChange={(e) => setReceiptDate(e.target.value)}
                />
              </div>
              <Input
                placeholder="Customer Name (optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Items</h2>
                <Button variant="outline" size="sm" onClick={addItem} className="gap-1">
                  <IconPlus className="h-4 w-4" />
                  Add Item
                </Button>
              </div>
              
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity || ''}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        step="0.01"
                        value={item.price || ''}
                        onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  {items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 mt-1"
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-gray-600">Tax Rate:</span>
                <Input
                  type="number"
                  value={taxRateStr}
                  onChange={(e) => setTaxRateStr(e.target.value)}
                  className="w-20"
                  step="0.1"
                />
                <span className="text-sm text-gray-600">%</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Receipt Preview */}
              <div className="bg-gradient-to-b from-gray-100 to-gray-200 p-6">
                <div className="bg-white rounded-lg shadow-md p-6 max-w-[280px] mx-auto font-mono text-xs">
                  <div className="text-center mb-4">
                    {businessName && <p className="font-bold text-sm uppercase">{businessName}</p>}
                    {businessAddress && <p className="text-gray-500">{businessAddress}</p>}
                    {businessPhone && <p className="text-gray-500">{businessPhone}</p>}
                  </div>
                  
                  <div className="border-t border-dashed border-gray-300 my-3" />
                  
                  <p className="text-center font-bold mb-2">RECEIPT</p>
                  <p>Receipt #: {receiptNumber}</p>
                  <p>Date: {receiptDate}</p>
                  {customerName && <p>Customer: {customerName}</p>}
                  <p>Payment: {paymentMethod}</p>
                  
                  <div className="border-t border-dashed border-gray-300 my-3" />
                  
                  <div className="space-y-1">
                    {items.filter(i => i.description).map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="truncate max-w-[140px]">{item.quantity}x {item.description}</span>
                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-dashed border-gray-300 my-3" />
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {taxRate > 0 && (
                      <div className="flex justify-between">
                        <span>Tax ({taxRate}%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-sm pt-1">
                      <span>TOTAL</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed border-gray-300 my-3" />
                  
                  <p className="text-center text-gray-500">Thank you for your business!</p>
                </div>
              </div>
            </div>

            <Button
              onClick={generatePDF}
              disabled={generating || items.every(i => !i.description)}
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
                  Download Receipt PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

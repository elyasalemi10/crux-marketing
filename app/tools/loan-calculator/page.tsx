'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LandingNavbar } from '@/components/landing-navbar'
import { Footer } from '@/components/footer'

type AmortizationRow = {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function LoanCalculatorPage() {
  const [loanAmountStr, setLoanAmountStr] = useState('300000')
  const [interestRateStr, setInterestRateStr] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState(30)
  const [downPaymentStr, setDownPaymentStr] = useState('60000')
  const [propertyTaxStr, setPropertyTaxStr] = useState('3600')
  const [insuranceStr, setInsuranceStr] = useState('1200')
  const [generating, setGenerating] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  
  // Parse string values to numbers for calculations
  const loanAmount = parseFloat(loanAmountStr) || 0
  const interestRate = parseFloat(interestRateStr) || 0
  const downPayment = parseFloat(downPaymentStr) || 0
  const propertyTax = parseFloat(propertyTaxStr) || 0
  const insurance = parseFloat(insuranceStr) || 0

  const calculation = useMemo(() => {
    const principal = loanAmount - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12

    if (principal <= 0 || monthlyRate <= 0 || numPayments <= 0) {
      return null
    }

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    const monthlyTax = propertyTax / 12
    const monthlyInsurance = insurance / 12
    const totalMonthly = monthlyPayment + monthlyTax + monthlyInsurance
    const totalInterest = (monthlyPayment * numPayments) - principal
    const totalCost = principal + totalInterest

    const schedule: AmortizationRow[] = []
    let balance = principal
    
    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment
      
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }

    return {
      principal,
      monthlyPayment,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      totalInterest,
      totalCost,
      schedule,
    }
  }, [loanAmount, downPayment, interestRate, loanTerm, propertyTax, insurance])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num)
  }

  const formatCurrencyFull = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(num)
  }

  const generatePdf = async () => {
    if (!calculation) return
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
      
      const drawText = (text: string, options: { bold?: boolean; size?: number; x?: number; color?: [number, number, number] } = {}) => {
        const { bold = false, size = 11, x = margin, color = [0.1, 0.1, 0.1] } = options
        page.drawText(text, {
          x,
          y: yPos,
          size,
          font: bold ? fontBold : font,
          color: rgb(color[0], color[1], color[2]),
        })
      }

      drawText('LOAN AMORTIZATION REPORT', { bold: true, size: 20 })
      yPos -= 30
      drawText(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, { size: 10, color: [0.5, 0.5, 0.5] })
      yPos -= 40

      drawText('LOAN DETAILS', { bold: true, size: 14 })
      yPos -= 25
      
      const details = [
        ['Property Value:', formatCurrency(loanAmount)],
        ['Down Payment:', formatCurrency(downPayment)],
        ['Loan Amount:', formatCurrency(calculation.principal)],
        ['Interest Rate:', `${interestRate}%`],
        ['Loan Term:', `${loanTerm} years (${loanTerm * 12} months)`],
      ]
      
      for (const [label, value] of details) {
        drawText(label, { size: 10 })
        drawText(value, { x: 200, bold: true, size: 10 })
        yPos -= 18
      }
      
      yPos -= 20
      drawText('MONTHLY PAYMENT BREAKDOWN', { bold: true, size: 14 })
      yPos -= 25
      
      const payments = [
        ['Principal & Interest:', formatCurrencyFull(calculation.monthlyPayment)],
        ['Property Tax:', formatCurrencyFull(calculation.monthlyTax)],
        ['Insurance:', formatCurrencyFull(calculation.monthlyInsurance)],
        ['Total Monthly Payment:', formatCurrencyFull(calculation.totalMonthly)],
      ]
      
      for (const [label, value] of payments) {
        const isTotal = label.includes('Total')
        if (isTotal) yPos -= 5
        drawText(label, { size: 10, bold: isTotal })
        drawText(value, { x: 200, bold: true, size: isTotal ? 12 : 10, color: isTotal ? [0.17, 0.69, 0.92] : [0.1, 0.1, 0.1] })
        yPos -= isTotal ? 22 : 18
      }
      
      yPos -= 20
      drawText('LOAN SUMMARY', { bold: true, size: 14 })
      yPos -= 25
      
      const summary = [
        ['Total of All Payments:', formatCurrency(calculation.totalCost + calculation.monthlyTax * loanTerm * 12 + calculation.monthlyInsurance * loanTerm * 12)],
        ['Total Interest Paid:', formatCurrency(calculation.totalInterest)],
        ['Interest as % of Loan:', `${((calculation.totalInterest / calculation.principal) * 100).toFixed(1)}%`],
      ]
      
      for (const [label, value] of summary) {
        drawText(label, { size: 10 })
        drawText(value, { x: 200, bold: true, size: 10 })
        yPos -= 18
      }
      
      yPos -= 30
      drawText('AMORTIZATION SCHEDULE (First 12 Months)', { bold: true, size: 14 })
      yPos -= 20
      
      const colX = [margin, 100, 180, 260, 340, 440]
      const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Balance']
      
      page.drawRectangle({ x: margin - 5, y: yPos - 5, width: width - margin * 2 + 10, height: 20, color: rgb(0.95, 0.95, 0.95) })
      
      headers.forEach((h, i) => {
        page.drawText(h, { x: colX[i], y: yPos, size: 9, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      })
      yPos -= 20
      
      const scheduleRows = calculation.schedule.slice(0, 12)
      
      for (const row of scheduleRows) {
        const values = [
          row.month.toString(),
          formatCurrencyFull(row.payment),
          formatCurrencyFull(row.principal),
          formatCurrencyFull(row.interest),
          formatCurrencyFull(row.balance),
        ]
        
        values.forEach((v, i) => {
          page.drawText(v, { x: colX[i], y: yPos, size: 9, font, color: rgb(0.2, 0.2, 0.2) })
        })
        yPos -= 16
      }
      
      yPos -= 10
      drawText('... continues for remaining months', { size: 9, color: [0.5, 0.5, 0.5] })
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `loan-amortization-${Date.now()}.pdf`
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
              Loan & Mortgage Calculator
            </h1>
            <p className="text-gray-600">
              Calculate payments, interest, and generate amortization schedules
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Loan Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Property Value / Loan Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <Input 
                        type="number"
                        className="pl-7"
                        value={loanAmountStr}
                        onChange={e => setLoanAmountStr(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Down Payment</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <Input 
                        type="number"
                        className="pl-7"
                        value={downPaymentStr}
                        onChange={e => setDownPaymentStr(e.target.value)}
                      />
                    </div>
                    {loanAmount > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {((downPayment / loanAmount) * 100).toFixed(1)}% down
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Interest Rate (%)</label>
                      <Input 
                        type="number"
                        step="0.1"
                        value={interestRateStr}
                        onChange={e => setInterestRateStr(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Loan Term (Years)</label>
                      <select 
                        className="w-full h-10 px-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2bb1ea]"
                        value={loanTerm}
                        onChange={e => setLoanTerm(Number(e.target.value))}
                      >
                        <option value={10}>10 years</option>
                        <option value={15}>15 years</option>
                        <option value={20}>20 years</option>
                        <option value={25}>25 years</option>
                        <option value={30}>30 years</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Additional Costs (Optional)</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Annual Property Tax</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <Input 
                        type="number"
                        className="pl-7"
                        value={propertyTaxStr}
                        onChange={e => setPropertyTaxStr(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Annual Insurance</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <Input 
                        type="number"
                        className="pl-7"
                        value={insuranceStr}
                        onChange={e => setInsuranceStr(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 space-y-4 h-fit">
              <div className="bg-white rounded-2xl shadow-sm border p-8">
                {calculation ? (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-500 mb-1">Monthly Payment</p>
                      <p className="text-4xl font-bold text-[#2bb1ea]">
                        {formatCurrencyFull(calculation.totalMonthly)}
                      </p>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Principal & Interest</span>
                        <span className="font-medium">{formatCurrencyFull(calculation.monthlyPayment)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Property Tax</span>
                        <span className="font-medium">{formatCurrencyFull(calculation.monthlyTax)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Insurance</span>
                        <span className="font-medium">{formatCurrencyFull(calculation.monthlyInsurance)}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold">
                        <span>Total Monthly</span>
                        <span className="text-[#2bb1ea]">{formatCurrencyFull(calculation.totalMonthly)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Loan Amount</p>
                          <p className="font-semibold">{formatCurrency(calculation.principal)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Interest</p>
                          <p className="font-semibold text-orange-600">{formatCurrency(calculation.totalInterest)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Cost</p>
                          <p className="font-semibold">{formatCurrency(calculation.totalCost)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Interest %</p>
                          <p className="font-semibold">{((calculation.totalInterest / calculation.principal) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-[#2bb1ea]"
                        style={{ width: `${(calculation.principal / calculation.totalCost) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Principal ({((calculation.principal / calculation.totalCost) * 100).toFixed(0)}%)</span>
                      <span>Interest ({((calculation.totalInterest / calculation.totalCost) * 100).toFixed(0)}%)</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p>Enter loan details to see calculations</p>
                  </div>
                )}
              </div>

              <Button 
                onClick={generatePdf}
                disabled={!calculation || generating}
                className="w-full h-12 bg-[#2bb1ea] hover:bg-[#2bb1ea]/90 text-white font-medium"
              >
                {generating ? 'Generating PDF...' : 'Download Report (PDF)'}
              </Button>
              
              <Button 
                onClick={() => setShowSchedule(!showSchedule)}
                disabled={!calculation}
                variant="outline"
                className="w-full h-10 border-gray-300"
              >
                {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
              </Button>
            </div>
          </div>

          {showSchedule && calculation && (
            <div className="mt-8 bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="font-semibold text-gray-900">Amortization Schedule</h2>
                <p className="text-sm text-gray-500">Monthly breakdown of your loan payments</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Month</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Year</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-600">Payment</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-600">Principal</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-600">Interest</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-600">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {calculation.schedule.filter((_, i) => i % 12 === 0 || i < 12).map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{row.month}</td>
                        <td className="px-4 py-3 text-gray-500">Year {Math.ceil(row.month / 12)}</td>
                        <td className="px-4 py-3 text-right">{formatCurrencyFull(row.payment)}</td>
                        <td className="px-4 py-3 text-right text-green-600">{formatCurrencyFull(row.principal)}</td>
                        <td className="px-4 py-3 text-right text-orange-600">{formatCurrencyFull(row.interest)}</td>
                        <td className="px-4 py-3 text-right font-medium">{formatCurrencyFull(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
                Showing yearly snapshots. Download PDF for complete schedule.
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconArrowLeft, IconDownload, IconTrendingUp } from '@tabler/icons-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export default function CompoundInterestCalculatorPage() {
  const [principalStr, setPrincipalStr] = useState('10000')
  const [rateStr, setRateStr] = useState('7')
  const [yearsStr, setYearsStr] = useState('10')
  const [contributionStr, setContributionStr] = useState('200')
  const [compoundFrequency, setCompoundFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('monthly')
  const [generating, setGenerating] = useState(false)

  const principal = parseFloat(principalStr) || 0
  const rate = parseFloat(rateStr) || 0
  const years = parseInt(yearsStr) || 0
  const contribution = parseFloat(contributionStr) || 0

  const calculation = useMemo(() => {
    if (principal <= 0 || rate <= 0 || years <= 0) return null

    const periodsPerYear = compoundFrequency === 'monthly' ? 12 : compoundFrequency === 'quarterly' ? 4 : 1
    const totalPeriods = years * periodsPerYear
    const ratePerPeriod = rate / 100 / periodsPerYear

    const yearlyData: { year: number; balance: number; contributions: number; interest: number }[] = []
    
    let balance = principal
    let totalContributions = principal
    let totalInterest = 0

    for (let period = 1; period <= totalPeriods; period++) {
      const interestEarned = balance * ratePerPeriod
      balance += interestEarned + contribution
      totalContributions += contribution
      totalInterest += interestEarned

      if (period % periodsPerYear === 0) {
        yearlyData.push({
          year: period / periodsPerYear,
          balance: balance,
          contributions: totalContributions,
          interest: totalInterest,
        })
      }
    }

    return {
      finalBalance: balance,
      totalContributions,
      totalInterest,
      yearlyData,
    }
  }, [principal, rate, years, contribution, compoundFrequency])

  const generatePDF = async () => {
    if (!calculation) return
    setGenerating(true)

    try {
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([612, 792])
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      let yPos = 740

      const drawText = (text: string, options: { size?: number; bold?: boolean; color?: number[] } = {}) => {
        const { size = 11, bold = false, color = [0, 0, 0] } = options
        page.drawText(text, {
          x: 50,
          y: yPos,
          size,
          font: bold ? fontBold : font,
          color: rgb(color[0], color[1], color[2]),
        })
        yPos -= size + 6
      }

      drawText('Compound Interest Report', { size: 24, bold: true })
      yPos -= 10
      drawText(`Generated: ${new Date().toLocaleDateString()}`, { size: 10, color: [0.5, 0.5, 0.5] })
      yPos -= 20

      drawText('Investment Summary', { size: 14, bold: true, color: [0.1, 0.5, 0.7] })
      yPos -= 5
      drawText(`Initial Investment: $${principal.toLocaleString()}`)
      drawText(`Annual Interest Rate: ${rate}%`)
      drawText(`Investment Period: ${years} years`)
      drawText(`${compoundFrequency.charAt(0).toUpperCase() + compoundFrequency.slice(1)} Contribution: $${contribution.toLocaleString()}`)
      drawText(`Compounding: ${compoundFrequency.charAt(0).toUpperCase() + compoundFrequency.slice(1)}`)
      yPos -= 15

      drawText('Results', { size: 14, bold: true, color: [0.1, 0.5, 0.7] })
      yPos -= 5
      drawText(`Final Balance: $${calculation.finalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, { bold: true })
      drawText(`Total Contributions: $${calculation.totalContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
      drawText(`Total Interest Earned: $${calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)
      yPos -= 20

      drawText('Year-by-Year Breakdown', { size: 14, bold: true, color: [0.1, 0.5, 0.7] })
      yPos -= 10

      page.drawText('Year', { x: 50, y: yPos, size: 10, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      page.drawText('Balance', { x: 120, y: yPos, size: 10, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      page.drawText('Contributions', { x: 220, y: yPos, size: 10, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      page.drawText('Interest Earned', { x: 340, y: yPos, size: 10, font: fontBold, color: rgb(0.3, 0.3, 0.3) })
      yPos -= 20

      for (const row of calculation.yearlyData.slice(0, 25)) {
        page.drawText(row.year.toString(), { x: 50, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(`$${row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, { x: 120, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(`$${row.contributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, { x: 220, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(`$${row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, { x: 340, y: yPos, size: 9, font, color: rgb(0, 0, 0) })
        yPos -= 16
        if (yPos < 100) break
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `compound-interest-report-${Date.now()}.pdf`
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <IconTrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compound Interest Calculator</h1>
            <p className="text-gray-600">See how your investments can grow over time</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Initial Investment ($)</label>
              <Input
                type="number"
                value={principalStr}
                onChange={(e) => setPrincipalStr(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
              <Input
                type="number"
                step="0.1"
                value={rateStr}
                onChange={(e) => setRateStr(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Investment Period (years)</label>
              <Input
                type="number"
                value={yearsStr}
                onChange={(e) => setYearsStr(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Regular Contribution ($)</label>
              <Input
                type="number"
                value={contributionStr}
                onChange={(e) => setContributionStr(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Compound Frequency</label>
              <div className="flex gap-2">
                {(['monthly', 'quarterly', 'annually'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setCompoundFrequency(freq)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      compoundFrequency === freq
                        ? 'bg-[#2bb1ea] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {calculation ? (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Growth</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                      <p className="text-sm text-green-700 mb-1">Final Balance</p>
                      <p className="text-3xl font-bold text-green-800">
                        ${calculation.finalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50">
                        <p className="text-sm text-gray-600 mb-1">Total Contributions</p>
                        <p className="text-xl font-semibold text-gray-900">
                          ${calculation.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-50">
                        <p className="text-sm text-blue-700 mb-1">Interest Earned</p>
                        <p className="text-xl font-semibold text-blue-800">
                          ${calculation.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    {/* Visual Growth Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Contributions</span>
                        <span>Interest</span>
                      </div>
                      <div className="h-4 rounded-full bg-gray-200 overflow-hidden flex">
                        <div 
                          className="bg-gray-400 h-full"
                          style={{ width: `${(calculation.totalContributions / calculation.finalBalance) * 100}%` }}
                        />
                        <div 
                          className="bg-green-500 h-full"
                          style={{ width: `${(calculation.totalInterest / calculation.finalBalance) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={generatePDF}
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
                      Download PDF Report
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
                Enter valid values to see your investment growth
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

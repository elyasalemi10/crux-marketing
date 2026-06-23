'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconArrowLeft, IconPlus, IconTrash, IconDownload } from '@tabler/icons-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

type BudgetItem = {
  id: string
  category: string
  description: string
  amount: number
  type: 'income' | 'expense'
}

const DEFAULT_CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Other Income'],
  expense: ['Housing', 'Transportation', 'Food', 'Utilities', 'Insurance', 'Healthcare', 'Entertainment', 'Shopping', 'Savings', 'Debt', 'Other']
}

export default function BudgetPlannerPage() {
  const [budgetName, setBudgetName] = useState('Monthly Budget')
  const [period, setPeriod] = useState('Monthly')
  const [items, setItems] = useState<BudgetItem[]>([
    { id: '1', category: 'Salary', description: 'Main job', amount: 5000, type: 'income' },
    { id: '2', category: 'Housing', description: 'Rent/Mortgage', amount: 1500, type: 'expense' },
  ])

  const addItem = (type: 'income' | 'expense') => {
    const defaultCategory = type === 'income' ? 'Salary' : 'Housing'
    setItems([...items, { 
      id: Date.now().toString(), 
      category: defaultCategory, 
      description: '', 
      amount: 0, 
      type 
    }])
  }

  const updateItem = (id: string, field: keyof BudgetItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const calculations = useMemo(() => {
    const totalIncome = items.filter(i => i.type === 'income').reduce((sum, i) => sum + i.amount, 0)
    const totalExpenses = items.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.amount, 0)
    const balance = totalIncome - totalExpenses
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0
    
    const expensesByCategory: Record<string, number> = {}
    items.filter(i => i.type === 'expense').forEach(item => {
      expensesByCategory[item.category] = (expensesByCategory[item.category] || 0) + item.amount
    })

    return { totalIncome, totalExpenses, balance, savingsRate, expensesByCategory }
  }, [items])

  const downloadPDF = async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([612, 792])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    
    let y = 750
    const margin = 50
    const width = 512

    page.drawText(budgetName, { x: margin, y, size: 24, font: fontBold, color: rgb(0.1, 0.1, 0.1) })
    y -= 25
    page.drawText(`Period: ${period}`, { x: margin, y, size: 12, font, color: rgb(0.4, 0.4, 0.4) })
    y -= 40

    page.drawText('INCOME', { x: margin, y, size: 14, font: fontBold, color: rgb(0.13, 0.55, 0.13) })
    y -= 20
    const incomeItems = items.filter(i => i.type === 'income')
    incomeItems.forEach(item => {
      page.drawText(`${item.category}: ${item.description || '-'}`, { x: margin, y, size: 11, font })
      page.drawText(`$${item.amount.toLocaleString()}`, { x: margin + width - 80, y, size: 11, font })
      y -= 18
    })
    page.drawText(`Total Income: $${calculations.totalIncome.toLocaleString()}`, { 
      x: margin, y, size: 12, font: fontBold, color: rgb(0.13, 0.55, 0.13) 
    })
    y -= 35

    page.drawText('EXPENSES', { x: margin, y, size: 14, font: fontBold, color: rgb(0.86, 0.2, 0.2) })
    y -= 20
    const expenseItems = items.filter(i => i.type === 'expense')
    expenseItems.forEach(item => {
      page.drawText(`${item.category}: ${item.description || '-'}`, { x: margin, y, size: 11, font })
      page.drawText(`$${item.amount.toLocaleString()}`, { x: margin + width - 80, y, size: 11, font })
      y -= 18
    })
    page.drawText(`Total Expenses: $${calculations.totalExpenses.toLocaleString()}`, { 
      x: margin, y, size: 12, font: fontBold, color: rgb(0.86, 0.2, 0.2) 
    })
    y -= 40

    page.drawRectangle({ x: margin, y: y - 5, width, height: 60, color: rgb(0.96, 0.96, 0.98) })
    y -= 0
    page.drawText('SUMMARY', { x: margin + 10, y: y + 40, size: 14, font: fontBold })
    page.drawText(`Net Balance: $${calculations.balance.toLocaleString()}`, { 
      x: margin + 10, y: y + 20, size: 12, font: fontBold, 
      color: calculations.balance >= 0 ? rgb(0.13, 0.55, 0.13) : rgb(0.86, 0.2, 0.2) 
    })
    page.drawText(`Savings Rate: ${calculations.savingsRate.toFixed(1)}%`, { 
      x: margin + 10, y: y + 5, size: 11, font, color: rgb(0.4, 0.4, 0.4) 
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${budgetName.replace(/\s+/g, '-').toLowerCase()}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-[#2bb1ea] mb-6">
          <IconArrowLeft className="w-4 h-4 mr-1" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Planner</h1>
          <p className="text-gray-600">Plan and track your income and expenses. Download as PDF.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget Name</label>
                  <Input value={budgetName} onChange={e => setBudgetName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                  <select
                    value={period}
                    onChange={e => setPeriod(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm text-gray-900"
                  >
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-green-700">Income</h3>
                  <Button size="sm" variant="outline" onClick={() => addItem('income')}>
                    <IconPlus className="w-4 h-4 mr-1" /> Add Income
                  </Button>
                </div>
                <div className="space-y-2">
                  {items.filter(i => i.type === 'income').map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <select
                        value={item.category}
                        onChange={e => updateItem(item.id, 'category', e.target.value)}
                        className="h-9 px-2 rounded border border-gray-300 text-sm bg-white text-gray-900"
                      >
                        {DEFAULT_CATEGORIES.income.map(cat => (
                          <option key={cat}>{cat}</option>
                        ))}
                      </select>
                      <Input
                        value={item.description}
                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Description"
                        className="flex-1 h-9"
                      />
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={item.amount || ''}
                          onChange={e => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-28 h-9 pl-7"
                        />
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}>
                        <IconTrash className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-red-700">Expenses</h3>
                  <Button size="sm" variant="outline" onClick={() => addItem('expense')}>
                    <IconPlus className="w-4 h-4 mr-1" /> Add Expense
                  </Button>
                </div>
                <div className="space-y-2">
                  {items.filter(i => i.type === 'expense').map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                      <select
                        value={item.category}
                        onChange={e => updateItem(item.id, 'category', e.target.value)}
                        className="h-9 px-2 rounded border border-gray-300 text-sm bg-white text-gray-900"
                      >
                        {DEFAULT_CATEGORIES.expense.map(cat => (
                          <option key={cat}>{cat}</option>
                        ))}
                      </select>
                      <Input
                        value={item.description}
                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Description"
                        className="flex-1 h-9"
                      />
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          value={item.amount || ''}
                          onChange={e => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-28 h-9 pl-7"
                        />
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}>
                        <IconTrash className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Income</span>
                  <span className="font-medium text-green-600">${calculations.totalIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Expenses</span>
                  <span className="font-medium text-red-600">${calculations.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Net Balance</span>
                    <span className={`font-bold text-lg ${calculations.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${calculations.balance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Savings Rate</span>
                  <span className={`font-medium ${calculations.savingsRate >= 20 ? 'text-green-600' : calculations.savingsRate >= 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {calculations.savingsRate.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${calculations.savingsRate >= 20 ? 'bg-green-500' : calculations.savingsRate >= 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.max(0, Math.min(100, calculations.savingsRate))}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {calculations.savingsRate >= 20 ? 'Great! Aim to maintain 20%+ savings' : 
                   calculations.savingsRate >= 0 ? 'Try to increase your savings rate' : 
                   'Your expenses exceed your income'}
                </p>
              </div>

              {Object.keys(calculations.expensesByCategory).length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Expenses by Category</h4>
                  <div className="space-y-2">
                    {Object.entries(calculations.expensesByCategory)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, amount]) => (
                        <div key={category} className="flex justify-between text-sm">
                          <span className="text-gray-600">{category}</span>
                          <span className="text-gray-900">${amount.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <Button onClick={downloadPDF} className="w-full bg-[#2bb1ea] hover:bg-[#2bb1ea]/90">
                <IconDownload className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

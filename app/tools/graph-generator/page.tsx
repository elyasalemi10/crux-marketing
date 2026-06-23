'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconArrowLeft, IconPlus, IconTrash, IconDownload } from '@tabler/icons-react'
import html2canvas from 'html2canvas'

type DataPoint = {
  id: string
  x: string
  y: number
}

type ChartType = 'bar' | 'line' | 'pie'

const CHART_COLORS = [
  '#2bb1ea', '#f97316', '#22c55e', '#ef4444', '#8b5cf6', 
  '#ec4899', '#14b8a6', '#f59e0b', '#6366f1', '#84cc16'
]

export default function GraphGeneratorPage() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [title, setTitle] = useState('Sales Report')
  const [xAxisLabel, setXAxisLabel] = useState('Month')
  const [yAxisLabel, setYAxisLabel] = useState('Revenue ($)')
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { id: '1', x: 'Jan', y: 4500 },
    { id: '2', x: 'Feb', y: 5200 },
    { id: '3', x: 'Mar', y: 4800 },
    { id: '4', x: 'Apr', y: 6100 },
    { id: '5', x: 'May', y: 5900 },
  ])
  const [primaryColor, setPrimaryColor] = useState('#2bb1ea')
  const [showGrid, setShowGrid] = useState(true)
  const [showValues, setShowValues] = useState(true)

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { id: Date.now().toString(), x: '', y: 0 }])
  }

  const updateDataPoint = (id: string, field: 'x' | 'y', value: string | number) => {
    setDataPoints(dataPoints.map(dp => 
      dp.id === id ? { ...dp, [field]: value } : dp
    ))
  }

  const removeDataPoint = (id: string) => {
    setDataPoints(dataPoints.filter(dp => dp.id !== id))
  }

  const maxValue = Math.max(...dataPoints.map(dp => dp.y), 1)
  const total = dataPoints.reduce((sum, dp) => sum + dp.y, 0)

  const downloadChart = async () => {
    if (!chartRef.current) return
    
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
    })
    
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-chart.png`
    a.click()
  }

  const renderBarChart = () => {
    const barWidth = Math.min(60, (500 / dataPoints.length) - 10)
    
    return (
      <div className="relative h-80">
        {showGrid && (
          <div className="absolute inset-0 left-12 right-0">
            {[0, 25, 50, 75, 100].map(pct => (
              <div 
                key={pct} 
                className="absolute left-0 right-0 border-t border-gray-200"
                style={{ bottom: `${pct}%` }}
              >
                <span className="absolute -left-12 -top-2 text-xs text-gray-400 w-10 text-right">
                  {Math.round(maxValue * pct / 100)}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="absolute inset-0 left-12 right-0 bottom-8 flex items-end justify-around">
          {dataPoints.map((dp) => {
            const height = (dp.y / maxValue) * 100
            return (
              <div key={dp.id} className="flex flex-col items-center justify-end h-full">
                <div className="relative flex flex-col items-center justify-end" style={{ height: '100%' }}>
                  {showValues && (
                    <span className="text-xs font-medium text-gray-700 mb-1">
                      {dp.y.toLocaleString()}
                    </span>
                  )}
                  <div 
                    className="rounded-t transition-all duration-300"
                    style={{ 
                      width: barWidth, 
                      height: `${height}%`,
                      backgroundColor: primaryColor,
                      minHeight: dp.y > 0 ? '4px' : '0'
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2 text-center absolute -bottom-6" style={{ maxWidth: barWidth + 20 }}>
                  {dp.x}
                </span>
              </div>
            )
          })}
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 origin-center whitespace-nowrap">
          {yAxisLabel}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">
          {xAxisLabel}
        </div>
      </div>
    )
  }

  const renderLineChart = () => {
    const width = 500
    const height = 280
    const padding = { left: 50, right: 20, top: 20, bottom: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom
    
    const points = dataPoints.map((dp, idx) => ({
      x: padding.left + (idx / (dataPoints.length - 1 || 1)) * chartWidth,
      y: padding.top + chartHeight - (dp.y / maxValue) * chartHeight,
      value: dp.y,
      label: dp.x
    }))
    
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-80">
        {showGrid && [0, 25, 50, 75, 100].map(pct => (
          <g key={pct}>
            <line 
              x1={padding.left} 
              y1={padding.top + chartHeight * (1 - pct / 100)} 
              x2={width - padding.right} 
              y2={padding.top + chartHeight * (1 - pct / 100)}
              stroke="#e5e7eb"
              strokeDasharray="4"
            />
            <text 
              x={padding.left - 8} 
              y={padding.top + chartHeight * (1 - pct / 100) + 4}
              textAnchor="end"
              className="text-xs fill-gray-400"
            >
              {Math.round(maxValue * pct / 100)}
            </text>
          </g>
        ))}
        <path d={pathD} fill="none" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill={primaryColor} />
            <circle cx={p.x} cy={p.y} r="3" fill="white" />
            {showValues && (
              <text x={p.x} y={p.y - 12} textAnchor="middle" className="text-xs font-medium fill-gray-700">
                {p.value.toLocaleString()}
              </text>
            )}
            <text x={p.x} y={height - 10} textAnchor="middle" className="text-xs fill-gray-600">
              {p.label}
            </text>
          </g>
        ))}
        <text x={padding.left / 2} y={height / 2} textAnchor="middle" transform={`rotate(-90 ${padding.left / 2} ${height / 2})`} className="text-xs fill-gray-500">
          {yAxisLabel}
        </text>
        <text x={width / 2} y={height - 2} textAnchor="middle" className="text-xs fill-gray-500">
          {xAxisLabel}
        </text>
      </svg>
    )
  }

  const renderPieChart = () => {
    const size = 280
    const center = size / 2
    const radius = 100
    
    let currentAngle = -90
    const slices = dataPoints.map((dp, idx) => {
      const percentage = total > 0 ? (dp.y / total) * 100 : 0
      const angle = (percentage / 100) * 360
      const startAngle = currentAngle
      currentAngle += angle
      
      const startRad = (startAngle * Math.PI) / 180
      const endRad = ((startAngle + angle) * Math.PI) / 180
      
      const x1 = center + radius * Math.cos(startRad)
      const y1 = center + radius * Math.sin(startRad)
      const x2 = center + radius * Math.cos(endRad)
      const y2 = center + radius * Math.sin(endRad)
      
      const largeArc = angle > 180 ? 1 : 0
      
      const midAngle = ((startAngle + angle / 2) * Math.PI) / 180
      const labelRadius = radius * 0.7
      const labelX = center + labelRadius * Math.cos(midAngle)
      const labelY = center + labelRadius * Math.sin(midAngle)

      return {
        path: `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        color: CHART_COLORS[idx % CHART_COLORS.length],
        percentage,
        label: dp.x,
        value: dp.y,
        labelX,
        labelY
      }
    })

    return (
      <div className="flex items-center justify-center gap-8">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-64 h-64">
          {slices.map((slice, i) => (
            <path key={i} d={slice.path} fill={slice.color} stroke="white" strokeWidth="2" />
          ))}
        </svg>
        <div className="space-y-2">
          {slices.map((slice, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: slice.color }} />
              <span className="text-gray-700">{slice.label}</span>
              <span className="text-gray-500">({slice.percentage.toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/tools" className="inline-flex items-center text-sm text-gray-600 hover:text-[#2bb1ea] mb-6">
          <IconArrowLeft className="w-4 h-4 mr-1" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Graph Generator</h1>
          <p className="text-gray-600">Create professional charts and graphs. Download as PNG image.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Chart Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
                  <div className="flex gap-2">
                    {(['bar', 'line', 'pie'] as ChartType[]).map(type => (
                      <Button
                        key={type}
                        variant={chartType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType(type)}
                        className={chartType === type ? 'bg-[#2bb1ea] hover:bg-[#2bb1ea]/90' : ''}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Chart title" />
                </div>

                {chartType !== 'pie' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis Label</label>
                      <Input value={xAxisLabel} onChange={e => setXAxisLabel(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis Label</label>
                      <Input value={yAxisLabel} onChange={e => setYAxisLabel(e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-full h-10 rounded-md border cursor-pointer"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={showGrid}
                        onChange={e => setShowGrid(e.target.checked)}
                        className="rounded"
                      />
                      Show Grid
                    </label>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={showValues}
                        onChange={e => setShowValues(e.target.checked)}
                        className="rounded"
                      />
                      Show Values
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Data Points</h3>
                <Button size="sm" variant="outline" onClick={addDataPoint}>
                  <IconPlus className="w-4 h-4 mr-1" /> Add Point
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2 text-xs text-gray-500 px-1">
                  <span className="flex-1">Label (X)</span>
                  <span className="w-28">Value (Y)</span>
                  <span className="w-9"></span>
                </div>
                {dataPoints.map(dp => (
                  <div key={dp.id} className="flex items-center gap-2">
                    <Input
                      value={dp.x}
                      onChange={e => updateDataPoint(dp.id, 'x', e.target.value)}
                      placeholder="Label"
                      className="flex-1 h-9"
                    />
                    <Input
                      type="number"
                      value={dp.y || ''}
                      onChange={e => updateDataPoint(dp.id, 'y', parseFloat(e.target.value) || 0)}
                      placeholder="Value"
                      className="w-28 h-9"
                    />
                    <Button size="sm" variant="ghost" onClick={() => removeDataPoint(dp.id)}>
                      <IconTrash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div ref={chartRef} className="bg-white rounded-xl border p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 text-center mb-6">{title}</h2>
              
              {dataPoints.length === 0 ? (
                <div className="h-80 flex items-center justify-center text-gray-400">
                  Add data points to see the chart
                </div>
              ) : chartType === 'bar' ? (
                renderBarChart()
              ) : chartType === 'line' ? (
                renderLineChart()
              ) : (
                renderPieChart()
              )}
            </div>

            <Button onClick={downloadChart} className="w-full bg-[#2bb1ea] hover:bg-[#2bb1ea]/90">
              <IconDownload className="w-4 h-4 mr-2" />
              Download as PNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

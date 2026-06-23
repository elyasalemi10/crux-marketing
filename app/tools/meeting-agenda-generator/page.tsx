'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IconArrowLeft, IconDownload, IconCalendarEvent, IconPlus, IconTrash } from '@tabler/icons-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface AgendaItem {
  id: string
  topic: string
  presenter: string
  duration: string
  notes: string
}

export default function MeetingAgendaGeneratorPage() {
  const [meetingTitle, setMeetingTitle] = useState('')
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState('')
  const [location, setLocation] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [attendees, setAttendees] = useState('')
  const [objectives, setObjectives] = useState('')
  const [items, setItems] = useState<AgendaItem[]>([
    { id: '1', topic: '', presenter: '', duration: '10 min', notes: '' }
  ])
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    const today = new Date()
    setMeetingDate(today.toISOString().split('T')[0])
    setMeetingTime('10:00')
  }, [])

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), topic: '', presenter: '', duration: '10 min', notes: '' }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof AgendaItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const generatePDF = async () => {
    setGenerating(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([612, 792])
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      let yPos = 740

      const drawText = (text: string, options: { x?: number; size?: number; bold?: boolean; color?: number[] } = {}) => {
        const { x = 50, size = 11, bold = false, color = [0, 0, 0] } = options
        page.drawText(text, {
          x,
          y: yPos,
          size,
          font: bold ? fontBold : font,
          color: rgb(color[0], color[1], color[2]),
        })
        yPos -= size + 6
      }

      // Header
      drawText('MEETING AGENDA', { size: 22, bold: true, color: [0.1, 0.4, 0.6] })
      yPos -= 5
      
      if (meetingTitle) {
        drawText(meetingTitle, { size: 16, bold: true })
      }
      yPos -= 10

      // Meeting Details Box
      page.drawRectangle({
        x: 50,
        y: yPos - 60,
        width: 512,
        height: 70,
        color: rgb(0.96, 0.96, 0.98),
        borderColor: rgb(0.9, 0.9, 0.92),
        borderWidth: 1,
      })

      yPos -= 15
      if (meetingDate || meetingTime) {
        drawText(`Date & Time: ${meetingDate} at ${meetingTime}`, { size: 10 })
      }
      if (location) {
        drawText(`Location: ${location}`, { size: 10 })
      }
      if (organizer) {
        drawText(`Organizer: ${organizer}`, { size: 10 })
      }
      if (attendees) {
        drawText(`Attendees: ${attendees}`, { size: 10 })
      }
      yPos -= 20

      if (objectives) {
        drawText('Meeting Objectives:', { size: 12, bold: true, color: [0.1, 0.4, 0.6] })
        yPos -= 2
        const objLines = objectives.split('\n')
        for (const line of objLines) {
          if (line.trim()) {
            drawText(`• ${line.trim()}`, { size: 10, x: 60 })
          }
        }
        yPos -= 10
      }

      // Agenda Items Header
      drawText('Agenda Items', { size: 14, bold: true, color: [0.1, 0.4, 0.6] })
      yPos -= 5

      // Table Header
      page.drawRectangle({
        x: 50,
        y: yPos - 15,
        width: 512,
        height: 20,
        color: rgb(0.1, 0.4, 0.6),
      })
      
      page.drawText('#', { x: 55, y: yPos - 10, size: 9, font: fontBold, color: rgb(1, 1, 1) })
      page.drawText('Topic', { x: 75, y: yPos - 10, size: 9, font: fontBold, color: rgb(1, 1, 1) })
      page.drawText('Presenter', { x: 300, y: yPos - 10, size: 9, font: fontBold, color: rgb(1, 1, 1) })
      page.drawText('Duration', { x: 420, y: yPos - 10, size: 9, font: fontBold, color: rgb(1, 1, 1) })
      page.drawText('Notes', { x: 490, y: yPos - 10, size: 9, font: fontBold, color: rgb(1, 1, 1) })
      yPos -= 25

      // Agenda Items
      items.forEach((item, index) => {
        if (!item.topic) return
        
        const bgColor = index % 2 === 0 ? rgb(1, 1, 1) : rgb(0.98, 0.98, 0.99)
        page.drawRectangle({
          x: 50,
          y: yPos - 15,
          width: 512,
          height: 20,
          color: bgColor,
        })

        page.drawText((index + 1).toString(), { x: 55, y: yPos - 10, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(item.topic.slice(0, 35), { x: 75, y: yPos - 10, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(item.presenter.slice(0, 15), { x: 300, y: yPos - 10, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(item.duration, { x: 420, y: yPos - 10, size: 9, font, color: rgb(0, 0, 0) })
        page.drawText(item.notes.slice(0, 10), { x: 490, y: yPos - 10, size: 9, font, color: rgb(0.5, 0.5, 0.5) })
        
        yPos -= 20
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `meeting-agenda-${Date.now()}.pdf`
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <IconCalendarEvent className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meeting Agenda Generator</h1>
            <p className="text-gray-600">Create professional meeting agendas</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Meeting Details</h2>
            <Input placeholder="Meeting Title" value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Input type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
              <Input type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
              <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              <Input placeholder="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
            </div>
            <Input placeholder="Attendees (comma separated)" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
            <Textarea placeholder="Meeting objectives (one per line)" value={objectives} onChange={(e) => setObjectives(e.target.value)} rows={3} />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Agenda Items</h2>
              <Button variant="outline" size="sm" onClick={addItem} className="gap-1">
                <IconPlus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={item.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Item {index + 1}</span>
                  {items.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 h-8 w-8 p-0">
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input placeholder="Topic" value={item.topic} onChange={(e) => updateItem(item.id, 'topic', e.target.value)} />
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="Presenter" value={item.presenter} onChange={(e) => updateItem(item.id, 'presenter', e.target.value)} />
                  <Input placeholder="Duration (e.g., 10 min)" value={item.duration} onChange={(e) => updateItem(item.id, 'duration', e.target.value)} />
                  <Input placeholder="Notes" value={item.notes} onChange={(e) => updateItem(item.id, 'notes', e.target.value)} />
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={generatePDF}
            disabled={generating || !meetingTitle || items.every(i => !i.topic)}
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
                Download Agenda PDF
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

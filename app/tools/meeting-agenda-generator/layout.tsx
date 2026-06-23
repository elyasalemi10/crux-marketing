import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Meeting Agenda Generator | Create Professional Agendas | CruxLogic',
  description: 'Create professional meeting agendas for free. Add topics, presenters, time allocations, and objectives. Download as PDF, no signup required.',
  keywords: ['meeting agenda generator', 'agenda template', 'meeting agenda maker', 'free agenda creator', 'professional meeting agenda', 'business meeting template', 'PDF agenda'],
  openGraph: {
    title: 'Free Meeting Agenda Generator - Create Professional Agendas',
    description: 'Create professional meeting agendas in minutes. Add topics, presenters, and download as PDF. 100% free.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/meeting-agenda-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Meeting Agenda Generator',
    description: 'Create and download professional meeting agendas for free. No signup required.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/meeting-agenda-generator',
  },
}

export default function MeetingAgendaGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

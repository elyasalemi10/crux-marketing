import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cruxlogic.ai'),
  title: {
    default: 'CruxLogic - Your AI Assistant, Always Connected',
    template: '%s | CruxLogic',
  },
  description: 'CruxLogic is your AI-powered personal assistant that connects Gmail, Outlook, Calendar, Tasks, and Drive. Manage your productivity with natural conversation.',
  keywords: ['AI assistant', 'personal assistant', 'Gmail automation', 'Outlook integration', 'calendar management', 'task automation', 'productivity AI', 'Google integration', 'Microsoft integration'],
  authors: [{ name: 'CruxLogic' }],
  creator: 'CruxLogic',
  publisher: 'CruxLogic Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cruxlogic.ai',
    siteName: 'CruxLogic',
    title: 'CruxLogic - Your AI Assistant, Always Connected',
    description: 'AI-powered personal assistant that connects Gmail, Outlook, Calendar, Tasks, and Drive.',
    images: [
      {
        url: '/logos/CruxLogic-Black-Text-Full.webp',
        width: 1200,
        height: 630,
        alt: 'CruxLogic AI Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CruxLogic - Your AI Assistant, Always Connected',
    description: 'AI-powered personal assistant that connects Gmail, Outlook, Calendar, Tasks, and Drive.',
    creator: '@cruxlogic',
    images: ['/logos/CruxLogic-Black-Text-Full.webp'],
  },
  icons: {
    icon: '/logos/cruxlogic-favicon.webp',
    apple: '/logos/cruxlogic-favicon.webp',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}

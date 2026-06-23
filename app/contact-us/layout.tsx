import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | CruxLogic',
  description: 'Get in touch with the CruxLogic team. Have questions, feedback, or need support? We\'re here to help.',
  openGraph: {
    title: 'Contact Us - CruxLogic',
    description: 'Get in touch with the CruxLogic team for support, feedback, or inquiries.',
    type: 'website',
    url: 'https://cruxlogic.ai/contact-us',
  },
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

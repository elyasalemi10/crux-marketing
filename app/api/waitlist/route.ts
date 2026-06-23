import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown'

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const name = typeof body.name === 'string' && body.name.trim() ? body.name.trim() : null
    const source = typeof body.source === 'string' && body.source.trim() ? body.source.trim() : null

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY not set — cannot process waitlist signup')
      return NextResponse.json(
        { error: 'Waitlist is not configured yet. Please try again later.' },
        { status: 503 },
      )
    }

    const from = process.env.WAITLIST_FROM_EMAIL || 'CruxLogic Waitlist <onboarding@resend.dev>'
    const to = process.env.WAITLIST_NOTIFICATION_EMAIL || 'hello@cruxlogic.ai'

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const { error: sendError } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New waitlist signup: ${email}`,
      text: [
        `New waitlist signup on the marketing site.`,
        ``,
        `Email:  ${email}`,
        `Name:   ${name || '—'}`,
        `Source: ${source || '—'}`,
        `IP:     ${ip}`,
      ].join('\n'),
    })

    if (sendError) {
      console.error('Failed to send waitlist notification email:', sendError)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing waitlist signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

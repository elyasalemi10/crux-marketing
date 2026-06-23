import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function notifyByEmail(email: string, name: string | null, source: string | null) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping waitlist notification email')
    return
  }

  const from = process.env.WAITLIST_FROM_EMAIL || 'CruxLogic Waitlist <onboarding@resend.dev>'
  const to = process.env.WAITLIST_NOTIFY_EMAIL || 'hello@cruxlogic.ai'

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    await resend.emails.send({
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
      ].join('\n'),
    })
  } catch (err) {
    // Don't fail the request if the email can't be sent — the lead is already stored.
    console.error('Failed to send waitlist notification email:', err)
  }
}

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

    const supabase = createServiceClient()

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, name, source, ip_address: ip })

    if (insertError) {
      // Duplicate email — treat as success so the user sees a friendly confirmation.
      if (insertError.code === '23505' || insertError.message?.toLowerCase().includes('duplicate')) {
        return NextResponse.json({ success: true, alreadyJoined: true })
      }
      // Table not created yet.
      if (insertError.message?.includes('does not exist') || insertError.code === '42P01') {
        console.error('waitlist table missing:', insertError)
        return NextResponse.json(
          { error: 'Waitlist is not configured yet. Please try again later.' },
          { status: 503 },
        )
      }
      console.error('Error inserting waitlist signup:', insertError)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    await notifyByEmail(email, name, source)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing waitlist signup:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

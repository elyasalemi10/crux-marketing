import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { audit, requestContext } from '@/lib/audit'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { type, title, description, page_url } = body

    if (!type || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { data: recentSubmissions, error: checkError } = await supabase
      .from('feedback')
      .select('id')
      .eq('ip_address', ip)
      .gte('created_at', twentyFourHoursAgo)
      .limit(1)

    if (checkError) {
      console.error('Error checking recent submissions:', checkError)
      if (checkError.message?.includes('does not exist') || checkError.code === '42P01') {
        return NextResponse.json({ 
          error: 'Feedback system not configured. Please create the feedback table.' 
        }, { status: 503 })
      }
    }

    if (recentSubmissions && recentSubmissions.length > 0) {
      return NextResponse.json({ error: 'You can only submit feedback once every 24 hours' }, { status: 429 })
    }

    const { data: feedback, error: insertError } = await supabase
      .from('feedback')
      .insert({
        type,
        title,
        description,
        page_url,
        ip_address: ip,
        status: 'new',
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting feedback:', insertError)
      if (insertError.message?.includes('does not exist') || insertError.code === '42P01') {
        return NextResponse.json({ 
          error: 'Feedback system not configured. Please create the feedback table.' 
        }, { status: 503 })
      }
      return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
    }

    const { ip: auditIp, userAgent } = requestContext(request)
    audit('feedback.submit', {
      actorId: ip !== 'unknown' ? ip : undefined,
      actorType: 'user',
      resourceType: 'feedback',
      resourceId: feedback.id,
      metadata: { type },
      ip: auditIp,
      userAgent,
    })

    return NextResponse.json({ success: true, id: feedback.id })
  } catch (error) {
    console.error('Error processing feedback:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

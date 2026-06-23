import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { audit } from '@/lib/audit'

// Canonical domain - all requests to fly.dev should redirect here
const CANONICAL_DOMAIN = 'cruxlogic.ai'

// Public paths that don't require authentication
const PUBLIC_PATHS = [
  '/login',
  '/sign-up',
  '/logout',
  '/suspended',          // Suspended user page
  '/blog',               // Public blog
  '/compare',            // Public comparison pages
  '/pricing',            // Public pricing page
  '/support',            // Public support page
  '/tools',              // Public free tools
  '/privacy-policy',     // Public legal page
  '/terms-of-service',   // Public legal page
  '/security',           // Public security info page
  '/api/auth/',          // OTP send/verify/login
  '/api/onboarding/',    // Signup completion (user not yet authenticated)
  '/api/waitlist',       // Pre-launch waitlist signup (unauthenticated)
  '/api/stripe/webhook',
  '/api/proxy/',         // Bot proxy endpoints (authenticated by token)
  '/api/telegram/',      // Telegram webhook endpoints
  '/api/connections/',   // Bot connections check (authenticated by token)
  '/api/agent/',         // Bot agent endpoints (authenticated by token)
  '/api/contacts',       // Bot contacts endpoint (authenticated by token)
  '/api/tools/',         // Public free tools API
  '/api/usage/',         // Bot usage reporting (authenticated by token)
  '/api/whatsapp/callback', // WhatsApp connection callback from gateway
  '/api/tts',            // TTS endpoint (authenticated by x-user-id header from bot)
  '/api/vapi/',          // Vapi webhook and assistant creation (authenticated by token/secret)
  '/api/reminders',      // Bot cron/reminder registration (authenticated by token)
  '/api/cron/',          // Bot cron status endpoint (authenticated by token)
  '/api/gateway/',       // VPS gateway registration (authenticated by proxy token)
]

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function updateSession(request: NextRequest) {
  // Redirect fly.dev requests to canonical domain (cruxlogic.ai)
  // This ensures cookies and auth work correctly on a single domain
  // EXCEPT: API routes are exempt — external services (Vapi webhooks, etc.)
  // may POST to the fly.dev URL and won't follow 301 redirects.
  const host = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  if (host.includes('fly.dev') && !host.includes('localhost') && !pathname.startsWith('/api/')) {
    const url = new URL(request.url)
    url.host = CANONICAL_DOMAIN
    url.protocol = 'https:'
    url.port = ''
    return NextResponse.redirect(url, { status: 301 })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if path is public
  const isPublicPath = PUBLIC_PATHS.some(p => pathname.startsWith(p)) || pathname === '/'

  // Redirect unauthenticated users to login (except public paths)
  if (!isPublicPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Check if user is suspended (for all authenticated, non-public paths)
  // API routes get a 403 JSON response; page routes get redirected
  if (user && !pathname.startsWith('/suspended') && !pathname.startsWith('/logout')) {
    try {
      const serviceClient = getServiceClient()
      const { data: userData } = await serviceClient
        .from('users')
        .select('status')
        .eq('id', user.id)
        .single()

      if (userData?.status === 'suspended') {
        audit('security.suspended_access', {
          actorId: user.id,
          outcome: 'denied',
          metadata: { path: pathname },
          ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
        })
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Account suspended. Contact support@cruxlogic.ai' },
            { status: 403 }
          )
        }
        const url = request.nextUrl.clone()
        url.pathname = '/suspended'
        url.search = ''
        return NextResponse.redirect(url)
      }
    } catch {
      // If check fails, continue normally
    }
  }

  // Redirect authenticated users away from auth pages to dashboard
  // If user is authenticated (has valid Supabase session), redirect to dashboard
  // EXCEPT: Allow /sign-up with step parameter (for Google signup completion flow)
  const isAuthPage = pathname === '/login' || pathname === '/sign-up'
  const isSignupCompletionFlow = pathname === '/sign-up' && request.nextUrl.searchParams.has('step')
  if (isAuthPage && user && !isSignupCompletionFlow) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // For authenticated users on landing page, redirect to dashboard
  if (pathname === '/' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

/**
 * SOC2-compliant audit logging utility.
 *
 * Fire-and-forget: never throws, never blocks the request.
 * No PII in metadata — use IDs, not emails/names.
 *
 * Usage:
 *   audit('auth.login', { actorId: user.id, outcome: 'success', ip, ua })
 *   audit('admin.user.suspend', { actorId: adminId, actorType: 'admin', resourceType: 'user', resourceId: userId })
 *   audit('security.rate_limit', { actorType: 'system', metadata: { key: 'llm:xxx', route: '/api/proxy/chat' } })
 */

import { createClient } from '@supabase/supabase-js'

type ActorType = 'user' | 'admin' | 'system' | 'bot'
type Outcome = 'success' | 'failure' | 'denied'

interface AuditOptions {
  actorId?: string | null
  actorType?: ActorType
  outcome?: Outcome
  resourceType?: string
  resourceId?: string
  metadata?: Record<string, unknown>
  ip?: string | null
  userAgent?: string | null
}

// Lazy singleton — created once, reused
let _client: ReturnType<typeof createClient> | null = null

function getClient() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _client
}

/**
 * Log an audit event. Fire-and-forget — never throws.
 */
export function audit(action: string, opts: AuditOptions = {}): void {
  // Don't await — fire and forget
  getClient()
    .from('audit_logs')
    .insert({
      action,
      actor_id: opts.actorId || null,
      actor_type: opts.actorType || 'user',
      outcome: opts.outcome || 'success',
      resource_type: opts.resourceType || null,
      resource_id: opts.resourceId || null,
      metadata: opts.metadata || {},
      ip_address: opts.ip || null,
      user_agent: opts.userAgent ? opts.userAgent.slice(0, 500) : null,
    })
    .then(({ error }) => {
      if (error) {
        // Log to console as fallback — never throw
        console.error('[Audit] Failed to write audit log:', error.message)
      }
    })
    .catch(() => {
      // Swallow — audit should never crash the app
    })
}

/**
 * Extract IP and User-Agent from a Request for audit context.
 */
export function requestContext(request: Request | { headers: { get(name: string): string | null } }) {
  return {
    ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        null,
    userAgent: request.headers.get('user-agent') || null,
  }
}

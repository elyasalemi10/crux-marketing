/** @type {import('next').NextConfig} */

// The authenticated dashboard lives on a separate deployment (Fly.io).
// Marketing CTAs that point at app-only routes (/login, /sign-up, etc.)
// are redirected there. Set NEXT_PUBLIC_DASHBOARD_URL in the environment.
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.cruxlogic.ai'

const nextConfig = {
  // Match the dashboard: the extracted code relies on loose type/lint checks.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Pre-launch: sign-up funnels into the waitlist instead of the dashboard.
      { source: '/sign-up', destination: '/waitlist', permanent: false },
      // Existing users still log in to the dashboard.
      { source: '/login', destination: `${DASHBOARD_URL}/login`, permanent: false },
      { source: '/logout', destination: `${DASHBOARD_URL}/logout`, permanent: false },
      { source: '/dashboard', destination: `${DASHBOARD_URL}/dashboard`, permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}

export default nextConfig

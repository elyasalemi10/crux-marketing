'use client'

import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'
import { Shield, Lock, Server, Eye, Key, RefreshCw, FileCheck, Users } from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data transmitted between your browser and our servers is encrypted using TLS 1.3. Your sensitive data is also encrypted at rest using AES-256 encryption.',
  },
  {
    icon: Key,
    title: 'OAuth 2.0 Authentication',
    description: 'We never store your third-party passwords. All integrations use OAuth 2.0, meaning you grant us limited, revocable access without sharing credentials.',
  },
  {
    icon: Server,
    title: 'Secure Infrastructure',
    description: 'Our platform runs on enterprise-grade cloud infrastructure with SOC 2 compliance. Data is stored in secure, geographically distributed data centers.',
  },
  {
    icon: Eye,
    title: 'Privacy by Design',
    description: 'We follow the principle of minimal data collection. We only access the data necessary to provide our service, and you can disconnect integrations anytime.',
  },
  {
    icon: RefreshCw,
    title: 'Regular Security Audits',
    description: 'Our systems undergo regular security assessments and penetration testing. We continuously monitor for vulnerabilities and apply patches promptly.',
  },
  {
    icon: FileCheck,
    title: 'Action Confirmations',
    description: 'Sensitive actions like sending emails or modifying files require explicit confirmation. You stay in control of what our AI does on your behalf.',
  },
  {
    icon: Users,
    title: 'Access Controls',
    description: 'Our team follows strict access control policies. Only authorized personnel can access production systems, and all access is logged and audited.',
  },
  {
    icon: Shield,
    title: 'DDoS Protection',
    description: 'Our infrastructure includes enterprise-grade DDoS protection and rate limiting to ensure service availability and protect against attacks.',
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      
      <main className="container mx-auto max-w-6xl px-4 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Security at Crux Logic</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trust is our priority. We implement industry-leading security measures to protect your data and ensure your AI assistant operates safely.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Data Protection</h2>
          <div className="bg-card rounded-xl border p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Data Encryption</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• TLS 1.3 for data in transit</li>
                  <li>• AES-256 encryption at rest</li>
                  <li>• Encrypted database backups</li>
                  <li>• Secure key management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Access Security</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Multi-factor authentication</li>
                  <li>• Session management</li>
                  <li>• Rate limiting</li>
                  <li>• IP-based access controls</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Compliance</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• GDPR compliant</li>
                  <li>• SOC 2 infrastructure</li>
                  <li>• <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a></li>
                  <li>• Regular audits</li>
                  <li>• Data retention policies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Google API Services Compliance</h2>
          <div className="bg-card rounded-xl border p-8">
            <p className="text-muted-foreground mb-4">
              Our use and transfer of information received from Google APIs adheres to the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements. Specifically:
            </p>
            <ul className="text-muted-foreground space-y-2 mb-4">
              <li>• We only use Google user data to provide the features you explicitly request</li>
              <li>• We do not use Google user data to train, improve, or develop generalized AI/ML models</li>
              <li>• We do not sell, rent, or trade Google user data to any third party</li>
              <li>• We do not use Google user data for advertising, remarketing, or interest-based targeting</li>
              <li>• We request only the minimum API scopes required for each feature</li>
              <li>• All Google user data is transmitted using TLS 1.2 or higher and stored with AES-256 encryption</li>
              <li>• You can revoke access at any time from your Google Account settings or our dashboard</li>
            </ul>
            <p className="text-muted-foreground">
              For full details, see our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, including Section 3 (Google API Services User Data Policy Compliance) and Section 4 (Google Data Access Scopes).
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">AI Safety Measures</h2>
          <div className="bg-card rounded-xl border p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Confirmation Workflows</h3>
                <p className="text-muted-foreground">
                  Before executing sensitive actions like sending emails, creating files, or modifying your calendar, our AI presents you with a confirmation prompt showing exactly what will happen. You have full control to approve, modify, or reject any action.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Scoped Permissions</h3>
                <p className="text-muted-foreground">
                  When you connect third-party services, we request only the minimum permissions necessary for each integration. You can see exactly what access each connection has and revoke it at any time from your dashboard.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Audit Trail</h3>
                <p className="text-muted-foreground">
                  Every action taken by the AI on your behalf is logged and visible in your activity history. You can review past actions, see what was done, and track the AI&apos;s behavior over time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Content Filtering</h3>
                <p className="text-muted-foreground">
                  Our AI models include safety filters to prevent generation of harmful, inappropriate, or dangerous content. We continuously improve these safeguards based on the latest AI safety research.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Vulnerability Disclosure</h2>
          <div className="bg-card rounded-xl border p-8">
            <p className="text-muted-foreground mb-4">
              We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly:
            </p>
            <ul className="text-muted-foreground space-y-2 mb-4">
              <li>• Email us at <a href="mailto:security@cruxlogic.com" className="text-primary hover:underline">security@cruxlogic.com</a></li>
              <li>• Include details about the vulnerability and steps to reproduce</li>
              <li>• Allow us reasonable time to investigate and fix the issue</li>
              <li>• Do not publicly disclose until we&apos;ve addressed the issue</li>
            </ul>
            <p className="text-muted-foreground">
              We appreciate security researchers who help us keep our platform secure and will acknowledge contributions in our security advisories.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Security?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help address any security concerns you may have.
          </p>
          <a 
            href="mailto:security@cruxlogic.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Security Team
          </a>
        </section>

        <div className="mt-12 pt-8 border-t">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

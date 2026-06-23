'use client'

import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      
      <main className="container mx-auto max-w-4xl px-4 py-24">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Crux Logic Pty Ltd (ABN [Your ABN]) (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and handling your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI assistant platform and related services (&quot;Service&quot;).
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Our commitment:</strong> We do not sell your data. We do not use your data for advertising. We do not use your data to train, improve, or develop generalized artificial intelligence or machine learning models. We implement reasonable security measures to protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium mb-3">2.1 Account Information</h3>
            <p className="text-muted-foreground mb-4">
              When you create an account, we collect your name, email address, phone number (optional), and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-medium mb-3">2.2 Service Data</h3>
            <p className="text-muted-foreground mb-4">
              When you connect third-party services (such as Google Workspace, Microsoft, or other integrations), we access and process data from those services only as necessary to provide the specific features you request. This may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Email content and metadata</li>
              <li>Calendar events</li>
              <li>Files and documents</li>
              <li>Contact information</li>
              <li>Task and to-do items</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">2.3 Conversation Data</h3>
            <p className="text-muted-foreground mb-4">
              We store your conversations with our AI assistant to provide continuity and deliver the service. This includes messages, file attachments, and records of actions taken on your behalf.
            </p>

            <h3 className="text-xl font-medium mb-3">2.4 Technical and Usage Data</h3>
            <p className="text-muted-foreground mb-4">
              We automatically collect minimal technical information required to operate the service, including device information, IP addresses, browser type, operating system, and basic usage patterns (e.g., feature usage frequency, error logs).
            </p>

            <h3 className="text-xl font-medium mb-3">2.5 Payment Information</h3>
            <p className="text-muted-foreground mb-4">
              Payment processing is handled by Stripe. We receive limited payment information (e.g., last four digits of card, card type, billing address) but do not store full payment card numbers on our systems.
            </p>
          </section>

          <section className="mb-8 p-6 bg-muted/30 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">3. Google API Services User Data Policy Compliance</h2>
            <p className="text-muted-foreground mb-4">
              <strong>This section describes how we handle data obtained through Google APIs and our compliance with the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.</strong>
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li><strong>Limited Use Compliance:</strong> Our use and transfer to any other app of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.</li>
              <li><strong>Purpose-Limited Use:</strong> Google user data is accessed and used solely to provide the specific features you request (e.g., reading emails, managing calendar events, organizing files). We do not use this data for any purpose other than providing, improving, and ensuring the security of our Service to you.</li>
              <li><strong>No AI/ML Training:</strong> We do not use Google user data to train, improve, or develop generalized artificial intelligence or machine learning models. Data is processed only transiently by AI providers to generate responses to your specific requests.</li>
              <li><strong>No Sale of Data:</strong> We do not sell, rent, lease, or trade Google user data to any third party under any circumstances.</li>
              <li><strong>No Advertising:</strong> We do not use Google user data for advertising purposes, including targeted advertising, remarketing, or interest-based advertising.</li>
              <li><strong>Minimum Necessary Access:</strong> We request only the minimum Google API scopes required to deliver each specific feature. You can review and revoke access at any time from your Google Account settings or from our dashboard.</li>
              <li><strong>Secure Transmission:</strong> All Google user data is transmitted using TLS 1.2 or higher encryption.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Google Data Access (Scopes)</h2>
            <p className="text-muted-foreground mb-4">
              We follow the principle of least privilege and only request the specific Google API permissions (scopes) necessary for each feature. Below is a detailed mapping of the scopes we may request and their exact purposes:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-muted-foreground mb-4 border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Scope</th>
                    <th className="text-left p-3 font-semibold">Purpose</th>
                    <th className="text-left p-3 font-semibold">Feature</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/gmail.readonly</td>
                    <td className="p-3">Read email messages and metadata</td>
                    <td className="p-3">Email summaries, search, inbox monitoring</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/calendar.readonly</td>
                    <td className="p-3">Read-only access to calendar</td>
                    <td className="p-3">View upcoming events, availability checking</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/drive.readonly</td>
                    <td className="p-3">Read-only access to Drive files</td>
                    <td className="p-3">Search files, view documents, download attachments</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/contacts.readonly</td>
                    <td className="p-3">Read contact information</td>
                    <td className="p-3">Contact lookup, email addressing assistance</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/spreadsheets.readonly</td>
                    <td className="p-3">Read-only access to Google Sheets</td>
                    <td className="p-3">View and summarise spreadsheet data</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/documents.readonly</td>
                    <td className="p-3">Read-only access to Google Docs</td>
                    <td className="p-3">View and summarise document content</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/userinfo.email</td>
                    <td className="p-3">View your email address</td>
                    <td className="p-3">Account identification, login</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">https://www.googleapis.com/auth/userinfo.profile</td>
                    <td className="p-3">View your basic profile info</td>
                    <td className="p-3">Display your name in the dashboard</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-mono text-xs break-all">openid</td>
                    <td className="p-3">OpenID Connect authentication</td>
                    <td className="p-3">Secure sign-in via Google</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm">
              You may be prompted to grant some or all of these permissions depending on which features you choose to use. You can revoke any permission at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Provide, maintain, and improve our AI assistant services</li>
              <li>Process your requests and execute the automated tasks you request</li>
              <li>Send you service-related communications (e.g., security alerts, account notifications)</li>
              <li>Detect, prevent, and address technical issues, fraud, or security threats</li>
              <li>Comply with legal obligations</li>
              <li>Respond to your support requests</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>We do NOT use your information to:</strong>
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Train, improve, or develop generalized artificial intelligence or machine learning models</li>
              <li>Serve advertisements or create advertising profiles</li>
              <li>Sell, rent, or lease to third parties</li>
              <li>Build profiles for purposes unrelated to delivering our Service to you</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">We do not sell your personal information. We may share your information only with:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li><strong>AI Model Providers (as Processors):</strong> We use third-party AI models (such as OpenAI, Anthropic, or Google) to power our assistant. Conversation data is sent to these providers transiently to generate responses. These providers process data under our instructions and do not retain your data for their own training purposes per our data processing agreements.</li>
              <li><strong>Infrastructure Providers:</strong> Cloud hosting (AWS, Vercel), database providers (Supabase), and payment processors (Stripe) who process data on our behalf under strict confidentiality and data processing agreements.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights, safety, property, or the rights, safety, or property of others.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred. We will provide notice and the opportunity to opt out where required by law.</li>
            </ul>
          </section>

          <section className="mb-8 p-6 bg-muted/30 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">7. Overseas Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              Your personal information may be disclosed to, and processed by, recipients located outside Australia. We use service providers and infrastructure located in:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li><strong>United States:</strong> Cloud infrastructure (AWS, Vercel), AI model providers (OpenAI, Anthropic), payment processing (Stripe), database services (Supabase)</li>
              <li><strong>European Union:</strong> Some data processing and backup services</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Before disclosing your personal information overseas, we take reasonable steps to ensure that the overseas recipient does not breach the Australian Privacy Principles in relation to that information. This includes entering into data processing agreements that require the recipient to handle your information in accordance with standards substantially similar to the APPs.
            </p>
            <p className="text-muted-foreground mb-4">
              By using our Service, you consent to the disclosure of your personal information to these overseas recipients. You may withdraw this consent at any time by closing your account, but this may affect our ability to provide the Service to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement technical and organizational measures designed to protect your data:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li><strong>Encryption:</strong> All data is encrypted in transit (TLS 1.2/1.3) and at rest (AES-256)</li>
              <li><strong>OAuth 2.0:</strong> We use secure OAuth 2.0 for all third-party integrations. We never store your Google, Microsoft, or other service passwords.</li>
              <li><strong>Secure Token Storage:</strong> Connection tokens are encrypted and stored with access controls</li>
              <li><strong>Access Controls:</strong> Strict internal access controls and employee training</li>
              <li><strong>Monitoring:</strong> Security monitoring and logging for suspicious activity</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              While we implement reasonable security measures, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security, but we are committed to protecting your information using commercially reasonable means and will notify you of any data breach affecting your personal information as required by law.
            </p>
          </section>

          <section className="mb-8 p-6 bg-muted/30 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">9. Data Retention and Deletion</h2>
            
            <h3 className="text-xl font-medium mb-3">9.1 Retention Period</h3>
            <p className="text-muted-foreground mb-4">
              We retain your data only for as long as necessary to provide our services or as required by law:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li><strong>Account Data:</strong> Retained while your account is active plus 30 days after deletion request</li>
              <li><strong>Conversation History:</strong> Retained while your account is active to provide continuity</li>
              <li><strong>Connection Tokens:</strong> Retained while the integration is active; deleted immediately upon disconnection</li>
              <li><strong>Usage Logs:</strong> Retained for 90 days for debugging and billing purposes</li>
              <li><strong>Google API Data:</strong> Processed transiently to complete your requests; not stored permanently beyond conversation logs</li>
              <li><strong>Billing Records:</strong> Retained for 7 years as required by Australian tax law</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">9.2 Account Deletion Process</h3>
            <p className="text-muted-foreground mb-4">
              When you delete your account (via Settings or by contacting support):
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground mb-4">
              <li><strong>Immediate Invalidation:</strong> All OAuth tokens and connections are immediately revoked</li>
              <li><strong>Data Deletion:</strong> All personal data, conversations, files, and connection credentials are permanently deleted within 30 days</li>
              <li><strong>Third-Party Notification:</strong> We revoke access grants with connected services (Google, Microsoft, etc.)</li>
              <li><strong>Backup Purge:</strong> Backup systems are purged within 30 days</li>
              <li><strong>Confirmation:</strong> You will receive email confirmation when deletion is complete</li>
            </ol>
            <p className="text-muted-foreground">
              Some data may be retained if required by law (e.g., billing records for tax purposes), but this data will be minimal and used only for the required purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Your Rights</h2>
            <p className="text-muted-foreground mb-4">Under Australian Privacy Principles and applicable law, you have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate, incomplete, or out-of-date information</li>
              <li><strong>Deletion:</strong> Request deletion of your data (see Section 9.2)</li>
              <li><strong>Portability:</strong> Request your data in a commonly used, machine-readable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time by disconnecting integrations or deleting your account</li>
              <li><strong>Anonymity:</strong> In some circumstances, you may deal with us anonymously or using a pseudonym, though this may limit the services we can provide</li>
            </ul>
            <p className="text-muted-foreground">
              To exercise any of these rights, contact us at <a href="mailto:privacy@cruxlogic.ai" className="text-primary hover:underline">privacy@cruxlogic.ai</a> or use the settings in your dashboard. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Third-Party Integrations</h2>
            <p className="text-muted-foreground mb-4">
              Our service integrates with various third-party platforms. When you connect these services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>You grant us specific, limited permissions to access data from those services</li>
              <li>We only access data necessary to perform the features you request</li>
              <li>You can disconnect integrations and revoke access at any time from your dashboard</li>
              <li>Each integration has granular permission controls you can configure</li>
              <li>Third-party services have their own privacy policies that govern their use of your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-4">
              We use only essential cookies required to maintain your session, authenticate you, and remember your preferences. We do not use:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Advertising or marketing cookies</li>
              <li>Third-party tracking cookies</li>
              <li>Analytics that track individual users across sites</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              We may use basic, privacy-respecting analytics to understand aggregate usage patterns and improve the Service.
            </p>
          </section>

          <section className="mb-8 p-6 bg-muted/30 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">13. Privacy Complaints</h2>
            <p className="text-muted-foreground mb-4">
              If you have a complaint about how we handle your personal information:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground mb-4">
              <li><strong>Contact Us First:</strong> Please email <a href="mailto:privacy@cruxlogic.ai" className="text-primary hover:underline">privacy@cruxlogic.ai</a> with details of your complaint. We take all complaints seriously.</li>
              <li><strong>Acknowledgment:</strong> We will acknowledge your complaint within 5 business days.</li>
              <li><strong>Investigation:</strong> We will investigate your complaint and respond within 30 days with our findings and any actions we will take.</li>
              <li><strong>Escalation:</strong> If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC):
                <ul className="list-disc pl-6 mt-2">
                  <li>Website: <a href="https://www.oaic.gov.au" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a></li>
                  <li>Phone: 1300 363 992</li>
                  <li>Email: enquiries@oaic.gov.au</li>
                </ul>
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground mb-4">
              Our Service is not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information promptly. If you believe we have collected information from a child under 18, please contact us at <a href="mailto:privacy@cruxlogic.ai" className="text-primary hover:underline">privacy@cruxlogic.ai</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. For material changes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>We will notify you by email at least 30 days before the changes take effect</li>
              <li>We will post the new policy on this page and update the &quot;Last updated&quot; date</li>
              <li>For significant changes, we may also provide notice within the Service</li>
              <li>Continued use of the Service after the effective date constitutes acceptance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">16. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <p className="text-muted-foreground">
              <strong>Crux Logic Pty Ltd</strong><br />
              Privacy Officer<br />
              Email: <a href="mailto:privacy@cruxlogic.ai" className="text-primary hover:underline">privacy@cruxlogic.ai</a><br />
              Address: Level 19, 263 William St, Melbourne VIC 3000, Australia
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

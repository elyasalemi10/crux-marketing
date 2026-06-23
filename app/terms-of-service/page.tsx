'use client'

import Link from 'next/link'
import { LandingNavbar } from '@/components/landing-navbar'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      
      <main className="container mx-auto max-w-4xl px-4 py-24">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 2026</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using Crux Logic (&quot;Service&quot;), operated by Crux Logic Pty Ltd (ABN [Your ABN]) (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use the Service.
            </p>
            <p className="text-muted-foreground mb-4">
              These Terms constitute a legally binding agreement between you and Crux Logic. We recommend that you print or save a copy of these Terms for your records.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Crux Logic is an AI-powered assistant platform that helps you automate tasks, manage communications, and integrate with various third-party services including Google Workspace. The Service uses artificial intelligence to process your requests and execute actions on your behalf within the scope of permissions you grant.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Eligibility and Account Registration</h2>
            <p className="text-muted-foreground mb-4">To use the Service, you must:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Be at least 18 years of age, or the age of legal majority in your jurisdiction if higher</li>
              <li>Have the legal capacity to enter into a binding contract</li>
              <li>Create an account with accurate and complete information</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
              <li>Not create an account on behalf of another person without their consent</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              You are responsible for all activities that occur under your account, whether or not you have authorized such activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Send spam, unsolicited messages, or harass others</li>
              <li>Transmit malware, viruses, or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
              <li>Impersonate others or provide false information</li>
              <li>Use the Service for illegal, fraudulent, or harmful activities</li>
              <li>Circumvent rate limits, quotas, or abuse the Service</li>
              <li>Reverse engineer, decompile, or attempt to extract source code</li>
              <li>Use automated means to access the Service without our express written permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Integrations and Google API Services</h2>
            <p className="text-muted-foreground mb-4">
              The Service allows you to connect third-party accounts (e.g., Google Workspace, Microsoft, Slack). By connecting these services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>You authorize us to access and act on your behalf within those services, limited to the specific permissions you grant</li>
              <li>You remain responsible for complying with each service&apos;s terms of service</li>
              <li>You understand that third-party services may have their own limitations and availability</li>
              <li>You can disconnect integrations and revoke access at any time from your dashboard or the third-party service&apos;s settings</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Google API Services:</strong> Our use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements. See our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> for complete details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Handling and Security</h2>
            <p className="text-muted-foreground mb-4">
              We are committed to protecting your data through appropriate technical and organizational measures. By using the Service, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Your data is not sold to third parties</li>
              <li>Your data is not used for advertising purposes</li>
              <li>Your data is not used to train, improve, or develop generalized AI or machine learning models</li>
              <li>Connection credentials are stored using industry-standard encryption (AES-256)</li>
              <li>You can request deletion of all your data at any time</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              While we implement reasonable security measures, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we strive to use commercially acceptable means to protect your data. For complete details on how we handle your data, please review our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. AI-Generated Actions</h2>
            <p className="text-muted-foreground mb-4">
              Our AI assistant can perform actions on your behalf, such as sending emails, creating documents, or managing tasks. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>AI may occasionally make errors or misinterpret instructions</li>
              <li>You should review important actions before confirming them</li>
              <li>You are ultimately responsible for actions taken through your account</li>
              <li>We provide confirmation prompts for sensitive actions where technically feasible</li>
              <li>AI-generated content should be reviewed for accuracy before relying on it</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Subscription and Payment</h2>
            <p className="text-muted-foreground mb-4">
              Some features require a paid subscription. If you choose a paid plan:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>You agree to pay all applicable fees as described on our pricing page</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date</li>
              <li>Prices may change with at least 30 days&apos; notice before your next billing cycle</li>
              <li>Refunds are provided in accordance with Australian Consumer Law and our refund policy</li>
              <li>We use third-party payment processors (Stripe) and do not store your full payment card details</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Usage Limits</h2>
            <p className="text-muted-foreground mb-4">
              Each subscription tier has associated usage limits (messages, API calls, storage, etc.). Exceeding these limits may result in:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Temporary service restrictions until your next billing period</li>
              <li>An invitation to upgrade your plan or purchase additional credits</li>
              <li>Additional charges for overage, if you have opted into overage billing</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              We will endeavor to provide reasonable notice before applying restrictions where possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The Service, including its original content, features, and functionality, is owned by Crux Logic and protected by intellectual property laws. You retain ownership of your data and content that you upload or create using the Service.
            </p>
            <p className="text-muted-foreground mb-4">
              You grant us a limited, non-exclusive license to use your content solely to provide and improve the Service to you. This license terminates when you delete your content or your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>The Service will be uninterrupted, error-free, or completely secure</li>
              <li>AI-generated responses will be accurate, complete, or appropriate for your purposes</li>
              <li>The Service will meet your specific requirements</li>
              <li>Defects in the Service will be corrected</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Australian Consumer Law:</strong> Certain statutory guarantees may apply under the Australian Consumer Law that cannot be excluded. Nothing in these Terms is intended to limit, exclude, or modify any consumer rights under the Competition and Consumer Act 2010 (Cth) or any other applicable consumer protection laws. To the extent permitted by law, our liability under such guarantees is limited to re-supplying the services or paying the cost of having the services supplied again.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CRUX LOGIC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES ARISING FROM YOUR USE OF THE SERVICE.
            </p>
            <p className="text-muted-foreground mb-4">
              WHERE PERMITTED BY LAW, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE GREATER OF: (A) THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) AUD $100.
            </p>
            <p className="text-muted-foreground mb-4">
              These limitations apply regardless of the theory of liability (contract, tort, negligence, or otherwise), even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
            <p className="text-muted-foreground mb-4">
              To the extent permitted by law, you agree to indemnify, defend, and hold harmless Crux Logic and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights or applicable laws</li>
              <li>Your use of the Service in a manner not authorized by these Terms</li>
              <li>Any content you submit or transmit through the Service</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              This indemnification obligation does not apply to the extent that the claim arises from our negligence, willful misconduct, or breach of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Service Modifications and Availability</h2>
            <p className="text-muted-foreground mb-4">
              We may modify, suspend, or discontinue any part of the Service at any time. For material changes that adversely affect your use:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>We will provide at least 30 days&apos; notice where reasonably practicable</li>
              <li>You may cancel your subscription and receive a pro-rata refund for the unused period</li>
              <li>We will make reasonable efforts to give you an opportunity to export your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Suspension and Termination</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Termination by You:</strong> You may cancel your account at any time through your dashboard settings or by contacting support. Upon cancellation, you will retain access until the end of your current billing period.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Suspension or Termination by Us:</strong> We may suspend or terminate your account if:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>You materially breach these Terms and fail to cure the breach within 14 days of notice (where the breach is capable of being cured)</li>
              <li>We are required to do so by law or court order</li>
              <li>Your use poses a security risk to the Service or other users</li>
              <li>Your account has been inactive for more than 12 months (for free accounts)</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Where possible, we will provide notice and an opportunity to remedy the issue before suspension or termination, except where immediate action is necessary to protect the Service or comply with legal requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">16. Force Majeure</h2>
            <p className="text-muted-foreground mb-4">
              Neither party shall be liable for any failure or delay in performing their obligations under these Terms if such failure or delay results from circumstances beyond their reasonable control, including but not limited to: natural disasters, acts of war or terrorism, pandemics, government actions, power outages, internet or telecommunications failures, or failures of third-party service providers. The affected party must notify the other party promptly and make reasonable efforts to mitigate the impact.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">17. Governing Law and Dispute Resolution</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Governing Law:</strong> These Terms are governed by the laws of Victoria, Australia. You agree to submit to the non-exclusive jurisdiction of the courts of Victoria, Australia for any disputes arising from these Terms or your use of the Service.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Informal Resolution:</strong> Before initiating formal proceedings, you agree to contact us at <a href="mailto:legal@cruxlogic.ai" className="text-primary hover:underline">legal@cruxlogic.ai</a> and attempt to resolve the dispute informally for at least 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">18. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We may update these Terms from time to time. For material changes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>We will notify you by email or through the Service at least 30 days before the changes take effect</li>
              <li>We will update the &quot;Last updated&quot; date at the top of this page</li>
              <li>Continued use of the Service after the effective date constitutes acceptance of the updated Terms</li>
              <li>If you do not agree to the changes, you may terminate your account before they take effect</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">19. Severability</h2>
            <p className="text-muted-foreground mb-4">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, shall be deemed severed from these Terms. The remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">20. Entire Agreement</h2>
            <p className="text-muted-foreground mb-4">
              These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Crux Logic regarding the Service and supersede all prior agreements, understandings, and communications, whether oral or written.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">21. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Crux Logic Pty Ltd<br />
              Email: <a href="mailto:legal@cruxlogic.ai" className="text-primary hover:underline">legal@cruxlogic.ai</a><br />
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

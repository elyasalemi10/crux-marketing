'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-16">
      <div className="px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Image
              src="/logos/CruxLogic-Black-Text-Full.webp"
              alt="CruxLogic"
              width={200}
              height={50}
              className="h-12 w-auto mb-6"
              unoptimized
            />
            <p className="text-lg text-gray-600 leading-relaxed mb-5 max-w-sm">
              Your AI assistant that connects all your productivity tools.
            </p>
            <address className="text-base text-gray-500 not-italic">
              Level 19, 263 William St<br />
              Melbourne VIC 3000
            </address>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 uppercase tracking-wider mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#demo" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Demo</Link></li>
              <li><Link href="/pricing" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Pricing</Link></li>
              <li><Link href="/login" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Login</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 uppercase tracking-wider mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Blog</Link></li>
              <li><Link href="/compare" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Compare</Link></li>
              <li><Link href="/tools" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Free Tools</Link></li>
              <li><Link href="/support" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Support</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-lg text-gray-600 hover:text-[#2bb1ea]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-lg text-gray-500">
            &copy; {new Date().getFullYear()} CruxLogic Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://x.com/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://discord.gg/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
            <a href="https://linkedin.com/company/cruxlogic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2bb1ea]">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

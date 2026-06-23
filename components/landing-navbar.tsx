'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { IconMenu2, IconX } from '@tabler/icons-react'

const useCases = [
  {
    title: 'Email Management',
    description: 'Read, draft, and send emails across Gmail and Outlook',
    href: '#demo',
  },
  {
    title: 'Calendar Scheduling',
    description: 'View events and schedule meetings across all your calendars',
    href: '#demo',
  },
  {
    title: 'Task Automation',
    description: 'Create and manage tasks in Google Tasks and Microsoft To Do',
    href: '#demo',
  },
  {
    title: 'File Organization',
    description: 'Search and organize files in Google Drive and OneDrive',
    href: '#demo',
  },
]

const resources = [
  {
    title: 'Blog',
    description: 'Tips, updates, and productivity insights',
    href: '/blog',
  },
  {
    title: 'Compare',
    description: 'See how CruxLogic compares to alternatives',
    href: '/compare',
  },
  {
    title: 'Free Tools',
    description: 'Free productivity tools for business owners',
    href: '/tools',
  },
  {
    title: 'Support',
    description: 'Get help from our team',
    href: '/support',
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; description?: string }
>(({ className, title, description, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none rounded-lg p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-50',
            className
          )}
          {...props}
        >
          <div className="text-base font-medium text-gray-900">{title}</div>
          {description && (
            <p className="mt-1 text-sm leading-snug text-gray-500">
              {description}
            </p>
          )}
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <>
      {/* Backdrop overlay when dropdown is open - fades smoothly */}
      <div 
        className={`fixed inset-0 bg-black/10 z-40 pointer-events-none transition-opacity duration-300 ${
          dropdownOpen ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      
      <header className="fixed top-3 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 flex justify-center overflow-visible">
        <nav className="w-full max-w-[1400px] flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white backdrop-blur-lg border border-gray-200 shadow-lg shadow-black/5">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logos/CruxLogic-Black-Text-Full.webp"
              alt="CruxLogic"
              width={160}
              height={38}
              className="h-6 sm:h-7 w-auto"
              unoptimized
              priority
            />
          </Link>
          
          <NavigationMenu className="hidden md:flex" delayDuration={0} skipDelayDuration={0} onValueChange={(value) => setDropdownOpen(!!value)}>
            <NavigationMenuList className="gap-2">
              {/* Use Cases */}
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100"
                  onClick={(e) => e.preventDefault()}
                >
                  Use Cases
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-1 p-4 md:grid-cols-2">
                    {useCases.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources */}
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100"
                  onClick={(e) => e.preventDefault()}
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-1 p-4 md:grid-cols-2">
                    {resources.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pricing */}
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className="inline-flex h-10 w-max items-center justify-center px-4 py-2 text-base font-medium text-gray-600 cursor-pointer">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <IconX className="w-6 h-6" />
              ) : (
                <IconMenu2 className="w-6 h-6" />
              )}
            </button>
            
            <Link href="/sign-up">
              <Button 
                size="sm"
                className="rounded-full bg-[#2bb1ea]/20 text-[#2bb1ea] border-2 border-[#2bb1ea] hover:bg-[#2bb1ea]/30 h-8 sm:h-10 px-3 sm:px-5 font-medium text-xs sm:text-sm transition-colors"
              >
                Sign up / Login
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20">
          <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
            {/* Use Cases Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Use Cases</h3>
              <ul className="space-y-2">
                {useCases.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href}
                      className="block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="text-base font-medium text-gray-900">{item.title}</div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Resources</h3>
              <ul className="space-y-2">
                {resources.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href}
                      className="block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="text-base font-medium text-gray-900">{item.title}</div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Link */}
            <div>
              <Link 
                href="/pricing"
                className="block py-2 text-base font-medium text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-gray-200">
              <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="w-full rounded-full bg-[#2bb1ea]/20 text-[#2bb1ea] border-2 border-[#2bb1ea] hover:bg-[#2bb1ea]/30 h-12 font-medium text-base transition-colors"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="outline"
                  className="w-full rounded-full mt-3 h-12 font-medium text-base"
                >
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

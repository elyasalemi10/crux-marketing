import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Gradient background */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ 
          height: '500px',
          background: 'linear-gradient(to bottom, #2bb1ea 0%, #2bb1ea 50px, #5ec8f0 150px, #a8e0f7 280px, #ffffff 400px)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <Link href="/" className="mb-8">
          <Image
            src="/logos/CruxLogic-Black-Text-Full.webp"
            alt="CruxLogic"
            width={180}
            height={45}
            className="h-10 w-auto"
            unoptimized
            priority
          />
        </Link>

        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="lg">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-[#2bb1ea] hover:bg-[#2bb1ea]/90">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <span className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CruxLogic Inc. All rights reserved.
        </span>
      </footer>
    </div>
  )
}

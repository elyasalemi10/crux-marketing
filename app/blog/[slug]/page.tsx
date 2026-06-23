import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import { LandingNavbar } from '@/components/landing-navbar'
import { IconCalendar, IconClock, IconArrowLeft } from '@tabler/icons-react'
import { FeedbackButton } from '@/components/feedback-button'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string
  featured_image: string | null
  author: string
  published_at: string
  tags: string[]
  meta_title: string | null
  meta_description: string | null
  read_time: number | null
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) return null
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return { title: 'Post Not Found | CruxLogic Blog' }
  }

  return {
    title: post.meta_title || `${post.title} | CruxLogic Blog`,
    description: post.meta_description || post.excerpt || post.title,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || post.title,
      type: 'article',
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 pb-16">
        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#2bb1ea] mb-8 transition-colors -ml-4 sm:-ml-8"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          {/* Meta info - Date & Read Time */}
          <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mb-6">
            <div className="flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4" />
              <span>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            {post.read_time && (
              <>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <IconClock className="h-4 w-4" />
                  <span>{post.read_time} min read</span>
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
              {post.excerpt}
            </p>
          )}

          {/* Featured Image */}
          {post.featured_image && (
            <div className="aspect-[2/1] relative rounded-2xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-[#2bb1ea]/10 text-[#2bb1ea] text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#2bb1ea] prose-a:underline hover:prose-a:text-[#2bb1ea]/80 prose-img:rounded-xl prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-l-[#2bb1ea] prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:font-normal [&_a]:text-[#2bb1ea] [&_a]:underline [&_a[href^='http']]:after:content-['_↗']"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(
                /<a\s+href="([^"]+)"([^>]*)>/gi, 
                (match, url, attrs) => {
                  if (url.startsWith('/') || url.includes(process.env.NEXT_PUBLIC_APP_URL || 'cruxlogic.ai')) {
                    return match
                  }
                  if (!attrs.includes('target=')) {
                    return `<a href="${url}" target="_blank" rel="noopener noreferrer"${attrs}>`
                  }
                  return match
                }
              )
            }}
          />
        </article>

        {/* CTA Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-br from-[#2bb1ea]/5 to-[#2bb1ea]/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to try CruxLogic?</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Connect your email, calendar, and tasks to your AI assistant today. Get started in minutes.
            </p>
            <Link 
              href="/waitlist"
              className="inline-flex items-center px-6 py-3 bg-[#2bb1ea] text-white rounded-full hover:bg-[#2bb1ea]/90 transition-colors font-medium"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Link href="/login" className="text-sm text-gray-500 hover:text-[#2bb1ea] mr-6">
            Login
          </Link>
          <span className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CruxLogic Inc. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  )
}

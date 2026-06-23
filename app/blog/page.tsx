import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createServiceClient } from '@/lib/supabase/server'
import { LandingNavbar } from '@/components/landing-navbar'
import { IconCalendar, IconClock, IconArrowRight } from '@tabler/icons-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog | CruxLogic - AI Assistant Insights',
  description: 'Learn about AI assistants, productivity automation, and how to get the most out of CruxLogic.',
  openGraph: {
    title: 'CruxLogic Blog',
    description: 'Insights on AI assistants and productivity automation',
    type: 'website',
  },
}

type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  featured_image: string | null
  author: string
  published_at: string
  tags: string[]
  read_time: number | null
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, featured_image, author, published_at, tags, read_time')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CruxLogic Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights on AI assistants, productivity automation, and getting the most out of your connected tools.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link 
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#2bb1ea]/30 transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                  {post.featured_image ? (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#2bb1ea]/10 to-[#2bb1ea]/5 flex items-center justify-center">
                      <Image
                        src="/logos/cruxlogic-favicon.webp"
                        alt="CruxLogic"
                        width={48}
                        height={48}
                        className="opacity-30"
                        unoptimized
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Date & Read Time */}
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                    <div className="flex items-center gap-1.5">
                      <IconCalendar className="h-4 w-4" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    {post.read_time && (
                      <div className="flex items-center gap-1.5">
                        <IconClock className="h-4 w-4" />
                        <span>{post.read_time} min read</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#2bb1ea] transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                  )}

                  {/* Read Article Link */}
                  <div className="flex items-center gap-1 text-sm font-medium text-[#2bb1ea] group-hover:gap-2 transition-all">
                    <span>Read Article</span>
                    <IconArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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
    </div>
  )
}

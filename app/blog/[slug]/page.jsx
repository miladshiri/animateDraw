import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Script from 'next/script'

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const url = `https://flowyboard.com/blog/${params.slug}`
  
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      url: url,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

async function getBlogPost(slug) {
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const match = fileContents.match(/^---\n([\s\S]*?)\n---/)
    const frontmatter = match ? match[1] : ''
    const content = match ? fileContents.slice(match[0].length) : fileContents
    
    const metadata = frontmatter.split('\n').reduce((acc, line) => {
      const [key, ...value] = line.split(':')
      acc[key.trim()] = value.join(':').trim()
      return acc
    }, {})
    
    return {
      slug,
      content,
      ...metadata,
    }
  } catch {
    return null
  }
}

export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'flowyBoard',
      logo: {
        '@type': 'ImageObject',
        url: 'https://flowyboard.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://flowyboard.com/blog/${params.slug}`,
    },
  }
  
  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-gray-300 hover:text-blue-400 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
          <header>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-300 text-sm">
              <time dateTime={post.date} className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.date).toLocaleDateString()}
              </time>
              {post.author && (
                <>
                  <span className="mx-3">•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {post.author}
                  </span>
                </>
              )}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none prose-headings:text-gray-100 prose-p:text-gray-200 prose-strong:text-gray-100 prose-code:text-gray-200 prose-ul:text-gray-200 prose-li:text-gray-200 prose-a:text-blue-400 prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700/50 mt-8">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
    </>
  )
} 
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.title} | Your Site Name`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
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
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          {post.author && <span className="mx-2">•</span>}
          {post.author && <span>{post.author}</span>}
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
} 
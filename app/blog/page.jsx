import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export const metadata = {
  title: 'Blog | Your Site Name',
  description: 'Read our latest articles and insights',
  openGraph: {
    title: 'Blog | Your Site Name',
    description: 'Read our latest articles and insights',
    type: 'website',
  },
}

async function getBlogPosts() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(blogDirectory)
  
  const posts = files.map(filename => {
    const filePath = path.join(blogDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    // Extract frontmatter
    const match = fileContents.match(/^---\n([\s\S]*?)\n---/)
    const frontmatter = match ? match[1] : ''
    const content = match ? fileContents.slice(match[0].length) : fileContents
    
    const metadata = frontmatter.split('\n').reduce((acc, line) => {
      const [key, ...value] = line.split(':')
      acc[key.trim()] = value.join(':').trim()
      return acc
    }, {})
    
    return {
      slug: filename.replace('.mdx', ''),
      ...metadata,
    }
  })
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          flowyBoard Blog
        </h1>
        <p className="text-gray-400 text-lg">Discover the latest insights and updates</p>
      </div>
      
      <div className="grid gap-8">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-gray-800/70 hover:shadow-xl hover:shadow-blue-500/10 border border-gray-700/50"
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center text-gray-400 mb-4 text-sm">
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
              <p className="text-gray-400 leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 text-blue-400 group-hover:text-blue-300 transition-colors flex items-center">
                Read more
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 
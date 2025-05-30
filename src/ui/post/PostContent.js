import customSchema from '@/services/rehype-sanitize/customSchema'
import { usePathname } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

export function PostContent({ content }) {
  const pathname = usePathname()
  const isOnMainPage = pathname.endsWith('/posts')

  return (
    <div
      className={`post-content render-html mb-2 overflow-hidden font-sans whitespace-pre-wrap below-md:line-clamp-5 below-md:overflow-hidden below-md:overflow-ellipsis text-app-lightblue-500 ${
        isOnMainPage ? 'max-h-60' : ''
      }`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

import customSchema from '@/app/lib/rehype-sanitize/customSchema'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

export function PostContent({ content }) {
  return (
    <div className="post-content markdown mb-2 font-sans whitespace-pre-wrap below-md:line-clamp-5 below-md:overflow-hidden below-md:overflow-ellipsis">
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
      />
    </div>
  )
}

import { usePostContext } from '@/lib/context/PostContextProvider'
import { PostContent } from './PostContent'
import { PostImage } from './PostImage'

export function PostBody({ content }) {
  const { hasImage } = usePostContext()
  return <>{hasImage ? <PostImage /> : <PostContent content={content} />}</>
}

import { PostContent } from './PostContent'
import { PostImage } from './PostImage'

export function PostBody({ hasImage, postId, imageExtension, content }) {
  return (
    <>
      {hasImage ? (
        <PostImage postId={postId} imageExtension={imageExtension} />
      ) : (
        <PostContent content={content} />
      )}
    </>
  )
}

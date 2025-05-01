import { useMouseHover } from '@/lib/hooks/useMouseHover'
import { Comment } from '@/app/ui/comment/Comment'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
import { Suspense, lazy } from 'react'

export function CommentWithToast({
  comment,
  comments,
  setComments,
  commentId,
  depth,
  postId,
  renderChildren,
}) {
  const avatarMouseHover = useMouseHover()
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = avatarMouseHover
  const LazyUserInfobox = lazy(() => import('@/app/ui/UserInfobox.js'))

  return (
    <>
      <Comment
        comment={comment}
        comments={comments}
        setComments={setComments}
        commentId={commentId}
        depth={depth}
        postId={postId}
        renderChildren={renderChildren}
        avatarMouseHover={avatarMouseHover}
      />

      {/* user infobox on hover */}
      <Suspense fallback={<UserInfoboxLoader />}>
        {isUserHovered && (
          <LazyUserInfobox
            author={author}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}
      </Suspense>
    </>
  )
}

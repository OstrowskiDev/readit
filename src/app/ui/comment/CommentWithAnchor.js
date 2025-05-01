import { Comment } from '@/app/ui/comment/Comment'
import { useMouseHover } from '@lib/hooks/useMouseHover'
import { Suspense, lazy } from 'react'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'

export function CommentWithAnchor({
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
      <a
        href={`/posts/post/${comment.rootPostId}`}
        key={comment._id}
        _id={comment._id}
        className="comment-container flex flex-col justify-between
  pb-4 px-4 my-2 rounded-md shadow-center-sm 
  border-white border-2 hover:border-blue-300
  hover:shadow-center-lg hover:cursor-pointer hover:outline-red-50"
      >
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
      </a>

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

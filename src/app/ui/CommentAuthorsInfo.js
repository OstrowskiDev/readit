import { Suspense, lazy } from 'react'
import Avatar from '../lib/avatars/Avatar'
import useMouseHover from '../lib/hooks/useMouseHover'
import TimeAgo from './TimeAgo'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function CommentAuthorsInfo({
  comment,
  anchorComment,
  anchorHandleMouseEnter,
  anchorHandleMouseLeave,
}) {
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()
  const author = comment.authorData

  return (
    <div className="comment-author-info-container relative right-6 flex items-center">
      {/* authors avatar */}
      <div
        className="comment-avatar-container min-w-12 min-h-12 hover:cursor-pointer"
        onMouseEnter={anchorComment ? anchorHandleMouseEnter : handleMouseEnter}
        onMouseLeave={anchorComment ? anchorHandleMouseLeave : handleMouseLeave}
      >
        <Avatar
          seed={author?.avatar.seed}
          color={author?.avatar.color}
          size={48}
          border={2}
        />
      </div>

      {/* user infobox on hover */}
      <Suspense fallback={<UserInfoboxLoader />}>
        {!anchorComment && isUserHovered && (
          <LazyUserInfobox
            author={author}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}
      </Suspense>

      {/* authors name */}
      <p
        className="comment-author ml-2 text-blue-900 text-15 hover:cursor-pointer"
        onMouseEnter={anchorComment ? anchorHandleMouseEnter : handleMouseEnter}
        onMouseLeave={anchorComment ? anchorHandleMouseLeave : handleMouseLeave}
      >
        {author.name}
      </p>

      {/* comment time, edit time */}
      <TimeAgo
        createdAt={comment.createdAt}
        updatedAt={comment.updatedAt}
        type="created"
      />
    </div>
  )
}

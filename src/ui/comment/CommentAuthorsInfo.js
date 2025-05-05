import { useMouseHover } from '@/lib/hooks/useMouseHover'
import { AuthorsInfo } from '../common/AuthorsInfo'
import { UserInfoboxWrapper } from '../infobox/UserInfoboxWrapper'

export function CommentAuthorsInfo({ comment }) {
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()

  return (
    <div className="comment-author-info-container relative right-6 flex items-center">
      <AuthorsInfo
        size={48}
        border={2}
        document={comment}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <UserInfoboxWrapper
        authorData={comment.authorData}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        isUserHovered={isUserHovered}
      />
    </div>
  )
}

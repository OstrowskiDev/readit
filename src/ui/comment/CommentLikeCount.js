import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { RollingNumber } from '../common/RollingNumber'

export function CommentLikeCount() {
  const { comment } = useCommentContext()
  const numOfLikes = comment.likes ? comment.likes.length : 0
  const numOfDislikes = comment.dislikes ? comment.dislikes.length : 0
  const score = numOfLikes - numOfDislikes

  return (
    <p className="comment-like-count flex justify-center w-5 m-0 font-bold font-orbitron-bold">
      <RollingNumber value={score} duration={800} />
    </p>
  )
}

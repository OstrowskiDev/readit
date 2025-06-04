import { RollingNumber } from '../common/RollingNumber'

export function PostLikeCount({ postLikes, postDislikes }) {
  const noLikes = postLikes?.length || 0
  const noDislikes = postDislikes?.length || 0
  const score = noLikes - noDislikes

  return (
    <p className="post-like-count flex justify-center w-5 m-0 font-bold font-orbitron-bold">
      <RollingNumber value={score} duration={800} />
    </p>
  )
}

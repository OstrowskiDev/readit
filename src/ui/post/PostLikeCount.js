'use client'

export function PostLikeCount({ postLikes, postDislikes }) {
  const noLikes = postLikes ? postLikes?.length : 0
  const noDislikes = postDislikes ? postDislikes?.length : 0
  const score = noLikes - noDislikes

  return (
    <>
      {score >= 0 ? (
        <p className="post-like-count font-orbitron-bold m-0 font-bold">
          {score}
        </p>
      ) : (
        <p className="post-like-count font-orbitron-bold m-0 font-bold text-red-900">
          {score}
        </p>
      )}
    </>
  )
}

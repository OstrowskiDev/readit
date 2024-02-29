'use client'

export function PostLikeCount({ postLikes, postDislikes }) {
  const noLikes = postLikes ? postLikes?.length : 0
  const noDislikes = postDislikes ? postDislikes?.length : 0
  const score = noLikes - noDislikes

  return (
    <>
      {score >= 0 ? (
        <p className="m-0 font-bold text-gray-900">{score}</p>
      ) : (
        <p className="m-0 font-bold text-red-900">{score}</p>
      )}
    </>
  )
}

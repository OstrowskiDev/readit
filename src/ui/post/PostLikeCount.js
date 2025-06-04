'use client'

import dynamic from 'next/dynamic'

const RollingNumber = dynamic(() => import('../common/RollingNumber'), {
  ssr: false,
})

export function PostLikeCount({ postLikes, postDislikes }) {
  const noLikes = postLikes?.length || 0
  const noDislikes = postDislikes?.length || 0
  const score = noLikes - noDislikes

  return (
    <p className="post-like-count m-0 font-bold">
      <RollingNumber
        value={score}
        duration={800}
        className="font-orbitron-bold"
      />
    </p>
  )
}

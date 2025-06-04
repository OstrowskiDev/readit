'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const RollingNumber = dynamic(() => import('../common/RollingNumber'), {
  ssr: false,
})

export function PostLikeCount({ postLikes, postDislikes }) {
  const [isMounted, setIsMounted] = useState(false)
  const noLikes = postLikes?.length || 0
  const noDislikes = postDislikes?.length || 0
  const score = noLikes - noDislikes

  return (
    <p className="post-like-count flex justify-center w-5 m-0 font-bold">
      {!isMounted && <span>{score}</span>}
      <RollingNumber
        value={score}
        duration={800}
        isMounted={isMounted}
        setIsMounted={setIsMounted}
        className="font-orbitron-bold"
      />
    </p>
  )
}

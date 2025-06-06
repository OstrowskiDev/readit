'use client'

import { PostCommentShimmer } from '@/ui/loaders/PostCommentShimmer'
import { PostShimmer } from '@/ui/loaders/PostShimmer'

export default function shimmpost() {
  return (
    <>
      <PostShimmer />
      <PostCommentShimmer />
    </>
  )
}

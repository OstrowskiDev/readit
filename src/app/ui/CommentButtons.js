'use client'

import { LikeBtn } from '@/app/ui/buttons/LikeBtn'
import { DislikeBtn } from '@/app/ui/buttons/DislikeBtn'
import { ReplyBtn } from '@/app/ui/buttons/ReplyBtn'
import { ShareCommentBtn } from '@/app/ui/buttons/ShareCommentBtn'
import { LikeCount } from '@/app/ui/LikeCount'
import { CommentReplyForm } from '@/app/ui/CommentReplyForm'
import { useState } from 'react'

export function CommentButtons({ parentId, postId }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div className="comment-btns-container flex items-center ml-4">
        <LikeBtn className="comment-btn-like" />
        <LikeCount className="comment-likes-num" />
        <DislikeBtn className="comment-btn-dislike" />
        <ReplyBtn className="comment-btn-reply" isVisible={isVisible} setIsVisible={setIsVisible} />
        <ShareCommentBtn className="comment-btn-share" />
      </div>
      {isVisible && (
        <CommentReplyForm
          className="comment-reply-form"
          parentId={parentId}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          postId={postId}
        />
      )}
    </>
  )
}

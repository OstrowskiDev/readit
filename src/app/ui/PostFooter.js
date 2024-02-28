'use client'

import { CommentPostBtn } from '@/app/ui/buttons/CommentPostBtn'
import { SharePostBtn } from '@/app/ui/buttons/SharePostBtn'
import { CommentsCount } from '@/app/ui/CommentsCount'
import { PostOptionsBtn } from '@/app/ui/buttons/PostOptionsBtn'
import { PostReplyForm } from './PostReplyForm'
import { useState } from 'react'

export function PostFooter({ postId, commentNo }) {
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false)

  return (
    <div className="post-bottom-container">
      <div className="post-bottom-btns-container flex justify-between items-center p-2">
        <div className="post-bottom-btns-left flex items-center gap-3">
          <CommentsCount commentNo={commentNo} />
          <SharePostBtn />
          <PostOptionsBtn />
        </div>
        <div className="post-bottom-btns-right comment-btn mt-2 flex justify-end">
          <CommentPostBtn
            isCommentFormVisible={isCommentFormVisible}
            setIsCommentFormVisible={setIsCommentFormVisible}
          />
        </div>
      </div>
      <div className="post-bottom-reply-form">
        <PostReplyForm
          postId={postId}
          isCommentFormVisible={isCommentFormVisible}
          setIsCommentFormVisible={setIsCommentFormVisible}
        />
      </div>
    </div>
  )
}

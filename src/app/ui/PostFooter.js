'use client'

import { CommentPostBtn } from '@/app/ui/buttons/CommentPostBtn'
import { SharePostBtn } from '@/app/ui/buttons/SharePostBtn'
import { CommentsCount } from '@/app/ui/CommentsCount'
import { PostReplyForm } from './PostReplyForm'
import { useState } from 'react'
import { LikePostBtn } from './buttons/LikePostBtn'
import { DislikePostBtn } from './buttons/DislikePostBtn'
import { PostLikeCount } from './PostLikeCount'

export function PostFooter({ postId, commentNo, postLikes, postDislikes }) {
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false)

  return (
    <div className="post-bottom-container">
      <div className="post-bottom-btns-container flex justify-between items-center p-2">
        <div className="post-bottom-btns-left flex items-center gap-3">
          <CommentsCount commentNo={commentNo} />
          <div className="flex items-center h-10 bg-gray-200 rounded-md">
            <LikePostBtn postId={postId} postLikes={postLikes} />
            <PostLikeCount postLikes={postLikes} postDislikes={postDislikes} />
            <DislikePostBtn postId={postId} postDislikes={postDislikes} />
          </div>
          <SharePostBtn />
        </div>
        <div className="post-bottom-btns-right comment-btn flex justify-end min-w-36">
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

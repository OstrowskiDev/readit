'use client'

import { CommentPostBtn } from '@/app/ui/buttons/CommentPostBtn'
import { SharePostBtn } from '@/app/ui/buttons/SharePostBtn'
import { CommentsCount } from '@/app/ui/CommentsCount'
import { PostReplyForm } from './PostReplyForm'
import { useState } from 'react'
import { PostLikeCount } from './PostLikeCount'
import { PostDislikeBtn } from './buttons/PostDislikeBtn'
import { PostLikeBtn } from './buttons/PostLikeBtn'

export function PostFooter({
  commentNo,
  postLikes,
  postDislikes,
  enableCommentBtn,
}) {
  const [isCommFormVisible, setIsCommFormVisible] = useState(false)

  return (
    <div className="post-bottom-container">
      <div className="post-bottom-btns-container flex justify-between items-center py-2">
        <div className="post-bottom-btns-left flex items-center gap-3">
          <CommentsCount commentNo={commentNo} />
          <div className="flex items-center h-10 bg-gray-200 rounded-md">
            <PostLikeBtn styles={'w-11 h-10 px-[10px]'} />
            <PostLikeCount postLikes={postLikes} postDislikes={postDislikes} />
            <PostDislikeBtn styles={'w-11 h-10 px-[10px] pt-[3px]'} />
          </div>
          <SharePostBtn />
        </div>
        {enableCommentBtn && (
          <div className="post-bottom-btns-right comment-btn flex justify-end min-w-36">
            <CommentPostBtn
              isCommFormVisible={isCommFormVisible}
              setIsCommFormVisible={setIsCommFormVisible}
            />
          </div>
        )}
      </div>
      <div className="post-bottom-reply-form">
        <PostReplyForm
          isCommFormVisible={isCommFormVisible}
          setIsCommFormVisible={setIsCommFormVisible}
        />
      </div>
    </div>
  )
}

'use client'

import { LikeBtn } from '@/app/ui/buttons/LikeBtn'
import { DislikeBtn } from '@/app/ui/buttons/DislikeBtn'
import { ReplyBtn } from '@/app/ui/buttons/ReplyBtn'
import { ShareCommentBtn } from '@/app/ui/buttons/ShareCommentBtn'
import { LikeCount } from '@/app/ui/LikeCount'
import { CommentMenuBtn } from './buttons/CommentMenuBtn'
import { CommentReplyForm } from './CommentReplyForm'
import { CommentEditForm } from './CommentEditForm'
import { useCommentContext } from '../lib/context/CommentContextProvider'

export function CommentButtons({ commentId, postId }) {
  const { isVisible, isEditVisible } = useCommentContext()
  return (
    <>
      <div className="comment-btns-container flex items-center ml-4">
        <LikeBtn className="comment-btn-like" />
        <LikeCount className="comment-likes-num" />
        <DislikeBtn className="comment-btn-dislike" />
        <ReplyBtn className="comment-btn-reply" />
        <ShareCommentBtn className="comment-btn-share" />
        <CommentMenuBtn className="comment-btn-menu" commentId={commentId} postId={postId} />
      </div>
      {isVisible && (
        <CommentReplyForm className="comment-reply-form" parentId={commentId} postId={postId} />
      )}
      {isEditVisible && (
        <CommentEditForm className="comment-edit-form" parentId={commentId} postId={postId} />
      )}
    </>
  )
}

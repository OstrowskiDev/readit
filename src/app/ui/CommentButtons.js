'use client'

import { ReplyBtn } from '@/app/ui/buttons/ReplyBtn'
import { ShareCommentBtn } from '@/app/ui/buttons/ShareCommentBtn'
import { LikeCount } from '@/app/ui/LikeCount'
import { CommentMenuBtn } from './buttons/CommentMenuBtn'
import { CommentReplyForm } from './CommentReplyForm'
import { CommentEditForm } from './CommentEditForm'
import { CommentLikeBtn } from './buttons/CommentLikeBtn'
import { CommentDislikeBtn } from './buttons/CommentDislikeBtn'

export function CommentButtons() {
  return (
    <>
      <div className="comment-btns-container flex items-center ml-4">
        <CommentLikeBtn
          className="comment-btn-like"
          styles={'w-11 h-11 px-[10px] py-2'}
        />
        <LikeCount className="comment-likes-num" />
        <CommentDislikeBtn
          className="comment-btn-dislike"
          styles={'w-11 h-11 px-[10px] pt-[9px] pb-[7px]'}
        />
        <ReplyBtn className="comment-btn-reply" />
        <ShareCommentBtn className="comment-btn-share" />
        <CommentMenuBtn className="comment-btn-menu" />
      </div>
      <CommentReplyForm className="comment-reply-form" parentType="comment" />
      <CommentEditForm className="comment-edit-form" />
    </>
  )
}

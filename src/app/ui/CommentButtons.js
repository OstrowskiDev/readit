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

export function CommentButtons() {
  const { isEditVisible } = useCommentContext()

  return (
    <>
      <div className="comment-btns-container flex items-center ml-4">
        <LikeBtn
          className="comment-btn-like"
          collection="comments"
          styles={'w-11 h-11 px-[10px] py-2'}
        />
        <LikeCount className="comment-likes-num" />
        <DislikeBtn
          className="comment-btn-dislike"
          collection="comments"
          styles={'w-11 h-11 px-[10px] pt-[9px] pb-[7px]'}
        />
        <ReplyBtn className="comment-btn-reply" />
        <ShareCommentBtn className="comment-btn-share" />
        <CommentMenuBtn className="comment-btn-menu" />
      </div>
      <CommentReplyForm className="comment-reply-form" />
      {isEditVisible && <CommentEditForm className="comment-edit-form" />}
    </>
  )
}

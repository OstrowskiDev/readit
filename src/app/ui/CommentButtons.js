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
import { usePostContext } from '../lib/context/PostContextProvider'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import cloneDeep from 'lodash/cloneDeep'

export function CommentButtons() {
  const { isVisible, isEditVisible } = useCommentContext()
  const { comments, setComments } = usePostContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  useEffect(() => {
    if (response.state === 'success') {
      toast.success(response.message)
    }
    if (response.state === 'error') {
      toast.error(response.message)
      if (response.optimisticUI === 'create post') {
        onOptimisticCreateCommentError()
      }
    }
  }, [response])

  function onOptimisticCreateCommentError() {
    const newCommentId = response.newCommentId
    const newComment = comments.find((comment) => comment._id === newCommentId)
    const parentId = newComment.parent._id
    const newComments = cloneDeep(comments)
    const oldComments = newComments.filter(
      (comment) => comment._id !== newCommentId,
    )
    const index = oldComments.findIndex((comment) => comment._id === parentId)
    const oldReplies = oldComments[index].replies.filter(
      (id) => id !== newCommentId,
    )
    oldComments[index].replies = oldReplies

    setComments(oldComments)
  }

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
      {isVisible && (
        <CommentReplyForm
          className="comment-reply-form"
          setResponse={setResponse}
        />
      )}
      {isEditVisible && <CommentEditForm className="comment-edit-form" />}
    </>
  )
}

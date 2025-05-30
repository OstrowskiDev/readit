'use client'

import { CommentPostBtn } from '@/ui/buttons/CommentPostBtn'
import { SharePostBtn } from '@/ui/buttons/SharePostBtn'
import { CommentsCount } from '@/ui/comment/CommentsCount'
import { PostReplyForm } from './PostReplyForm'
import { PostLikeCount } from './PostLikeCount'
import { PostDislikeBtn } from '../buttons/PostDislikeBtn'
import { PostLikeBtn } from '../buttons/PostLikeBtn'

export function PostFooter({
  commentNo,
  postLikes,
  postDislikes,
  enableCommentBtn,
  isCommFormVisible,
  setIsCommFormVisible,
}) {
  return (
    <div className="post-bottom-container">
      <div className="post-bottom-btns-container flex justify-between items-center py-2">
        <div className="post-bottom-btns-left flex items-center gap-3">
          <CommentsCount commentNo={commentNo} />
          <div className="post-bottom-btns-likes flex items-center h-10 btn-border-blue-soft">
            <PostLikeBtn styles={'w-11 h-10 px-[10px]'} />
            <PostLikeCount postLikes={postLikes} postDislikes={postDislikes} />
            <PostDislikeBtn styles={'w-11 h-10 px-[10px] pt-[3px]'} />
          </div>
          <SharePostBtn />
        </div>
        {enableCommentBtn && (
          <div className="post-bottom-btns-right comment-btn flex justify-end min-w-28">
            <CommentPostBtn setIsCommFormVisible={setIsCommFormVisible} />
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

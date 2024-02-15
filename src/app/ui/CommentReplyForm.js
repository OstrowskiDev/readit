'use client'

import createReply from '@/app/lib/actions'

export function CommentReplyForm({ parentId }) {
  return (
    <div className="comment-reply-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 bg-white border border-slate-300 rounded-lg">
      <form action={createReply}>
        <textarea
          className="comment-reply-input w-full border-none focus:outline-none"
          placeholder="Add yor comment"
        />
        <div className="comment-reply-btns flex justify-end">
          <button className="comment-reply-cancel-btn btn-gray py-1 px-2 mt-1">Cancel</button>
          <button className="comment-reply-submit-btn btn-blue py-1 px-2 mx-2 mt-1" type="submit">
            Comment
          </button>
        </div>
      </form>
    </div>
  )
}

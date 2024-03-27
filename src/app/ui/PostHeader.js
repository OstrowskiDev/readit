'use client'

import { useSession } from 'next-auth/react'
import Avatar from '../lib/avatars/Avatar'
import TimeAgo from './TimeAgo'
import { EditPostBtn } from './buttons/EditPostBtn'
import { DeletePostBtn } from './buttons/DeletePostBtn'
import { PostOptionsBtn } from './buttons/PostOptionsBtn'
import { usePostContext } from '../lib/context/PostContextProvider'

export function PostHeader({ author }) {
  const { data: session } = useSession()
  const { postId, post, handleMouseEnter, handleMouseLeave } = usePostContext()

  const userId = post?.user_id
  const sessionUserId = session?.user.id
  const isPostAuthor = userId === sessionUserId

  return (
    <>
      {post && author && (
        <div className="comment-header-container relative right-0 flex items-center">
          {/* authors avatar */}
          <div
            className="comment-avatar-container min-w-8 min-h-8 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Avatar
              seed={author.avatar.seed}
              color={author.avatar.color}
              size={32}
              border={1}
            />
          </div>

          {/* authors name */}
          <p
            className="comment-author ml-2 font-bold text-blue-900 text-15 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {author.name}
          </p>

          {/* post time, edit time */}
          <TimeAgo
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            type="created"
          />

          {/* top right buttons */}
          <div className="post-top-btns ml-auto flex gap-2">
            {isPostAuthor && <EditPostBtn postId={postId} />}
            {isPostAuthor && <DeletePostBtn postId={postId} />}
            <PostOptionsBtn postId={postId} />
          </div>
        </div>
      )}
    </>
  )
}

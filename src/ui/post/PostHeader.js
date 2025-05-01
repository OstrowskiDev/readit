'use client'

import { Avatar } from '@/services/dicebear/Avatar'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { TimeAgo } from '@/ui/utils/TimeAgo'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { PostOptMenu } from './PostOptMenu'
import { DeletePostBtn } from '../buttons/DeletePostBtn'
import { EditPostBtn } from '../buttons/EditPostBtn'
import { PostMenuBtn } from '../buttons/PostMenuBtn'

export function PostHeader({ author }) {
  const { data: session } = useSession()
  const { postId, post, handleMouseEnter, handleMouseLeave } = usePostContext()
  const [isPostMenuVis, setIsPostMenuVis] = useState(false)

  const userId = post?.user_id
  const sessionUserId = session?.user.id
  const isPostAuthor = userId === sessionUserId

  return (
    <>
      {post && author && (
        <div className="header-container relative right-0 flex items-center ">
          {/* authors avatar */}
          <div
            className="header-avatar-container min-w-8 min-h-8 hover:cursor-pointer z-20"
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

          <div className="flex below-xs:flex-col z-20">
            {/* authors name */}
            <p
              className="header-author ml-2 font-bold below-xs:leading-tight text-blue-900 text-15 hover:cursor-pointer"
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
          </div>

          {/* top right buttons */}
          <div className="post-top-btns ml-auto flex z-20">
            {isPostAuthor && <DeletePostBtn postId={postId} />}
            {isPostAuthor && <EditPostBtn postId={postId} />}
            <PostMenuBtn
              postId={postId}
              isPostMenuVis={isPostMenuVis}
              setIsPostMenuVis={setIsPostMenuVis}
            />
            <PostOptMenu
              isPostMenuVis={isPostMenuVis}
              setIsPostMenuVis={setIsPostMenuVis}
            />
          </div>
        </div>
      )}
    </>
  )
}

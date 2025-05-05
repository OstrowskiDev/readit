'use client'

import { usePostContext } from '@/lib/context/PostContextProvider'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { PostOptMenu } from './PostOptMenu'
import { DeletePostBtn } from '../buttons/DeletePostBtn'
import { EditPostBtn } from '../buttons/EditPostBtn'
import { PostMenuBtn } from '../buttons/PostMenuBtn'
import { AuthorsInfo } from '../common/AuthorsInfo'
import { usePathname } from 'next/navigation'

export function PostHeader({ author }) {
  const { data: session } = useSession()
  const { postId, post, handleMouseEnter, handleMouseLeave } = usePostContext()
  const [isPostMenuVis, setIsPostMenuVis] = useState(false)

  const userId = post?.user_id
  const sessionUserId = session?.user.id
  const isPostAuthor = userId === sessionUserId
  const pathname = usePathname()
  const isOnMainPage = pathname.endsWith('/posts')

  return (
    <>
      {post && author && (
        <div className="header-container relative right-0 flex items-center ">
          {/* authors avatar */}
          <AuthorsInfo
            size={isOnMainPage ? 32 : 48}
            border={isOnMainPage ? 1 : 2}
            document={post}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />

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

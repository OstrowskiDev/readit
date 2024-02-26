import { likeComment } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { useSession } from 'next-auth/react'
import { getLikeByItemAndUser } from '@/app/lib/db'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export async function LikeBtn() {
  const { commentId, postId } = useCommentContext()
  // const { data: session } = useSession()
  const sessionObj = useSession()
  console.log(sessionObj)

  let userLikes
  // if (session) {
  //   console.log(session)
  //   const userId = session?.user.id
  //   const likeObject = await getLikeByItemAndUser({ commentId, userId })
  //   console.log(`commentId is: ${commentId}`)
  //   console.log(`userId is: ${userId}`)
  //   console.log(`likeObject is: ${likeObject}`)
  //   userLikes = Boolean(likeObject)
  // } else {
  //   userLikes = false
  // }
  userLikes = false
  // console.log('accessing session data inside LikeBtn:')
  // console.log(sessionObj)
  const likeCommentWithId = likeComment.bind(null, commentId, postId)

  return (
    <form action={likeCommentWithId} className="p-[3px] rounded-md hover:bg-gray-200">
      <button className="w-[22px] m-1 flex justify-center items-center">
        {userLikes ? <LikeIcoActive /> : <LikeIco />}
      </button>
    </form>
  )
}

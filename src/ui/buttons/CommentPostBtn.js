import { usePostContext } from '@/lib/context/PostContextProvider'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export function CommentPostBtn({ setIsCommFormVisible }) {
  const { data: session } = useSession()
  const { postId } = usePostContext()
  const router = useRouter()
  const pathname = usePathname()

  function handleClick(event) {
    event.preventDefault()
    if (!session) return signIn()
    if (pathname !== `/posts/post/${postId}`) {
      router.push(`/posts/post/${postId}?createComment=true`)
      return
    } else {
      setIsCommFormVisible((prevValue) => !prevValue)
    }
  }

  return (
    <div className="create-comment-btn-container relative btn-border-blue-soft interactive-orange-strong text-app-blue-text h-10 mt-[1px] z-20">
      <button
        onClick={handleClick}
        className="create-comment-btn-body flex justify-center items-center px-6 pt-[5px]"
      >
        Comment
      </button>
    </div>
  )
}

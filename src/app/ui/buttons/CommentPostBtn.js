import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export function CommentPostBtn({ setIsCommFormVisible }) {
  const { data: session } = useSession()
  const { postId } = usePostContext()
  const router = useRouter()
  const pathname = usePathname()

  function handleClick(event) {
    event.preventDefault()
    if (!session) signIn()
    if (pathname !== `/posts/post/${postId}`) {
      router.push(`/posts/post/${postId}?createComment=true`)
      return
    } else {
      setIsCommFormVisible((prevValue) => !prevValue)
    }
  }

  return (
    <div className="btn-container h-10 mt-[1px] rounded-md bg-gray-200 hover:bg-gray-300">
      <button
        onClick={handleClick}
        className="btn-body flex justify-center items-center p-2 "
      >
        <p className="btn-text block px-2">Comment</p>
      </button>
    </div>
  )
}

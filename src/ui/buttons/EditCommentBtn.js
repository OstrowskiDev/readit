import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { EditIco } from '../icons/EditIco'
import { useCommentContext } from '@/lib/context/CommentContextProvider'

export function EditCommentBtn({
  setIsEditVisible,
  isEditVisible,
  setIsMenuVisible,
}) {
  const { comment } = useCommentContext()
  const router = useRouter()
  const pathname = usePathname()

  function onEditClick(event) {
    event.preventDefault()
    if (pathname === '/posts/favorites') {
      const href = `/posts/post/${comment.rootPostId}?showEditForm=true#${comment._id}`
      router.push(href)
      return
    }
    setIsEditVisible(!isEditVisible)
    setIsMenuVisible(false)
  }

  return (
    <button
      className="menu-opt-edit-btn flex items-center px-8 py-2  hover:bg-app-blue/20"
      type="button"
      onClick={onEditClick}
    >
      <div className="menu-opt-edit-ico w-6 m-1 flex justify-center items-center">
        <EditIco className={'text-app-blue-text'} />
      </div>
      <p className="menu-opt-edit-text ml-2 text-lg">Edit</p>
    </button>
  )
}

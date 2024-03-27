import DeleteIco from '../icons/DeleteIco'
import { deletePost } from '../../lib/actions'

export function DeletePostBtn({ postId }) {
  const deletePostWithId = deletePost.bind(null, postId)
  return (
    <form action={deletePostWithId}>
      <button className="w-[38px] p-2 flex justify-center items-center rounded-md hover:bg-gray-200">
        <DeleteIco />
      </button>
    </form>
  )
}

import DeleteIco from '../icons/DeleteIco'
import { deletePost } from '../../lib/actions'

export function DeletePostBtn({ postId }) {
  const deletePostWithId = deletePost.bind(null, postId)
  return (
    <form action={deletePostWithId}>
      <button className="w-[22px] m-1 mt-2 flex justify-center items-center">
        <DeleteIco />
      </button>
    </form>
  )
}

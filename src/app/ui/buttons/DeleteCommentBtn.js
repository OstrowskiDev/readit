import DeleteIco from '../icons/DeleteIco'
// import { deleteComment } from '../../lib/actions'

export function DeleteCommentBtn({ postId }) {
  // const deleteCommentWithId = deleteComment.bind(null, postId)
  return (
    // <form action={deleteCommentWithId}>
    <form>
      <button className="w-[22px] m-1 flex justify-center items-center">
        <DeleteIco />
      </button>
    </form>
  )
}

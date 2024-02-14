import { DislikeIco } from '../icons/DislikeIco'
//create import dislikeComment from actions

export function DislikeBtn({ postId }) {
  // const dislikeCommentWithId = dislikeComment.bind(null, postId)
  return (
    <form className="p-[3px] rounded-md hover:bg-gray-200">
      {/* <form action={dislikeCommentWithId}> */}
      <button className="w-[22px] m-1 pt-1 flex justify-center items-center">
        <DislikeIco />
      </button>
    </form>
  )
}

import { DislikeIco } from '../icons/DislikeIco'
//create import dislikeComment from actions

export function DislikeBtn({ postId }) {
  // const dislikeCommentWithId = dislikeComment.bind(null, postId)
  return (
    <form className="mt-[3px]">
      {/* <form action={dislikeCommentWithId}> */}
      <button className="w-[22px] m-1 flex justify-center items-center">
        <DislikeIco />
      </button>
    </form>
  )
}

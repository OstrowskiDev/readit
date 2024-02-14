import { LikeIco } from '../icons/LikeIco'
//create import likeComment from actions

export function LikeBtn({ postId }) {
  // const likeCommentWithId = likeComment.bind(null, postId)
  return (
    <form>
      {/* <form action={likeCommentWithId}> */}
      <button className="w-[22px] m-1 flex justify-center items-center">
        <LikeIco />
      </button>
    </form>
  )
}

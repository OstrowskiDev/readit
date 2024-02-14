import { ReplyIco } from '../icons/ReplyIco'
//create replyToComment component

export function ReplyBtn({ commentId }) {
  // not sure if I need to bind commentId
  // const replyToCommentWithId = replyToComment.bind(null, commentId)
  return (
    <form className="mt-[1px]">
      {/* <form action={replyToCommentWithId}> */}
      <button className="w-[22px] m-1 flex justify-center items-center">
        <ReplyIco />
      </button>
    </form>
  )
}

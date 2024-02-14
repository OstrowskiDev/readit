import { ReplyIco } from '../icons/ReplyIco'
//create replyToComment component

export function ReplyBtn({ commentId }) {
  // not sure if I need to bind commentId
  // const replyToCommentWithId = replyToComment.bind(null, commentId)
  return (
    <form className="btn-container mt-[1px] ml-2 p-2 rounded-md hover:bg-gray-200">
      {/* <form action={replyToCommentWithId}> */}
      <button className="btn-body flex justify-center items-center">
        <div className="btn-icon-container w-[22px]">
          <ReplyIco />
        </div>
        <p className="btn-text ml-1 font-semibold text-gray-500">Reply</p>
      </button>
    </form>
  )
}

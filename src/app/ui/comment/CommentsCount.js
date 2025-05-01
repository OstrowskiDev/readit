import { ReplyIco } from '../icons/ReplyIco'

export function CommentsCount({ commentNo }) {
  return (
    <div className="post-comments-num-container below-xs:hidden flex items-center h-10 px-5 ml-0 bg-gray-200 rounded-md">
      <div className="post-comments-num-ico w-[22px]">
        <ReplyIco />
      </div>
      <p className="post-comments-num-text ml-[6px] font-semibold text-gray-500">
        {commentNo}
      </p>
    </div>
  )
}

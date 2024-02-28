import { ReplyIco } from './icons/ReplyIco'

export function CommentsCount({ commentNo }) {
  return (
    <div className="post-comments-num-container flex ml-4">
      <div className="post-comments-num-ico w-[22px]">
        <ReplyIco />
      </div>
      <p className="post-comments-num-text ml-2 font-semibold text-gray-500">{commentNo}</p>
    </div>
  )
}

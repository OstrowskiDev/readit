import { ReplyIco } from '../icons/ReplyIco'

export function CommentsCount({ commentNo }) {
  return (
    <div className="post-comments-num-container below-xs:hidden flex items-center btn-border-blue-soft h-10 px-5 ml-0">
      <div className="post-comments-num-ico w-[22px] mt-[2px]">
        <ReplyIco className="text-app-blue-text" />
      </div>
      <p className="post-comments-num-text font-orbitron-bold ml-[7px] font-semibold text-app-blue-text">
        {commentNo}
      </p>
    </div>
  )
}

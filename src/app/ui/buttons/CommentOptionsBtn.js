import { DotsIco } from '../icons/DotsIco'

export function CommentOptionsBtn({ postId }) {
  return (
    <div className="p-[3px] mt-[3px] rounded-md hover:bg-gray-200">
      <button type="button" className="w-[22px] m-1 flex justify-center items-center">
        <DotsIco />
      </button>
    </div>
  )
}

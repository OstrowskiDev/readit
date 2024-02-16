'use client'

import { ReplyIco } from '../icons/ReplyIco'

export function ReplyBtn({ isVisible, setIsVisible }) {
  return (
    <div className="btn-container mt-[1px] ml-2 p-2 rounded-md hover:bg-gray-200">
      <button
        className="btn-body flex justify-center items-center"
        onClick={() => setIsVisible(!isVisible)}
      >
        <div className="btn-icon-container w-[22px]">
          <ReplyIco />
        </div>
        <p className="btn-text ml-1 font-semibold text-gray-500">Reply</p>
      </button>
    </div>
  )
}

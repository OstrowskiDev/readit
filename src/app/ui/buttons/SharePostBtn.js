import { ShareIco2 } from '../icons/ShareIco2'

export function SharePostBtn() {
  return (
    <div className="btn-container mt-[1px] p-2 rounded-md hover:bg-gray-200">
      <button className="btn-body flex justify-center items-center">
        <div className="btn-icon-container w-[22px]">
          <ShareIco2 />
        </div>
        <p className="btn-text ml-[6px] font-semibold text-gray-500">Share</p>
      </button>
    </div>
  )
}

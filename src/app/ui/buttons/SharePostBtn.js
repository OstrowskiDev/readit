import { ShareIco2 } from '../icons/ShareIco2'

export function SharePostBtn() {
  return (
    <div className="btn-container ">
      <button className="btn-body flex justify-center items-center h-10 px-4 rounded-md bg-gray-200 hover:bg-gray-300">
        <div className="btn-icon-container w-[22px]">
          <ShareIco2 />
        </div>
        <p className="btn-text ml-[6px] font-semibold text-gray-500">Share</p>
      </button>
    </div>
  )
}

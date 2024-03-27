import { PlusIco } from '../icons/PlusIco'

export function FollowBtn() {
  function onFollowClick() {
    //this functionality will not be implemented
  }
  return (
    <button
      onClick={onFollowClick}
      className="follow-btn-container flex justify-center items-center h-10 px-4 rounded-full bg-blue-600 hover:bg-blue-700"
    >
      <div className="btn-icon-container w-[21px]">
        <PlusIco color={'white'} size={21} />
      </div>
      <p className="btn-text ml-[6px] font-semibold text-white">Follow</p>
    </button>
  )
}

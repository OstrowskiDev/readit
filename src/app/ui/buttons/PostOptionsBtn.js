import { DotsIco } from '../icons/DotsIco'

export function PostOptionsBtn({ postId }) {
  //no additional functionality planned for this component atm
  //in future save and/or favorite may be added
  function onClick(event) {
    event.preventDefault()
  }

  return (
    <div className="p-[3px] mt-[3px] rounded-md hover:bg-gray-200">
      <button
        onClick={onClick}
        type="button"
        className="w-[22px] m-1 flex justify-center items-center"
      >
        <DotsIco />
      </button>
    </div>
  )
}

import { SaveIco } from '../icons/SaveIco'

export function SavePostBtn({ postId }) {
  return (
    <form>
      <button className="w-[20px] m-1 flex justify-center items-center">
        <SaveIco />
      </button>
    </form>
  )
}

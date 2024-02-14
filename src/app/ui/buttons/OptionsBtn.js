import { DotsIco } from '../icons/DotsIco'

export function OptionsBtn({ postId }) {
  // const postOptionsWithId = postOptions.bind(null, postId)
  return (
    <form className="p-[3px] mt-[3px] rounded-md hover:bg-gray-200">
      {/* <form action={postOptionsWithId}> */}
      <button className="w-[22px] m-1 flex justify-center items-center">
        <DotsIco />
      </button>
    </form>
  )
}

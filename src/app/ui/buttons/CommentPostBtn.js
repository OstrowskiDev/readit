import { signIn, useSession } from 'next-auth/react'

export function CommentPostBtn({ isCommFormVisible, setIsCommFormVisible }) {
  const { data: session } = useSession()

  function handleClick() {
    session ? setIsCommFormVisible(!isCommFormVisible) : signIn()
  }

  return (
    <div className="btn-container h-10 mt-[1px] rounded-md bg-gray-200 hover:bg-gray-300">
      <button
        onClick={handleClick}
        className="btn-body flex justify-center items-center p-2 "
      >
        <p className="btn-text block px-2">Comment</p>
      </button>
    </div>
  )
}

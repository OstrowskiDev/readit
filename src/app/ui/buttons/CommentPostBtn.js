import { signIn, useSession } from 'next-auth/react'

export function CommentPostBtn({ isCommentFormVisible, setIsCommentFormVisible }) {
  const { data: session } = useSession()

  function handleClick() {
    session ? setIsCommentFormVisible(!isCommentFormVisible) : signIn()
  }

  return (
    <div className="btn-container mt-[1px] rounded-md bg-gray-200 hover:bg-gray-300">
      <button onClick={handleClick} className="btn-body flex justify-center items-center p-2 ">
        <p className="btn-text block mr-2">Write comment</p>
      </button>
    </div>
  )
}

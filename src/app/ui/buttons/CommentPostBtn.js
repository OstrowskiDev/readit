export function CommentPostBtn({ isCommentFormVisible, setIsCommentFormVisible }) {
  function handleClick() {
    setIsCommentFormVisible(!isCommentFormVisible)
  }

  return (
    <div className="btn-container mt-[1px] rounded-md bg-gray-200 hover:bg-gray-300">
      <button onClick={handleClick} className="btn-body flex justify-center items-center p-2 ">
        <p className="btn-text block mr-2">Write comment</p>
      </button>
    </div>
  )
}

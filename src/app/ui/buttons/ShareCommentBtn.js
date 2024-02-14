export function ShareCommentBtn() {
  return (
    <form className="btn-container mt-[1px] p-2 rounded-md hover:bg-gray-200">
      {/* <form action={shareComment}> */}
      <button className="w-[40px]">
        <p className="btn-text font-semibold  text-gray-500">Share</p>
      </button>
    </form>
  )
}

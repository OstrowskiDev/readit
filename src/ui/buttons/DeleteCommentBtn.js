'use client'

import { DeleteIco } from '../icons/DeleteIco'

export function DeleteCommentBtn({ onDeleteSubmit }) {
  function SubmitButton() {
    return (
      <button
        className="menu-opt-delete-btn flex items-center px-8 py-2 hover:bg-app-blue/20"
        type="button"
        onClick={onDeleteSubmit}
      >
        <div className="menu-opt-delete-ico w-6 m-1 flex justify-center items-center">
          <DeleteIco className={'text-app-blue-text'} />
        </div>
        <p className="menu-opt-delete-text ml-2 text-lg">Delete</p>
      </button>
    )
  }

  return (
    <div className="delete-comment-btn">
      <SubmitButton />
    </div>
  )
}

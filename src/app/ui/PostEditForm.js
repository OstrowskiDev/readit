import { useState } from 'react'
import { EditFormBtns } from './buttons/EditFormBtns'
import { usePostContext } from '../lib/context/PostContextProvider'

export function PostEditForm({ isEditFormVisible, setIsEditFormVisible }) {
  const { post } = usePostContext()
  const [formData, setFormData] = useState({
    _id: post._id,
    title: post.title,
    content: post.content,
  })

  // !!!! ad Toasts

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  function onCancelClick() {
    setIsEditFormVisible(false)
  }

  function onSubmit() {
    // !!!! add editPost function
    setIsEditFormVisible(false)
  }

  return (
    <>
      {isEditFormVisible && (
        <div className="post-edit-form pb-4 my-2 border-t border-b border-gray-300">
          <form>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              edit post title:
            </h3>
            <div className="change-border-on-child-focus p-1 bg-gray-50 border border-slate-300 rounded-md">
              <textarea
                className="post-title-input w-full h-6 bg-gray-50 resize-none border-none focus:outline-none"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              edit post content:
            </h3>
            <div className="change-border-on-child-focus p-2 mb-4 bg-gray-50 border border-slate-300 rounded-md">
              <textarea
                className="post-content-input w-full h-32 border-none focus:outline-none bg-gray-50"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>
            <EditFormBtns onCancelClick={onCancelClick} onSubmit={onSubmit} />
          </form>
        </div>
      )}
    </>
  )
}

'use client'

import DeleteIco from '../icons/DeleteIco'
import { toast } from 'sonner'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { Loader } from '../Loader'
import { deleteComment } from '@/app/lib/actions'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'

export function DeleteCommentBtn({ setIsMenuVisible }) {
  const { commentId, postId } = useCommentContext()
  const deleteCommentWithAtrib = deleteComment.bind(null, commentId, postId)

  const [response, formAction] = useFormState(deleteCommentWithAtrib, {
    state: null,
    message: null,
  })

  useEffect(() => {
    if (response.state === 'success') {
      toast.success(response.message)
      setIsMenuVisible(false)
    }
    if (response.state === 'error') {
      toast.error(response.message)
      setIsMenuVisible(false)
    }
  }, [response])

  function SubmitButton() {
    const { pending } = useFormStatus()

    return (
      <button
        className="menu-opt-delete-btn flex items-center px-8 py-2 hover:bg-gray-200"
        type="submit"
      >
        <div className="menu-opt-delete-ico w-6 m-1 flex justify-center items-center">
          <DeleteIco />
        </div>
        <p className="menu-opt-delete-text ml-2 text-lg">Delete</p>
        {pending && <Loader />}
      </button>
    )
  }

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  )
}

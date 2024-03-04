'use client'

import DeleteIco from '../icons/DeleteIco'
import { toast } from 'sonner'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Loader } from '../Loader'
import { deleteComment } from '@/app/lib/actions'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'

export function DeleteCommentBtn() {
  const { commentId, postId, authorId } = useCommentContext()
  const { data: session } = useSession()
  const usersId = session?.user.id
  const isUsersComment = usersId === authorId
  const deleteCommentWithAtrib = deleteComment.bind(null, commentId, postId)

  // function testingLog() {
  //   console.log('form Action triggered')
  //   return { state: 'success', message: 'oh my!' }
  // }

  const [submition, formAction] = useFormState(deleteCommentWithAtrib, {
    state: null,
    message: null,
  })

  useEffect(() => {
    console.log('delete button submition was triggered')
    // console.log(submition)
    if (submition.state === 'success') {
      toast.success(submition.message)
    }
    if (submition.state === 'error') {
      toast.error(submition.message)
    }
  }, [submition])

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

  // return <form action={formAction}>{isUsersComment && <SubmitButton />}</form>

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  )
}

'use client'

import { useSession } from 'next-auth/react'
import { deleteComment } from '../lib/actions'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import EditIco from './icons/EditIco'
import { SaveIco } from './icons/SaveIco'

export function CommentOptMenu({ isMenuVisible, setIsMenuVisible }) {
  const { isEditVisible, setIsEditVisible, commentId, postId, authorId } = useCommentContext()
  const { data: session } = useSession()
  const usersId = session?.user.id
  const isUsersComment = usersId === authorId
  const deleteCommentWithAtrib = deleteComment.bind(null, commentId, postId)

  function EditBtn() {
    function onEditClick() {
      setIsEditVisible(!isEditVisible)
      setIsMenuVisible(false)
    }

    return (
      <button
        className="menu-opt-edit-btn flex items-center px-8 py-2  hover:bg-gray-200"
        type="button"
        onClick={onEditClick}
      >
        <div className="menu-opt-edit-ico w-6 m-1 flex justify-center items-center">
          <EditIco />
        </div>
        <p className="menu-opt-edit-text ml-2 text-lg">Edit</p>
      </button>
    )
  }

  // function DeleteBtn() {
  //   // function testingLog() {
  //   //   console.log('form Action triggered')
  //   //   return { state: 'success', message: 'oh my!' }
  //   // }

  //   const [submition, formAction] = useFormState(deleteCommentWithAtrib, {
  //     state: null,
  //     message: null,
  //   })

  //   useEffect(() => {
  //     console.log('submition value inside useEffect:')
  //     console.log(submition)
  //     if (submition.state === 'success') {
  //       toast.success(submition.message)
  //     }
  //     if (submition.state === 'error') {
  //       toast.error(submition.message)
  //     }
  //   }, [submition])

  //   function SubmitButton() {
  //     const { pending } = useFormStatus()

  //     return (
  //       <button
  //         className="menu-opt-delete-btn flex items-center px-8 py-2 hover:bg-gray-200"
  //         type="submit"
  //       >
  //         <div className="menu-opt-delete-ico w-6 m-1 flex justify-center items-center">
  //           <DeleteIco />
  //         </div>
  //         <p className="menu-opt-delete-text ml-2 text-lg">Delete</p>
  //         {pending && <Loader />}
  //       </button>
  //     )
  //   }

  //   return (
  //     <form action={formAction}>
  //       <SubmitButton />
  //     </form>
  //   )
  // }

  function SaveBtn() {
    function onSaveClick() {
      console.log('this needs to be implemented!')
      setIsMenuVisible(false)
    }
    return (
      <button
        className="menu-opt-save-btn flex items-center px-8 py-2 hover:bg-gray-200"
        type="button"
        onClick={onSaveClick}
      >
        <div className="menu-opt-save-ico w-5 m-1 flex justify-center items-center">
          <SaveIco />
        </div>
        <p className="menu-opt-save-text ml-2 text-lg">Save</p>
      </button>
    )
  }

  return (
    <div
      className={`menu-container flex flex-col absolute z-10 top-10 right-0  bg-white border border-gray-300 rounded-md`}
    >
      {isUsersComment && <EditBtn />}
      {/* {isUsersComment && <DeleteBtn />} */}
      <SaveBtn />
    </div>
  )
}

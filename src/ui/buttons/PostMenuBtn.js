import { signIn, useSession } from 'next-auth/react'
import { DotsIco } from '../icons/DotsIco'

export function PostMenuBtn({ setIsPostMenuVis }) {
  const { data: session } = useSession()

  function handleClick(event) {
    event.preventDefault()
    if (!session) return signIn()
    setIsPostMenuVis(true)
    document.addEventListener('click', handleDocumentClick)
  }

  function handleDocumentClick(event) {
    event.preventDefault()
    if (!event.target.closest('.menu-btn-container')) {
      setIsPostMenuVis(false)
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  return (
    <div className="post-menu-btn mt-[2px] rounded-md hover:bg-gray-200">
      <button
        onClick={handleClick}
        type="button"
        className="w-[36px] p-[5px] flex justify-center items-center"
      >
        <DotsIco />
      </button>
    </div>
  )
}

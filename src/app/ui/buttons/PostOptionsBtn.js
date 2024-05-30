import { signIn, useSession } from 'next-auth/react'
import { DotsIco } from '../icons/DotsIco'

export function PostOptionsBtn({ setIsPostMenuVis }) {
  const { data: session } = useSession()

  function handleClick(event) {
    event.preventDefault()
    if (!session) signIn()
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
    <div className="p-[7px] mt-[3px] rounded-md hover:bg-gray-200">
      <button
        onClick={handleClick}
        type="button"
        className="w-[22px] flex justify-center items-center"
      >
        <DotsIco />
      </button>
    </div>
  )
}

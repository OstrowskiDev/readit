import { signIn, useSession } from 'next-auth/react'
import { DotsIco } from '../icons/DotsIco'
import { useRef } from 'react'

export function PostMenuBtn({ isPostMenuVis, setIsPostMenuVis }) {
  const { data: session } = useSession()
  const buttonRef = useRef(null)

  function handleClick() {
    if (!session) return signIn()
    if (isPostMenuVis) {
      setIsPostMenuVis(false)
      document.removeEventListener('click', handleDocumentClick)
    } else {
      setIsPostMenuVis(true)
      document.addEventListener('click', handleDocumentClick)
    }
  }

  function handleDocumentClick(event) {
    // ignores click on button that opens menu
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return
    }

    if (!event.target.closest('.menu-btn-container')) {
      setIsPostMenuVis(false)
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  return (
    <div className="post-menu-btn interactive-blue-soft mt-[2px] rounded-md">
      <button
        className="w-[36px] p-[5px] flex justify-center items-center"
        aria-label="Open post menu"
        ref={buttonRef}
        type="button"
        onClick={handleClick}
      >
        <DotsIco className={'text-app-blue-text'} />
      </button>
    </div>
  )
}

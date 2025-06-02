import { signIn, useSession } from 'next-auth/react'

export function CreateBtn({ isCreateFormVis, setIsCreateFormVis }) {
  const { data: session } = useSession()

  function onClick() {
    if (!session) return signIn()
    setIsCreateFormVis(!isCreateFormVis)
  }
  return (
    <button
      className="create-new-post-button button-orange-strong h-10 px-4 ml-2 just-md:mr-2 md:mr-0"
      onClick={onClick}
    >
      Create +
    </button>
  )
}

import { signIn, useSession } from 'next-auth/react'

export default function CreateBtn({ isCreateFormVis, setIsCreateFormVis }) {
  const { data: session } = useSession()

  function onClick() {
    if (!session) return signIn()
    setIsCreateFormVis(!isCreateFormVis)
  }
  return (
    <button className="btn-blue h-10 px-4 py-2 md:ml-2" onClick={onClick}>
      Create +
    </button>
  )
}

import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function GoodbyePage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/posts')
  }

  return (
    <div
      className="w-full bg-white flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="goodbye-container flex flex-col items-center bg-blue-500 px-8 py-5 rounded-xl shadow-lg">
        <h1 className="goodbye-title text-3xl pt-1 font-bold text-white">
          Thanks for your visit!
        </h1>
        <p className="goodbye-subtitle text-md my-1 text-white">
          You want to sign in back? No problem! Just
          <Link
            href="/login"
            className="goodbye-log-back font-bold cursor-pointer "
          >
            {'  click here!'}
          </Link>
        </p>
      </div>
    </div>
  )
}

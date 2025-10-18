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
      className="w-full flex justify-center items-center"
      style={{ height: `calc(100vh - 96px)` }}
    >
      <div className="goodbye-container flex flex-col items-center w-full lg:w-[480px] px-2 lg:px-8 py-5 bg-blue-500 lg:rounded-xl shadow-lg">
        <h1 className="goodbye-title below-xs:text-2xl text-3xl pt-1 text-center font-bold  text-white">
          Thanks for your visit!
        </h1>
        <p className="goodbye-subtitle below-xs:w-[315px] my-1 text-center text-md below-xs:text-sm text-white">
          Want to sign in back? No problem! Just
          <Link
            href="/login"
            className="goodbye-log-back font-bold cursor-pointer "
          >
            {'  click here'}
          </Link>
        </p>
      </div>
    </div>
  )
}

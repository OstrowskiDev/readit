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
      <div
        className="
            goodbye-container
            flex flex-col items-left justify-start 
            w-full md:w-[480px] 
            h-[160px]
            px-8 py-10 below-lg:mb-28 
            glass-blue-soft 
            rounded-none md:rounded-xl
            below-md:border-x-0
            shadow-lg"
      >
        <h1 className="goodbye-title below-xs:text-2xl text-3xl pt-1 text-center font-bold  text-app-blue-text">
          Thanks for your visit!
        </h1>
        <p className="goodbye-subtitle my-1 text-center text-md below-xs:text-sm text-app-blue-text">
          Want to sign in to another account?
          <Link
            href="/login"
            className="goodbye-log-back font-bold cursor-pointer "
          >
            {' Click here'}
          </Link>
        </p>
      </div>
    </div>
  )
}

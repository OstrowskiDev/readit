import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/models/User'
import validator from 'validator'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export async function GET(request, { params }) {
  const userId = params.id
  const session = await getServerSession(authOptions)
  const sessionUserId = session.user.id
  if (userId !== sessionUserId) {
    console.error(
      "Warning, /api/users/user/private/[id] endpoint was used with session.user.id that doesn't match params [id].",
    )
    return null
  }

  try {
    await connectToDatabase()
    const post = await User.findOne({ _id: userId }).select('-password')
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching post' + error, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import User from '@/app/lib/models/User'
import validator from 'validator'

export async function GET(request, { params }) {
  const userId = params.id

  if (!validator.isUUID(userId))
    return new NextResponse('Invalid input: userId must be a valid UUID', {
      status: 400,
    })

  try {
    await connectToDatabase()
    const post = await User.findOne({ _id: userId }).select('-password')
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching post' + error, { status: 500 })
  }
}

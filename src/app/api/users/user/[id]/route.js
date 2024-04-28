import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import User from '@/app/lib/models/User'

export async function GET(request, { params }) {
  const userId = params.id
  try {
    await connectToDatabase()
    const post = await User.findOne({ _id: userId }).select('-password')
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching post' + error, { status: 500 })
  }
}

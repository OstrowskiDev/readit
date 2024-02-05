import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Users from '@/app/lib/models/Users'

export async function GET(request, { params }) {
  const userId = params.id
  try {
    await connectToDatabase()
    const post = await Users.findOne({ 'user-id': userId })
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching post' + error, { status: 500 })
  }
}

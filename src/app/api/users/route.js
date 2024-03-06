import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import User from '@/app/lib/models/User'

export const GET = async (request) => {
  try {
    await connectToDatabase()
    const users = await User.find()
    return new NextResponse(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching posts' + error, { status: 500 })
  }
}

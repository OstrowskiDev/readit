import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Users from '@/app/lib/models/Users'

export const GET = async (request) => {
  try {
    await connectToDatabase()
    const users = await Users.find()
    return new NextResponse(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching posts' + error, { status: 500 })
  }
}

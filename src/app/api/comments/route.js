import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Comment from '@/lib/models/Comment'

export const GET = async (request) => {
  try {
    await connectToDatabase()
    const comments = await Comment.find()

    return new NextResponse(JSON.stringify(comments), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching comments' + error, {
      status: 500,
    })
  }
}

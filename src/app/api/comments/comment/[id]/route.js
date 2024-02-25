import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Comment from '@/app/lib/models/Comment'
import validator from 'validator'

export async function GET(request, { params }) {
  const commentId = params.id
  try {
    if (validator.isUUID(commentId)) {
      await connectToDatabase()
      const comment = await Comment.findOne({ _id: commentId })

      if (comment) {
        return new NextResponse(JSON.stringify(comment), { status: 200 })
      } else {
        console.error('Comment with provided UUID not found')
        return new NextResponse('Comment not found', { status: 404 })
      }
    } else {
      console.error('Invalid UUID:', commentId)
      return new NextResponse('Comment not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error in fetching comment:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

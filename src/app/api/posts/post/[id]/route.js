import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'
import validator from 'validator'

export async function GET(request, { params }) {
  console.log('sending HTTPS request to MongoDB...')
  const postId = params.id
  try {
    if (validator.isUUID(postId)) {
      await connectToDatabase()
      const post = await Post.findOne({ _id: postId })

      if (post) {
        return new NextResponse(JSON.stringify(post), { status: 200 })
      } else {
        console.error('Post with provided UUID not found')
        return new NextResponse('Post not found', { status: 404 })
      }
    } else {
      console.error('Invalid UUID:', postId)
      return new NextResponse('Post not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error in fetching post:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

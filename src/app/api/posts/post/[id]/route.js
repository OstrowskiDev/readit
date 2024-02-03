import { NextResponse } from 'next/server'
import connectToDatabase from '@/app/lib/db'
import Post from '@/app/lib/models/Post'

export async function GET(request, { params }) {
  const postId = params.id
  try {
    await connectToDatabase()
    const post = await Post.findOne({ _id: postId })
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching post' + error, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'

export const GET = async (request) => {
  try {
    await connectToDatabase()
    const posts = await Post.find()
    return new NextResponse(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching posts' + error, { status: 500 })
  }
}

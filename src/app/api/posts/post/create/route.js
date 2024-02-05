import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request) {
  try {
    await connectToDatabase()
    const { title, user, content } = request.body
    const uuid = uuidv4().toString()
    const newPost = new Post({
      _id: uuid(),
      title,
      user,
      content,
    })
    // return new NextResponse(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in creating new post' + error, { status: 500 })
  }
}

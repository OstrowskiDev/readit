import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import Post from '@/app/lib/models/Post'
import { connectToDatabase } from '@/app/lib/db'

export async function POST(req) {
  try {
    const { title, content, postId, secret: reqSecret } = await req.json()
    const secret = process.env.TEST_USER_SECRET

    if (secret !== reqSecret)
      return new NextResponse('Not authorized', { status: 401 })

    if (!title || !content || !postId)
      return NextResponse('Invalid data', { status: 400 })

    const session = await getServerSession(authOptions)
    if (!session || !session.user)
      return new NextResponse('Not authorized', { status: 401 })

    const userId = session.user.id
    const newPost = new Post({
      _id: postId,
      title: title,
      user_id: userId,
      content: content,
    })
    await connectToDatabase()
    await newPost.save()
    return new NextResponse('Test Post created successfully!', { status: 200 })
  } catch (error) {
    console.error('Error creating test poast:', error)
    return new NextResponse('Errors creating test poast', { status: 500 })
  }
}

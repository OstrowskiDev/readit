import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import validator from 'validator'
import Like from '@/app/lib/models/Like'

export async function GET(request, { params }) {
  const likeId = params.id
  try {
    if (validator.isUUID(likeId)) {
      await connectToDatabase()
      const like = await Like.findOne({ _id: likeId })

      if (like) {
        return new NextResponse(JSON.stringify(like), { status: 200 })
      } else {
        console.error('like with provided UUID not found')
        return new NextResponse('like not found', { status: 404 })
      }
    } else {
      console.error('Invalid UUID:', likeId)
      return new NextResponse('like not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error in fetching like:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

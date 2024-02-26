import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import validator from 'validator'
import Like from '@/app/lib/models/Like'

export async function GET(request, { params }) {
  const itemId = params.itemId
  const userId = params.userId

  try {
    if (validator.isUUID(itemId) && validator.isUUID(userId)) {
      await connectToDatabase()
      const like = await Like.findOne({ itemId: itemId, userId: userId })

      if (like) {
        return new NextResponse(JSON.stringify(like), { status: 200 })
      } else {
        console.error('like with provided params not found')
        return new NextResponse('like not found', { status: 404 })
      }
    } else {
      console.error(`Invalid UUID: ${itemId} or ${userId}`)
      return new NextResponse('like not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error in fetching like:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

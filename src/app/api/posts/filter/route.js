import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'

export async function GET(req, res) {
  try {
    await connectToDatabase()
    const filteredPosts = await Post.aggregate([
      {
        $graphLookup: {
          from: 'comments',
          startWith: '$comments',
          connectFromField: '_id',
          connectToField: 'parent._id',
          as: 'allReplies',
        },
      },
      {
        $addFields: {
          totalComments: {
            $add: [
              { $size: { $ifNull: ['$allReplies', []] } },
              { $size: { $ifNull: ['$comments', []] } },
            ],
          },
        },
      },
      {
        $sort: { totalComments: -1 },
      },
      {
        $limit: 20,
      },
    ])
    return new NextResponse(JSON.stringify(filteredPosts), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching posts' + error, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'
import validator from 'validator'
import allowedPostIds from '@/app/lib/security/allowedPostIds'

export async function GET(request, { params }) {
  const postId = params.id

  if (!validator.isUUID(postId) && !allowedPostIds.includes(postId)) {
    console.error('Invalid UUID in /api/posts/post/[id] rotue, UUID:', postId)
    return new NextResponse('Post not found', { status: 404 })
  }
  try {
    await connectToDatabase()
    const post = await Post.aggregate([
      { $match: { _id: postId } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'authorData',
        },
      },
      { $unwind: '$authorData' },
      {
        $project: {
          'authorData.password': 0,
          'authorData.address': 0,
          'authorData.email': 0,
          'authorData.phone': 0,
        },
      },
      // get total number of replies for each post:
      {
        $graphLookup: {
          from: 'comments',
          startWith: '$comments',
          connectFromField: '_id',
          connectToField: 'parent._id',
          as: 'allReplies',
        },
      },
      // calc total number of comments for each post:
      {
        $addFields: {
          commentsCount: {
            $add: [
              { $size: { $ifNull: ['$allReplies', []] } },
              { $size: { $ifNull: ['$comments', []] } },
            ],
          },
        },
      },
      // delete allReplies field after it done its job:
      {
        $project: {
          allReplies: 0,
        },
      },
      // calc total number of likes for each post:
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ['$likes', []] } },
        },
      },
      // calc total number of dislikes for each post:
      {
        $addFields: {
          dislikesCount: { $size: { $ifNull: ['$dislikes', []] } },
        },
      },
      // subtract dislikes from likes to calculate popularity:
      {
        $addFields: {
          popularity: { $subtract: ['$likesCount', '$dislikesCount'] },
        },
      },
    ])

    if (post) {
      return new NextResponse(JSON.stringify(post), { status: 200 })
    } else {
      console.error('Post with provided UUID not found')
      return new NextResponse('Post not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error in fetching post:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

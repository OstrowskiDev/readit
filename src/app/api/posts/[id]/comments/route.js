import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Comment from '@/app/lib/models/Comment'
import validator from 'validator'

export const GET = async (request, { params }) => {
  const postId = params.id

  if (validator.isUUID(postId) || postId === 'about' || postId === 'credits') {
    console.log('postId is valid')
    try {
      await connectToDatabase()
      const posts = await Comment.aggregate([
        //find all comments that are descendants of the post:
        {
          $match: {
            'parent._id': postId,
          },
        },
        {
          $addFields: {
            parentComment: '$$ROOT',
          },
        },
        // get all replies from each parent comment:
        {
          $graphLookup: {
            from: 'comments',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parent._id',
            as: 'allReplies',
          },
        },

        {
          $addFields: {
            allComments: {
              $concatArrays: ['$allReplies', ['$parentComment']],
            },
          },
        },
        {
          $unwind: {
            path: '$allComments',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $replaceRoot: {
            newRoot: '$allComments',
          },
        },
        // count comment likes:
        {
          $addFields: {
            likesCount: { $size: { $ifNull: ['$likes', []] } },
          },
        },
        // count comment disLikes:
        {
          $addFields: {
            disLikesCount: { $size: { $ifNull: ['$disLikes', []] } },
          },
        },
        // count popularity:
        {
          $addFields: {
            popularity: {
              $subtract: ['$likesCount', '$disLikesCount'],
            },
          },
        },
        // add author data:
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
      ])
      return new NextResponse(JSON.stringify(posts), { status: 200 })
    } catch (error) {
      return new NextResponse('Error in fetching posts' + error, {
        status: 500,
      })
    }
  }
}

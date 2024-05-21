import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import sanitize from 'mongo-sanitize'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import User from '@/app/lib/models/User'

export async function GET(req, res) {
  // sanitize search parameters:

  const title = sanitize(req.nextUrl.searchParams.get('title'))
  if (title != null && (typeof title !== 'string' || title.length > 20)) {
    return new NextResponse(
      'Invalid input: Title must be a string of maximum 20 characters',
      { status: 400 },
    )
  }

  const content = sanitize(req.nextUrl.searchParams.get('content'))
  if (content != null && (typeof content !== 'string' || content.length > 50)) {
    return new NextResponse(
      'Invalid input: Content must be a string of maximum 50 characters',
      { status: 400 },
    )
  }

  const author = sanitize(req.nextUrl.searchParams.get('author'))
  if (author != null && (typeof author !== 'string' || author.length > 30)) {
    return new NextResponse(
      'Invalid input: Author must be a string of maximum 30 characters',
      { status: 400 },
    )
  }

  let sortBy = sanitize(req.nextUrl.searchParams.get('sortBy'))
  if (!['time', 'popularity'].includes(sortBy)) {
    sortBy = 'time'
  }

  let sortOrder = sanitize(req.nextUrl.searchParams.get('sortOrder'))
  if (!['ascending', 'descending'].includes(sortOrder)) {
    sortOrder = 'descending'
  }

  //create aggregation pipeline:

  let pipeline = []

  // get posts and comments based on favorites:
  // get userId and user document:

  const { data: session } = await getServerSession(authOptions)
  const userId = session.user.id
  // !!!! adding a hardcoded userId for testing purposes:
  // const userId = '9e75c601-4ef2-4e85-b7de-3eb3a88299b9'
  pipeline.push({ $match: { _id: userId } })

  // create field to store post IDs:
  pipeline.push({
    $addFields: {
      postIds: {
        $map: {
          input: {
            $filter: {
              input: '$favorites',
              as: 'favorite',
              cond: { $eq: ['$$favorite.type', 'post'] },
            },
          },
          as: 'post',
          in: '$$post._id',
        },
      },
    },
  })

  // create field to store comment IDs:
  pipeline.push({
    $addFields: {
      commentIds: {
        $map: {
          input: {
            $filter: {
              input: '$favorites',
              as: 'favorite',
              cond: { $eq: ['$$favorite.type', 'comment'] },
            },
          },
          as: 'comment',
          in: '$$comment._id',
        },
      },
    },
  })

  // Get comments:
  pipeline.push({
    $lookup: {
      from: 'comments',
      localField: 'commentIds',
      foreignField: '_id',
      as: 'favoriteComments',
    },
  })

  // Recursive lookup to find parent post for each comment:
  pipeline.push({
    $unwind: '$favoriteComments',
  })

  pipeline.push({
    $graphLookup: {
      from: 'comments',
      startWith: '$favoriteComments.parent._id',
      connectFromField: 'parent._id',
      connectToField: '_id',
      as: 'favoriteComments.parentPost',
      restrictSearchWithMatch: { 'parent.type': 'post' },
    },
  })

  pipeline.push({
    $unwind: {
      path: '$favoriteComments.parentPost',
      preserveNullAndEmptyArrays: true,
    },
  })

  pipeline.push({
    $addFields: {
      'favoriteComments.rootPostId': '$favoriteComments.parentPost._id',
    },
  })

  pipeline.push({
    $unset: 'favoriteComments.parentPost',
  })

  pipeline.push({
    $group: {
      _id: '$_id',
      postIds: { $first: '$postIds' },
      favoriteComments: { $push: '$favoriteComments' },
    },
  })

  pipeline.push({
    $addFields: {
      'favoriteComments.type': 'comment',
    },
  })

  // Get posts:
  pipeline.push({
    $lookup: {
      from: 'posts',
      localField: 'postIds',
      foreignField: '_id',
      as: 'favoritePosts',
    },
  })

  pipeline.push({
    $addFields: {
      'favoritePosts.type': 'post',
    },
  })

  // merge posts and comments into one array:
  pipeline.push({
    $project: {
      _id: 0,
      favorites: { $concatArrays: ['$favoritePosts', '$favoriteComments'] },
    },
  })

  // comments and posts needs to be on root level so later stages will work, also user data is not longer needed, so it should be deleted.

  // Unwind the favorites array to put posts and comments at the root level:
  pipeline.push({
    $unwind: '$favorites',
  })

  // make favorites the root of the document:
  pipeline.push({
    $replaceRoot: { newRoot: '$favorites' },
  })

  if (title) {
    pipeline.push({ $match: { title: { $regex: title, $options: 'i' } } })
  }
  if (content) {
    pipeline.push({ $match: { content: { $regex: content, $options: 'i' } } })
  }

  // create temporary fields for authors name and avatar:
  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: '_id',
      as: 'authorData',
    },
  })

  pipeline.push({
    $unwind: '$authorData',
  })

  pipeline.push({
    $project: {
      'authorData.password': 0,
      'authorData.address': 0,
      'authorData.email': 0,
      'authorData.phone': 0,
      'authorData.about': 0,
      'authorData.favorites': 0,
    },
  })

  if (author) {
    pipeline.push({
      $match: { 'authorData.name': { $regex: author, $options: 'i' } },
    })
  }

  // create additional fields for sorting
  // calc total number of likes for each document:
  pipeline.push({
    $addFields: {
      likesCount: { $size: { $ifNull: ['$likes', []] } },
    },
  })

  // calc total number of dislikes for each post:
  pipeline.push({
    $addFields: {
      dislikesCount: { $size: { $ifNull: ['$dislikes', []] } },
    },
  })

  // subtract dislikes from likes to calculate popularity:
  pipeline.push({
    $addFields: {
      popularity: { $subtract: ['$likesCount', '$dislikesCount'] },
    },
  })

  // sorting logic:
  if (sortBy === 'time' || sortBy === 'popularity') {
    let sortField
    switch (sortBy) {
      case 'time':
        sortField = 'createdAt'
        break
      case 'popularity':
        sortField = 'popularity'
        break
    }
    let sortDirection = sortOrder === 'ascending' ? 1 : -1
    pipeline.push({ $sort: { [sortField]: sortDirection } })
  }

  // execute aggregation pipeline:
  try {
    await connectToDatabase()
    const filteredDocuments = await User.aggregate(pipeline)
    return new NextResponse(JSON.stringify(filteredDocuments), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching posts' + error, { status: 500 })
  }
}

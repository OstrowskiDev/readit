import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'
import sanitize from 'mongo-sanitize'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'

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
  pipeline.push({ $match: { _id: userId } })

  // get posts:
  pipeline.push({
    $lookup: {
      from: 'posts',
      let: { favorites: '$favorites' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$type', 'post'] },
                { $in: ['$_id', '$$favorites._id'] },
              ],
            },
          },
        },
      ],
      as: 'favoritePosts',
    },
  })

  // get comments:
  pipeline.push({
    $lookup: {
      from: 'comments',
      let: { favorites: '$favorites' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$type', 'comment'] },
                { $in: ['$_id', '$$favorites._id'] },
              ],
            },
          },
        },
      ],
      as: 'favoriteComments',
    },
  })

  // merge posts and comments into one array:
  pipeline.push({
    $project: {
      favorites: { $concatArrays: ['$favoritePosts', '$favoriteComments'] },
    },
  })

  // comments and posts needs to be on root level so later stages will work, also user data is not longer needed, so it should be deleted.

  // Unwind the favorites array to put posts and comments at the root level:
  pipeline.push({
    $unwind: '$favorites',
  })

  // Replace the root of each document with the document in the favorites field:
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
    },
  })

  if (author) {
    pipeline.push({
      $match: { 'authorData.name': { $regex: author, $options: 'i' } },
    })
  }

  // create additional fields for sorting
  // get total number of replies for each post:
  pipeline.push({
    $graphLookup: {
      from: 'comments',
      startWith: '$comments',
      connectFromField: '_id',
      connectToField: 'parent._id',
      as: 'allReplies',
    },
  })

  // calc total number of comments for each post:
  pipeline.push({
    $addFields: {
      commentsCount: {
        $add: [
          { $size: { $ifNull: ['$allReplies', []] } },
          { $size: { $ifNull: ['$comments', []] } },
        ],
      },
    },
  })

  // delete allReplies field after is done its job:
  pipeline.push({
    $project: {
      allReplies: 0,
    },
  })

  // calc total number of likes for each post:
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
    const filteredPosts = await Post.aggregate(pipeline)
    return new NextResponse(JSON.stringify(filteredPosts), { status: 200 })
  } catch (error) {
    return new NextResponse('Error in fetching posts' + error, { status: 500 })
  }
}

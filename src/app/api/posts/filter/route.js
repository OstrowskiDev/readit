import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'

export async function GET(req, res) {
  const query = req.nextUrl.searchParams
  console.log(query)

  if (!query || !query.toString()) {
    return new NextResponse('Bad Request: No search params found in the URL', {
      status: 400,
    })
  }

  const title = req.nextUrl.searchParams.get('title')
  const content = req.nextUrl.searchParams.get('content')
  const author = req.nextUrl.searchParams.get('author')
  const sortBy = req.nextUrl.searchParams.get('sortBy')
  const sortOrder = req.nextUrl.searchParams.get('sortOrder')

  let pipeline = []

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
      'authorData._id': 0,
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
  if (sortBy === 'time' || sortBy === 'popularity' || sortBy === 'activity') {
    let sortField
    switch (sortBy) {
      case 'time':
        sortField = 'createdAt'
        break
      case 'popularity':
        sortField = 'popularity'
        break
      case 'activity':
        sortField = 'commentsCount'
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

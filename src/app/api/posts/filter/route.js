import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Post from '@/lib/models/Post'
import sanitize from 'mongo-sanitize'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'

export async function GET(req, res) {
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
  if (!['time', 'popularity', 'activity'].includes(sortBy)) {
    sortBy = 'time'
  }

  let sortOrder = sanitize(req.nextUrl.searchParams.get('sortOrder'))
  if (!['ascending', 'descending'].includes(sortOrder)) {
    sortOrder = 'descending'
  }

  let onlyCurrentUserPosts = req.nextUrl.searchParams.get(
    'onlyCurrentUserPosts',
  )
  onlyCurrentUserPosts = onlyCurrentUserPosts === 'true' ? true : false

  const displayedPostsAuthor = sanitize(
    req.nextUrl.searchParams.get('displayedPostsAuthor'),
  )

  let pipeline = []

  if (onlyCurrentUserPosts) {
    const session = await getServerSession(authOptions)
    if (session) {
      pipeline.push({ $match: { user_id: session.user.id } })
    } else {
      return new NextResponse('You must be logged in to view your posts', {
        status: 401,
      })
    }
  }

  if (displayedPostsAuthor) {
    pipeline.push({ $match: { user_id: displayedPostsAuthor } })
  }

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
      'authorData.activation_token': 0,
      'authorData.token_expires_at': 0,
      'authorData.is_active': 0,
      'authorData.recovery_token': 0,
      'authorData.recovery_token_expires_at': 0,
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

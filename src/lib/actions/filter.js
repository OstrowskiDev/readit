'use server'

import { connectToDatabase } from '@/lib/db'
import Post from '@/lib/models/Post'
import sanitize from 'mongo-sanitize'

export async function filterPosts({
  searchParams,
  showFavorites = false,
  forceAuthorName = null,
}) {
  const emptyResutls = { posts: [], postsCount: 0 }

  // !!!! delete onlyCurrentUserPosts from frontend, and handle it differently (onlyOneUserPosts + perma set author name)

  // !!!! also change displayedPostsAuthor on frontend

  // check if data is send from fastQuery or filter:
  const fastQuery = sanitize(searchParams.fastQuery)
  const useFastQuery = Boolean(fastQuery)

  // validate forceAuthorName
  if (typeof forceAuthorName !== 'string' || forceAuthorName.length > 20) {
    forceAuthorName = null
  }

  // pass proper data to title, content and author:
  const title = useFastQuery ? fastQuery : sanitize(searchParams.title)

  const content = useFastQuery ? fastQuery : sanitize(searchParams.content)

  const author =
    forceAuthorName ||
    (useFastQuery ? fastQuery : sanitize(searchParams.author))

  if (title != null && (typeof title !== 'string' || title.length > 20)) {
    return emptyResutls
  }

  if (content != null && (typeof content !== 'string' || content.length > 50)) {
    return emptyResutls
  }

  if (author != null && (typeof author !== 'string' || author.length > 30)) {
    return emptyResutls
  }

  let sortBy = sanitize(searchParams.sortBy)
  if (!['time', 'popularity', 'activity'].includes(sortBy)) {
    sortBy = 'time'
  }

  let sortOrder = sanitize(searchParams.sortOrder)
  if (!['ascending', 'descending'].includes(sortOrder)) {
    sortOrder = 'descending'
  }

  let pipeline = []

  // create temporary fields in posts documents to hold authorData:
  pipeline.push({
    $lookup: {
      from: 'users',
      let: { authorId: '$user_id' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', '$$authorId'] },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            avatar: 1,
            deleted: 1,
            createdAt: 1,
          },
        },
      ],
      as: 'authorData',
    },
  })

  pipeline.push({
    $unwind: '$authorData',
  })

  // force only one authors posts:
  // note `^${...}$` is used to force exact match

  if (forceAuthorName) {
    pipeline.push({
      $match: {
        'authorData.name': { $regex: `^${forceAuthorName}$`, $options: 'i' },
      },
    })
  }

  // create different matching conditions for fastQuery and filter:
  const conditions = []

  if (title) {
    conditions.push({ title: { $regex: title, $options: 'i' } })
  }
  if (content) {
    conditions.push({ content: { $regex: content, $options: 'i' } })
  }
  if (author) {
    conditions.push({ 'authorData.name': { $regex: author, $options: 'i' } })
  }

  if (conditions.length > 0) {
    pipeline.push({
      $match: useFastQuery ? { $or: conditions } : { $and: conditions },
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

  // saving pipeline resutls before using pagination logic:
  const basePipeline = [...pipeline]

  // pagination logic:
  let displayPage = Number(searchParams?.page)
  if (!Number.isInteger(displayPage) || displayPage < 1) {
    displayPage = 1
  }

  let postsPerPage = Number(searchParams?.limit)
  if (![10, 25, 50].includes(postsPerPage)) {
    postsPerPage = 10
  }

  const skipPosts = (displayPage - 1) * postsPerPage

  const paginatedPipeline = [
    ...basePipeline,
    { $skip: skipPosts },
    { $limit: postsPerPage },
  ]

  // merging basic and paginated pipelines for one mongoDB req:
  const finalPipeline = [
    {
      $facet: {
        posts: paginatedPipeline,
        postsCount: [...basePipeline, { $count: 'count' }],
      },
    },
  ]

  // execute aggregation pipeline:
  try {
    await connectToDatabase()
    const results = await Post.aggregate(finalPipeline)
    const posts = results[0].posts
    const postsCount = results[0].postsCount[0]?.count || 0
    return { posts, postsCount }
  } catch (error) {
    console.error('Error in fetching posts', error)
    return emptyResutls
  }
}

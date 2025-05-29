'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { connectToDatabase } from '@/lib/db'
import Post from '@/lib/models/Post'
import sanitize from 'mongo-sanitize'
import { getServerSession } from 'next-auth'
import User from '../models/User'

export async function filterPosts({
  searchParams,
  showFavorites = false,
  forceAuthorName = null,
}) {
  const emptyResults = { posts: [], postsCount: 0 }

  // check if data is send from fastQuery or filter:
  const fastQuery = sanitize(searchParams.fastQuery)
  const useFastQuery = Boolean(fastQuery)

  // validate forceAuthorName
  if (typeof forceAuthorName !== 'string' || forceAuthorName.length > 20) {
    forceAuthorName = null
  }

  // validate showFavorites
  if (typeof showFavorites !== 'boolean') showFavorites = false

  // pass proper data to title, content and author:
  const title = useFastQuery ? fastQuery : sanitize(searchParams.title)

  const content = useFastQuery ? fastQuery : sanitize(searchParams.content)

  const author =
    forceAuthorName ||
    (useFastQuery ? fastQuery : sanitize(searchParams.author))

  if (title != null && (typeof title !== 'string' || title.length > 20)) {
    return emptyResults
  }

  if (content != null && (typeof content !== 'string' || content.length > 50)) {
    return emptyResults
  }

  if (author != null && (typeof author !== 'string' || author.length > 30)) {
    return emptyResults
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

  // find users favorites:
  // User.favorites is array of objects {type: 'post', _id: string}
  if (showFavorites) {
    const session = await getServerSession(authOptions)
    if (!session) return emptyResults

    const user = await User.findById(session.user.id).lean()
    if (!user || !user?.favorites) return emptyResults
    // currently favorites can be type post only,
    // but check .type for future compatibility with other favorite.type's.
    const favoritePostIds = user.favorites
      .filter((fav) => fav.type === 'post')
      .map((fav) => fav._id)

    if (!favoritePostIds.length) return emptyResults

    pipeline.push({
      $match: { _id: { $in: favoritePostIds } },
    })
  }

  // create different matching conditions for fastQuery, filter and forceAuthorName:
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

  if (useFastQuery && forceAuthorName) {
    // (title || content) && author
    const titleOrContentConditions = []
    if (title)
      titleOrContentConditions.push({ title: { $regex: title, $options: 'i' } })
    if (content)
      titleOrContentConditions.push({
        content: { $regex: content, $options: 'i' },
      })
    if (titleOrContentConditions.length && author) {
      pipeline.push({
        $match: {
          $and: [
            { $or: titleOrContentConditions },
            // note: `^${...}$` below is used to force exact match
            // in all other cases partial match is used
            {
              'authorData.name': { $regex: `^${forceAuthorName}$` },
            },
          ],
        },
      })
    }
  } else if (useFastQuery) {
    // (title || content || author)
    if (conditions.length > 0) {
      pipeline.push({
        $match: { $or: conditions },
      })
    }
  } else {
    // (title && content && author)
    if (conditions.length > 0) {
      pipeline.push({
        $match: { $and: conditions },
      })
    }
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

  // saving pipeline results before using pagination logic:
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
    return emptyResults
  }
}

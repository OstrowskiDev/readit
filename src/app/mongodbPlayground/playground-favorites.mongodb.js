let title

let content

let author

let sortBy = 'time'

let sortOrder = 'descending'

//create aggregation pipeline:

let pipeline = []

// get posts and comments based on favorites:
// get userId and user document:

// const { data: session } = await getServerSession(authOptions)
// const userId = session.user.id
// adding a hardcoded userId for testing purposes:
const userId = '9e75c601-4ef2-4e85-b7de-3eb3a88299b9'
pipeline.push({ $match: { _id: userId } })

// Create field to store post IDs:
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

// Create field to store comment IDs:
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

// Get posts:
pipeline.push({
  $lookup: {
    from: 'posts',
    localField: 'postIds',
    foreignField: '_id',
    as: 'favoritePosts',
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

// // merge posts and comments into one array:
pipeline.push({
  $project: {
    _id: 0,
    favorites: { $concatArrays: ['$favoritePosts', '$favoriteComments'] },
  },
})

// // comments and posts needs to be on root level so later stages will work, also user data is not longer needed, so it should be deleted.

// //Unwind the favorites array to put posts and comments at the root level:
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

// // create temporary fields for authors name and avatar:
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
  },
})

if (author) {
  pipeline.push({
    $match: { 'authorData.name': { $regex: author, $options: 'i' } },
  })
}

// // create additional fields for sorting
// // calc total number of likes for each document:
pipeline.push({
  $addFields: {
    likesCount: { $size: { $ifNull: ['$likes', []] } },
  },
})

// // calc total number of dislikes for each post:
pipeline.push({
  $addFields: {
    dislikesCount: { $size: { $ifNull: ['$dislikes', []] } },
  },
})

// // subtract dislikes from likes to calculate popularity:
pipeline.push({
  $addFields: {
    popularity: { $subtract: ['$likesCount', '$dislikesCount'] },
  },
})

// // sorting logic:
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

db.getCollection('users').aggregate(pipeline)

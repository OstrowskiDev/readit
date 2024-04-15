db.posts.aggregate([
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
    $project: {
      _id: 1,
      totalComments: 1,
    },
  },
  // {
  //   "$group": {
  //     "_id": "$parent._id",
  //     "totalComments": { "$sum": 1 }
  //   }
  // },
  // {
  //   "$sort": { "totalComments": -1 }
  // },
  // {
  //   "$limit": 20
  // }
])

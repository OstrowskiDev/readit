db.getCollection('posts').aggregate([
  //find broken connection between post and comments

  // {
  //   $match: {
  //     _id: "17b88ac6-5d43-46f7-9b80-6fb2cbf930f0"
  //   }
  // },
  {
    $lookup: {
      from: 'comments',
      localField: 'comments',
      foreignField: '_id',
      as: 'postComments',
    },
  },
  {
    $project: {
      _id: 1,
      comments: 1,
      postComments: {
        $map: {
          input: '$postComments',
          as: 'comment',
          in: {
            _id: '$$comment._id',
            parent: '$$comment.parent',
          },
        },
      },
    },
  },
  {
    $addFields: {
      brokenComments: {
        $filter: {
          input: '$postComments',
          as: 'comment',
          cond: { $ne: ['$$comment.parent._id', '$_id'] },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      comments: 0,
      postComments: 0,
      'brokenComments.parent': 0,
    },
  },
  // {
  //   $project: {
  //     "brokenComments.parent": 0
  //   }
  // }
  {
    $match: {
      brokenComments: { $ne: [] },
    },
  },
])

Posts.aggregate([
  {
    $graphLookup: {
      from: 'Comments',
      startWith: '$comments',
      connectFromField: '_id',
      connectToField: 'parent._id',
      as: 'allComments',
    },
  },
  {
    $addFields: {
      totalComments: {
        $size: '$allComments',
      },
    },
  },
  {
    $group: {
      _id: '$_id',
      title: { $first: '$title' }, // Assuming you want to keep the title
      totalComments: { $sum: '$totalComments' },
    },
  },
])

// version two:
Posts.aggregate([
  {
    $lookup: {
      from: 'Comments',
      localField: '_id',
      foreignField: 'parent._id',
      as: 'comments',
    },
  },
  {
    $graphLookup: {
      from: 'Comments',
      startWith: '$comments._id',
      connectFromField: '_id',
      connectToField: 'parent._id',
      as: 'allComments',
    },
  },
  {
    $addFields: {
      totalComments: {
        $size: '$allComments',
      },
    },
  },
  {
    $group: {
      _id: '$_id',
      title: { $first: '$title' }, // Assuming you want to keep the title
      totalComments: { $sum: '$totalComments' },
    },
  },
])

//aggregation for
Posts.aggregate([
  {
    $lookup: {
      from: 'Comments',
      localField: '_id',
      foreignField: 'postId',
      as: 'comments',
    },
  },
  {
    $unwind: '$comments',
  },
  {
    $lookup: {
      from: 'Comments',
      localField: 'comments.replies',
      foreignField: '_id',
      as: 'replies',
    },
  },
  {
    $group: {
      _id: '$_id',
      totalComments: { $sum: 1 }, // Count comments for each post
      totalReplies: { $sum: { $size: '$replies' } }, // Count replies for each post
    },
  },
  // Optionally, add more stages for sorting, filtering, or projecting the results
])

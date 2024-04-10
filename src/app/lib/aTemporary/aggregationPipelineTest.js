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

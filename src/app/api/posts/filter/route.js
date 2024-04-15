import { connectToDatabase } from '@/app/lib/db'
import Post from '@/app/lib/models/Post'

export async function GET(req, res) {
  await connectToDatabase()

  const postsData = await Post.aggregate([
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
    {
      $sort: { totalComments: -1 },
    },
    {
      $limit: 20,
    },
  ])

  res.status(200).json(postsData)
}

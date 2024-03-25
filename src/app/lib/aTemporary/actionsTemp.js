'use server'

import Post from '../models/Post'

export async function addDate() {
  try {
    await Post.UpdateMany(
      { createdAt: { $exists: false } },
      {
        $set: {
          createdAt: {
            $subtract: [
              new Date(),
              { $multiply: [Math.random(), 30 * 24 * 60 * 60 * 1000] },
            ],
          },
        },
      },
    )
    console.log('successfully added date to post')
  } catch (error) {
    console.error('error adding date to post', error)
  }
}

export async function addDateToOne(postId) {
  console.log('logging post id:')
  console.log(postId)
  try {
    await Post.updateOne(
      { _id: postId, createdAt: { $exists: false } },
      {
        $set: {
          createdAt: {
            $subtract: [
              new Date(),
              { $multiply: [Math.random(), 30 * 24 * 60 * 60 * 1000] },
            ],
          },
        },
      },
    )
    console.log('Successfully added createdAt field to the post.')
  } catch (error) {
    console.error('Error adding createdAt field to the post:', error)
  }
}

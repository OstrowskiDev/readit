'use server'

import { connectToDatabase } from '../db'
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
    const updatedData = new Post({
      test: 'this is new value',
    })

    const result = await Post.updateOne(
      { _id: postId },
      { $set: { updatedData } },
    )

    if (result.modifiedCount === 1) {
      console.log('Successfully added createdAt field to the post.')
      console.log(result)
    } else {
      console.log('Post not found or not updated')
    }
  } catch (error) {
    console.error('Error adding createdAt field to the post:', error)
  }
}

// createdAt: {
//   $subtract: [
//     new Date(),
//     { $multiply: [Math.random(), 30 * 24 * 60 * 60 * 1000] },
//   ],
// },

'use server'

import Post from '../models/Post'

export async function addDateToPosts() {
  try {
    const posts = await Post.find({ createdAt: { $exists: false } })

    for (const post of posts) {
      const currentDate = new Date()
      const randomMilliseconds = Math.random() * (30 * 24 * 60 * 60 * 1000)
      const createdAt = new Date(currentDate.getTime() - randomMilliseconds)

      await Post.updateOne({ _id: post._id }, { $set: { createdAt } })
    }
    console.log('successfully added date to posts')
  } catch (error) {
    console.error('error adding date to post', error)
  }
}

export async function addDateToOne(postId) {
  console.log('logging post id:')
  console.log(postId)

  const currentDate = new Date()
  const randomMilliseconds = Math.random() * (30 * 24 * 60 * 60 * 1000)
  const subtractedDate = new Date(currentDate.getTime() - randomMilliseconds)

  const updatedData = new Post({
    createdAt: subtractedDate,
  })

  try {
    const result = await Post.updateOne({ _id: postId }, { $set: updatedData })

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

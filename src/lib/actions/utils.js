'use server'

import { isUUID } from 'validator'
import Post from '../models/Post'
import Comment from '../models/Comment'
import { connectToDatabase } from '../db'
import User from '../models/User'
import { returnToast, setToast, toast } from '../toasts/ToastUtils'

export async function getCommentsAndAuthors(postId) {
  if (!isUUID(postId)) {
    console.error('Invalid postId in getCommentsAndAuthors func')
    return [[], []]
  }

  const comments = []
  const authors = []

  const post = await Post.findOne({ _id: postId })
  if (!post || !post.comments) {
    console.log("Post not found or doesn't have comments")
    return [comments, authors]
  }

  const postChildrenIds = post.comments

  for (const postChildId of postChildrenIds) {
    await getCommentChildren(postChildId)
  }

  async function getCommentChildren(commentId) {
    const comment = await Comment.findOne({ _id: commentId })
    if (!comment || !comment.replies) {
      return
    }

    // convert Mongoose document to plain JS object
    // so it can be passed as props
    const plainComment = comment.toObject()
    comments.push(plainComment)

    const userId = comment.user_id
    if (!authors.find((user) => user._id === userId)) {
      const author = await User.findOne({ _id: userId })
      const plainAuthor = author.toObject()
      authors.push(plainAuthor)
    }

    const childrenIds = comment.replies
    for (const childId of childrenIds) {
      await getCommentChildren(childId)
    }
  }

  return [comments, authors]
}

export async function countUserPosts(userId) {
  try {
    const count = await Post.countDocuments({ user_id: userId })
    return count
  } catch (error) {
    console.error('Error occurred while counting user posts:', error)
    return null
  }
}

export async function countUserComments(userId) {
  try {
    const count = await Comment.countDocuments({ user_id: userId })
    return count
  } catch (error) {
    console.error('Error occurred while counting user comments:', error)
    return null
  }
}

export async function countPostComments(postId) {
  try {
    const count = await Comment.countDocuments({
      'parent.type': 'post',
      'parent._id': postId,
    })
    return count
  } catch (error) {
    console.error('Error occurred while counting post comments:', error)
    return null
  }
}

export async function getUserPostsIds(userId) {
  if (!isUUID(userId)) {
    console.error('Invalid userId in getUserPostsIds func')
    return null
  }
  try {
    const postsIds = await Post.find({ user_id: userId }).select('_id').lean()
    const postIdsArray = postsIds.map((post) => post._id)
    return postIdsArray
  } catch {
    console.error(`Error occurred while fetching posts id's`)
    return null
  }
}

export async function updateUserData(userObj) {
  if (!isUUID(userObj._id)) throw new Error('Invalid user id')

  try {
    const { _id, address, phone, about, avatar } = userObj

    await connectToDatabase()
    const user = await User.findById(_id)

    if (!user) {
      console.error('User with given _id not found')
      return returnToast('error', 'Failed to update user data')
    }

    user.address = address ?? user.address
    user.phone = phone ?? user.phone
    user.about = about ?? user.about
    user.avatar = avatar ?? user.avatar

    const updatedUser = await user.save()

    if (updatedUser) {
      console.log('User updated successfully')
      setToast('success', 'User data updated successfully!')
    } else {
      console.log(
        'Unexpected error: User.save() did not return a saved document or throw an error',
      )
      setToast('error', 'Failed to update user data!')
    }
  } catch (error) {
    console.error('Error updating user:', error)
    setToast('error', 'Failed to update user data!')
  }
  return toast
}

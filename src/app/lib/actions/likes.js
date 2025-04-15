'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '../db'
import { returnToast, setToast, toast } from '../toasts/ToastUtils'
import Post from '../models/Post'
import Comment from '../models/Comment'

function getOperationsData(userId) {
  return {
    'like-alreadyDisliked': {
      updateBody: { $pull: { dislikes: userId }, $push: { likes: userId } },
      successMessage: 'Like added successfully!',
      errorMessage: 'Error adding like!',
    },
    'like-alreadyLiked': {
      updateBody: { $pull: { likes: userId } },
      successMessage: 'Like removed successfully!',
      errorMessage: 'Error removing like!',
    },
    'like-none': {
      updateBody: { $push: { likes: userId } },
      successMessage: 'Like added successfully!',
      errorMessage: 'Error adding like!',
    },
    'dislike-alreadyLiked': {
      updateBody: { $pull: { likes: userId }, $push: { dislikes: userId } },
      successMessage: 'Dislike added successfully!',
      errorMessage: 'Error adding dislike!',
    },
    'dislike-alreadyDisliked': {
      updateBody: { $pull: { dislikes: userId } },
      successMessage: 'Dislike removed successfully!',
      errorMessage: 'Error removing dislike!',
    },
    'dislike-none': {
      updateBody: { $push: { dislikes: userId } },
      successMessage: 'Dislike added successfully!',
      errorMessage: 'Error adding dislike!',
    },
  }
}

export async function handlePostLike(postId, collection) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const post = await Post.findOne({ _id: postId })
  if (!post) {
    console.error('Post not found')
    return returnToast('error', 'Failed to update like')
  }
  const userId = session.user.id
  const alreadyLiked = post.likes?.includes(userId)
  const alreadyDisliked = post.dislikes?.includes(userId)
  const actionType = getActionType(collection, alreadyLiked, alreadyDisliked)
  const operationsData = getOperationsData(userId)
  const operation = operationsData[actionType]

  try {
    await connectToDatabase()
    const result = await Post.updateOne({ _id: postId }, operation.updateBody)
    setToast('success', operation.successMessage)

    if (!updateResult(result)) {
      console.error('Failed to update like/dislike collection in Post.')
      setToast('error', operation.errorMessage)
    }
  } catch (error) {
    console.error('Error updating document:', error)
    setToast('error', operation.errorMessage)
  }
  return { ...toast, wasDisliked: alreadyDisliked }
}

export async function handleCommentLike(commentId, collection) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const comment = await Comment.findOne({ _id: commentId })
  if (!comment) {
    console.error('Comment not found')
    return returnToast('error', 'Failed to update like')
  }
  const userId = session.user.id
  const alreadyLiked = comment.likes?.includes(userId)
  const alreadyDisliked = comment.dislikes?.includes(userId)
  const actionType = getActionType(collection, alreadyLiked, alreadyDisliked)
  const operationsData = getOperationsData(userId)
  const operation = operationsData[actionType]

  try {
    await connectToDatabase()
    const result = await Comment.updateOne(
      { _id: commentId },
      operation.updateBody,
    )
    setToast('success', operation.successMessage)

    if (!updateResult(result)) {
      console.error('Failed to update like/dislike collection in Comment.')
      setToast('error', operation.errorMessage)
    }
  } catch (error) {
    console.error('Error updating document:', error)
    setToast('error', operation.errorMessage)
  }
  return { ...toast, wasDisliked: alreadyDisliked }
}

function updateResult(result) {
  const wasSuccessful = result.acknowledged || result.matchedCount !== 0
  return wasSuccessful
}

function getActionType(collection, alreadyLiked, alreadyDisliked) {
  if (collection === 'like') {
    if (alreadyDisliked) return 'like-alreadyDisliked'
    if (alreadyLiked) return 'like-alreadyLiked'
    return 'like-none'
  }
  if (collection === 'dislike') {
    if (alreadyLiked) return 'dislike-alreadyLiked'
    if (alreadyDisliked) return 'dislike-alreadyDisliked'
    return 'dislike-none'
  }
}

'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { isUUID } from 'validator'
import { getUser } from '../db'
import User from '../models/User'
import allowedPostIds from '../security/allowedPostIds'
import { returnToast, setToast, toast } from '../toasts/ToastUtils'

export async function handlePostFavorites(postId) {
  if (!allowedPostIds.includes(postId) && !isUUID(postId)) {
    console.error('Invalid postId in handleFavoritesClick func')
    return returnToast('error', 'Failed updating favorites')
  }

  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = session.user.id
  const userDocument = await getUser(userId)
  const alreadyInFavorites = userDocument.favorites?.some(
    (favorite) => favorite._id === postId,
  )

  let updateResults

  try {
    if (!alreadyInFavorites) {
      const newFavorite = {
        _id: postId,
        type: 'post',
      }
      updateResults = await User.updateOne(
        { _id: userId },
        { $push: { favorites: newFavorite } },
      )
      setToast('success', 'Post added to favorites')
    } else {
      updateResults = await User.updateOne(
        { _id: userId },
        { $pull: { favorites: { _id: postId, type: 'post' } } },
      )
      setToast('success', 'Post removed from favorites')
    }
  } catch (error) {
    console.error(error)
    setToast('error', 'Failed to update favorites')
  }

  if (updateResults.modifiedCount === 1) {
    console.log('One param of document updated successfully')
  } else {
    console.log('Document not found or not updated')
    setToast('error', 'Failed to update favorites')
  }
  return toast
}

export async function handleCommentFavorites(commentId) {
  if (!isUUID(commentId)) {
    console.error('Invalid commentId in handleFavoritesClick func')
    return returnToast('error', 'Failed updating favorites')
  }

  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = session.user.id
  const userDocument = await getUser(userId)
  const alreadyInFavorites = userDocument.favorites?.some(
    (favorite) => favorite._id === commentId,
  )

  let updateResults

  try {
    if (!alreadyInFavorites) {
      const newFavorite = {
        _id: commentId,
        type: 'comment',
      }
      updateResults = await User.updateOne(
        { _id: userId },
        { $push: { favorites: newFavorite } },
      )
      setToast('success', 'Comment added to favorites')
    } else {
      updateResults = await User.updateOne(
        { _id: userId },
        { $pull: { favorites: { _id: commentId, type: 'comment' } } },
      )
      setToast('success', 'Comment removed from favorites')
    }
  } catch (error) {
    console.error(error)
    setToast('error', 'Failed to update favorites')
  }

  if (updateResults.modifiedCount === 1) {
    console.log('One param of document updated successfully')
  } else {
    console.log('Document not found or not updated')
    setToast('error', 'Failed to update favorites')
  }
  return toast
}

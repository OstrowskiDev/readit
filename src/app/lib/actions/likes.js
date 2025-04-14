'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '../db'
import { returnToast, setToast, toast } from '../toasts/ToastUtils'
import Post from '../models/Post'
import Comment from '../models/Comment'

export async function handleLikeClick(documentId, collection) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const document = await getDocument()
  if (!document) {
    console.error('likeComment func: document not found')
    return returnToast('error', 'Failed updating like')
  }
  const userId = session.user.id
  const alreadyLiked = document.likes?.includes(userId)
  const alreadyDisliked = document.dislikes?.includes(userId)

  try {
    await connectToDatabase()
    const result = await updateDocument()
    logResults(result)
  } catch (error) {
    console.error('Error updating document:', error)
    setToast('error', 'Failed updating like')
  }
  return { ...toast, wasDisliked: alreadyDisliked }

  async function updateDocument() {
    async function updateComment() {
      let updateResult
      if (alreadyDisliked) {
        updateResult = await Promise.all([
          Comment.updateOne(
            { _id: documentId },
            { $pull: { dislikes: userId } },
          ),
          Comment.updateOne({ _id: documentId }, { $push: { likes: userId } }),
        ])
        setToast('success', 'Like added successfully!')
      } else if (alreadyLiked) {
        updateResult = await Comment.updateOne(
          { _id: documentId },
          { $pull: { likes: userId } },
        )
        setToast('success', 'Like removed successfully!')
      } else {
        updateResult = await Comment.updateOne(
          { _id: documentId },
          { $push: { likes: userId } },
        )
        setToast('success', 'Like added successfully!')
      }
      return updateResult
    }
    async function updatePost() {
      let updateResult
      if (alreadyDisliked) {
        updateResult = await Promise.all([
          Post.updateOne({ _id: documentId }, { $pull: { dislikes: userId } }),
          Post.updateOne({ _id: documentId }, { $push: { likes: userId } }),
        ])
        setToast('success', 'Like added successfully!')
      } else if (alreadyLiked) {
        updateResult = await Post.updateOne(
          { _id: documentId },
          { $pull: { likes: userId } },
        )
        setToast('success', 'Like removed successfully!')
      } else {
        updateResult = await Post.updateOne(
          { _id: documentId },
          { $push: { likes: userId } },
        )
        setToast('success', 'Like added successfully!')
      }
      return updateResult
    }

    let updateResult
    if (collection === 'posts') {
      updateResult = await updatePost()
    } else if (collection === 'comments') {
      updateResult = await updateComment()
    } else {
      console.error('updateDocument called with invalid value of collection')
      setToast('error', 'Failed updating like')
      return
    }
    return updateResult
  }

  function logResults(result) {
    if (result[0]?.modifiedCount === 1 && result[1]?.modifiedCount === 1) {
      console.log('Two params of document updated successfully')
    } else if (result.modifiedCount === 1) {
      console.log('One param of document updated successfully')
    } else {
      console.error('Document not found or not updated')
      setToast('error', 'Failed to update like')
    }
  }

  async function getDocument() {
    let doc
    try {
      if (collection === 'posts') {
        doc = await Post.findOne({ _id: documentId })
      } else if (collection === 'comments') {
        doc = await Comment.findOne({ _id: documentId })
      } else {
        console.error('like func called with invalid value of collection prop')
      }
      return doc
    } catch (error) {
      console.error('Error occurred while finding document:', error)
    }
  }
}

export async function handleDislikeClick(documentId, collection) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const document = await getDocument()
  if (!document) {
    console.error('handleDislikeClick func: document not found')
    return returnToast('error', 'Failed updating dislike')
  }

  const userId = session.user.id
  const alreadyLiked = document.likes?.includes(userId)
  const alreadyDisliked = document.dislikes?.includes(userId)

  try {
    await connectToDatabase()
    const result = await updateDocument()
    logResults(result)
  } catch (error) {
    setToast('error', 'Failed updating dislike')
    console.error('Error updating comment:', error)
  }

  return { ...toast, wasLiked: alreadyLiked }

  async function updateDocument() {
    async function updateComment() {
      let updateResult
      if (alreadyLiked) {
        updateResult = await Promise.all([
          Comment.updateOne({ _id: documentId }, { $pull: { likes: userId } }),
          Comment.updateOne(
            { _id: documentId },
            { $push: { dislikes: userId } },
          ),
        ])
        setToast('success', 'Dislike added successfully!')
      } else if (alreadyDisliked) {
        updateResult = await Comment.updateOne(
          { _id: documentId },
          { $pull: { dislikes: userId } },
        )
        setToast('success', 'Dislike removed successfully!')
      } else {
        updateResult = await Comment.updateOne(
          { _id: documentId },
          { $push: { dislikes: userId } },
        )
        setToast('success', 'Dislike added successfully!')
      }
      return updateResult
    }
    async function updatePost() {
      let updateResult
      if (alreadyLiked) {
        updateResult = await Promise.all([
          Post.updateOne({ _id: documentId }, { $pull: { likes: userId } }),
          Post.updateOne({ _id: documentId }, { $push: { dislikes: userId } }),
        ])
        setToast('success', 'Dislike added successfully!')
      } else if (alreadyDisliked) {
        updateResult = await Post.updateOne(
          { _id: documentId },
          { $pull: { dislikes: userId } },
        )
        setToast('success', 'Dislike removed successfully!')
      } else {
        updateResult = await Post.updateOne(
          { _id: documentId },
          { $push: { dislikes: userId } },
        )
        setToast('success', 'Dislike added successfully!')
      }
      return updateResult
    }

    let updateResult
    if (collection === 'posts') {
      updateResult = await updatePost()
    } else if (collection === 'comments') {
      updateResult = await updateComment()
    } else {
      console.error('updateDocument called with invalid value of collection')
    }
    return updateResult
  }

  //!!!! need to refactor this monstrosity below
  //!!!! also its in few other paces
  function logResults(result) {
    if (result[0]?.modifiedCount === 1 && result[1]?.modifiedCount === 1) {
      console.log('Two params of document updated successfully')
    } else if (result.modifiedCount === 1) {
      console.log('One param of document updated successfully')
    } else {
      setToast('error', 'Failed updating dislike')
      console.error('Document not found or not updated')
    }
  }

  async function getDocument() {
    let doc
    try {
      if (collection === 'posts') {
        doc = await Post.findOne({ _id: documentId })
      } else if (collection === 'comments') {
        doc = await Comment.findOne({ _id: documentId })
      } else {
        console.error('like func called with invalid value of collection prop')
      }
      return doc
    } catch (error) {
      console.error('Error occurred while finding document:', error)
    }
  }
}

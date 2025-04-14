'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { isUUID } from 'validator'
import { connectToDatabase, getComment } from '../db'
import Comment from '../models/Comment'
import Post from '../models/Post'
import { validateCommentContent } from '../security/validateComment'
import { returnToast, setToast, toast } from '../toasts/ToastUtils'

export async function createComment(
  parentId,
  parentType,
  userInput,
  newCommentId,
) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const contentValidation = validateCommentContent(userInput)
  if (contentValidation.error) {
    return returnToast('error', `${contentValidation.error}`)
  }

  const content = contentValidation.sanitizedString

  const newComment = new Comment({
    _id: newCommentId,
    user_id: session.user.id,
    parent: {
      type: parentType,
      _id: parentId,
    },
    content: content,
    replies: [],
  })

  try {
    await connectToDatabase()
    await newComment.save()
  } catch (error) {
    console.error('Error saving comment:', error)
    return returnToast('error', 'Failed to create comment')
  }

  //update parent replies prop
  try {
    await connectToDatabase()
    const result =
      parentType === 'post'
        ? await Post.updateOne(
            { _id: parentId },
            { $push: { comments: newCommentId } },
          )
        : await Comment.updateOne(
            { _id: parentId },
            { $push: { replies: newCommentId } },
          )

    if (result.modifiedCount === 1) {
      setToast('success', `Comment created successfully!`)
      console.log(`${parentType} updated successfully`)
    } else {
      setToast('error', `Failed to create comment`)
      console.log(`${parentType} not found or not updated`)
    }
  } catch (error) {
    setToast('error', `Failed to create comment`)
    console.error(`Error updating {parentType}:`, error)
  }
  return { ...toast, newCommentId: newCommentId }
}

export async function deleteComment(commentId) {
  if (!isUUID(commentId))
    return returnToast('error', 'Failed to delete comment')

  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const commentData = await getComment(commentId)
  if (!commentData) {
    console.error('deleteComment func: document not found')
    return returnToast('error', 'Failed to delete comment')
  }

  const commentAuthorId = commentData.user_id
  if (session.user.id !== commentAuthorId) {
    console.error(
      "Warning! UserId doesn't match authorId inside deleteComment server function.",
    )
    return returnToast('error', 'Failed to delete comment')
  }

  const parentType = commentData.parent.type
  const parentId = commentData.parent._id
  const replies = commentData.replies
  const hasReplies = Boolean(replies) && replies.length !== 0

  // delete comment if it has no replies
  if (!hasReplies) {
    try {
      await connectToDatabase()
      const deleteComment = await Comment.findByIdAndDelete(commentId)
      if (!deleteComment) {
        console.error('deleteComment func: comment not found')
        return returnToast('error', 'Failed to delete comment')
      }
      console.log('Comment deleted successfully')
    } catch (error) {
      console.error('Error deleting comment:', error)
      return returnToast('error', 'Failed to delete comment')
    }

    //update parent children list
    try {
      await connectToDatabase()
      const result =
        parentType === 'comment'
          ? await Comment.updateOne(
              { _id: parentId },
              { $pull: { replies: commentId } },
            )
          : await Post.updateOne(
              { _id: parentId },
              { $pull: { comments: commentId } },
            )

      if (result.modifiedCount === 1) {
        console.log('Comment updated successfully')
        setToast('success', 'Comment deleted successfully!')
      } else {
        console.log('Comment not found or not updated')
        setToast('error', 'Failed to delete comment')
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      setToast('error', 'Failed to delete comment')
    }

    // !!!! soft delete when comment has replies
  } else {
    console.log("comment can't be deleted when it has replies")
    setToast('error', "Comment can't be deleted when it has replies")
    // !!!! change deleted flag to true
  }
  return toast
}

export async function updateComment(commentId, userInput) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const comment = await getComment(commentId)
  const authorId = comment.user_id
  if (session.user.id !== authorId) {
    console.log('User id does not match author id in updateComment func.')
    setToast('error', 'Failed to update comment!')
    return { ...toast, updatedCommentId: commentId }
  }

  const contentValidation = validateCommentContent(userInput)
  if (contentValidation.error) {
    return returnToast('error', `${contentValidation.error}`)
  }

  const content = contentValidation.sanitizedString

  const updatedData = new Comment({
    _id: commentId,
    content: content,
  })

  try {
    await connectToDatabase()
    const result = await Comment.updateOne(
      { _id: commentId },
      { $set: updatedData },
    )

    if (result.modifiedCount === 1) {
      console.log('Comment updated successfully')
      setToast('success', 'Comment updated successfully!')
    } else {
      console.log('Comment not found or not updated')
      setToast('error', 'Failed to update comment!')
    }
  } catch (error) {
    console.error('Error updating comment:', error)
    setToast('error', 'Failed to update comment!')
  }
  return { ...toast, updatedCommentId: commentId }
}

'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { validateCommentContent } from '../security/validateComment'
import { returnToast, setToast, toast } from '../toasts/ToastUtils'
import allowedPostIds from '@/lib/security/allowedPostIds'
import { connectToDatabase } from '../db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Comment from '../models/Comment'
import { isUUID } from 'validator'
import Post from '../models/Post'

export async function getComment(commentId) {
  if (!isUUID(commentId)) {
    console.error('Invalid UUID in getComment')
    return null
  }

  try {
    await connectToDatabase()
    const comment = await Comment.findOne({ _id: commentId }).lean()

    if (!comment) {
      console.error('Comment not found, commentId:', commentId)
      return null
    }

    return comment
  } catch (error) {
    console.error('Error in fetching comment:', error)
    return null
  }
}

export async function getPostCommentsData(postId) {
  if (!isUUID(postId) && !allowedPostIds.includes(postId)) {
    console.error('Invalid UUID in getPostCommentsData, UUID:', postId)
    return []
  }

  try {
    await connectToDatabase()
    const comments = await Comment.aggregate([
      //find all comments that are descendants of the post:
      {
        $match: {
          'parent._id': postId,
        },
      },
      {
        $addFields: {
          parentComment: '$$ROOT',
        },
      },
      // get all replies from each parent comment:
      {
        $graphLookup: {
          from: 'comments',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parent._id',
          as: 'allReplies',
        },
      },

      {
        $addFields: {
          allComments: {
            $concatArrays: ['$allReplies', ['$parentComment']],
          },
        },
      },
      {
        $unwind: {
          path: '$allComments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $replaceRoot: {
          newRoot: '$allComments',
        },
      },
      // count comment likes:
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ['$likes', []] } },
        },
      },
      // count comment disLikes:
      {
        $addFields: {
          disLikesCount: { $size: { $ifNull: ['$disLikes', []] } },
        },
      },
      // count popularity:
      {
        $addFields: {
          popularity: {
            $subtract: ['$likesCount', '$disLikesCount'],
          },
        },
      },
      // add author data:
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'authorData',
        },
      },
      { $unwind: '$authorData' },
      // !!!! change to whitelist
      {
        $project: {
          'authorData.password': 0,
          'authorData.address': 0,
          'authorData.email': 0,
          'authorData.phone': 0,
        },
      },
    ])

    if (!comments || comments.length === 0) return []
    return comments
  } catch (error) {
    console.error('Error in getPostCommentsData:', error)
    return []
  }
}

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

'use server'

import Post from './models/Post'
import Comment from './models/Comment'
import User from './models/User'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDatabase, getComment } from './db'
import { validatePostContent, validatePostTitle } from './validation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

let toastStatus
let toastMessage

export async function createPost(formData) {
  const session = await getServerSession(authOptions)
  const userId = session.user.id
  const uuid = uuidv4().toString()
  const inputTitle = formData.get('title')
  const title = validatePostTitle(inputTitle)
  const inputContent = formData.get('content')
  const content = validatePostContent(inputContent)

  const newPost = new Post({
    _id: uuid,
    title: title,
    user_id: userId,
    content: content,
  })

  try {
    await connectToDatabase()
    await newPost.save()
  } catch (error) {
    console.error('Error saving post:', error)
  }
  revalidatePath('/posts')
  redirect('/posts')
}

export async function updatePost(postId, formData) {
  const inputTitle = formData.get('title')
  const title = validatePostTitle(inputTitle)
  const inputContent = formData.get('content')
  const content = validatePostContent(inputContent)

  const updatedData = new Post({
    title: title,
    user_id: formData.get('user'),
    content: content,
  })

  try {
    await connectToDatabase()
    const result = await Post.updateOne({ _id: postId }, { $set: updatedData })

    if (result.modifiedCount === 1) {
      console.log('Post updated successfully')
    } else {
      console.log('Post not found or not updated')
    }
  } catch (error) {
    console.error('Error updating post:', error)
  }

  revalidatePath('/posts')
  redirect('/posts')
}

export async function deletePost(postId) {
  try {
    await connectToDatabase()
    const deletedPost = await Post.findByIdAndDelete(postId)
    if (!deletedPost) {
      console.error('Post not found')
    }
    console.log('Post deleted successfully')
  } catch (error) {
    console.error('Error deleting post:', error)
  }

  revalidatePath('/posts')
  redirect('/posts')
}

export async function createComment(parentId, postId, userInput, newCommentId) {
  const session = await getServerSession(authOptions)
  const content = validatePostContent(userInput)
  const parentIsPost = parentId === postId
  const documentType = parentIsPost ? 'post' : 'comment'

  resetToast()

  const newComment = new Comment({
    _id: newCommentId,
    user_id: session.user.id,
    parent: {
      type: documentType,
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
  }

  //update parent replies prop
  try {
    await connectToDatabase()
    const result = parentIsPost
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
      console.log(`${documentType} updated successfully`)
    } else {
      setToast('error', `Failed to create comment`)
      console.log(`${documentType} not found or not updated`)
    }
  } catch (error) {
    setToast('error', `Failed to create comment`)
    console.error(`Error updating {documentType}:`, error)
  }

  revalidatePath(`/posts/post/${postId}`)
  return {
    state: toastStatus,
    message: toastMessage,
    newCommentId: newCommentId,
  }
}

export async function deleteComment(commentId, postId) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const errorResponse = {
    state: 'error',
    message: 'Failed to delete comment',
  }

  const commentData = await getComment(commentId)
  if (!commentData) {
    console.error('deleteComment func: document not found')
    return errorResponse
  }

  const commentAuthorId = commentData.user_id
  if (session.user.id !== commentAuthorId) {
    console.error(
      "Warning! UserId dosen't match authorId inside deleteComment server function.",
    )
    return errorResponse
  }

  const parentType = commentData.parent.type
  const parentId = commentData.parent._id
  const replies = commentData.replies
  const hasReplies = Boolean(replies) && replies.length !== 0

  resetToast()

  // delete comment if it has no replies
  if (!hasReplies) {
    try {
      await connectToDatabase()
      const deleteComment = await Comment.findByIdAndDelete(commentId)
      if (!deleteComment) {
        console.error('deleteComment func: comment not found')
        return errorResponse
      }
      console.log('Comment deleted successfully')
    } catch (error) {
      console.error('Error deleting comment:', error)
      return errorResponse
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
        setToast('success', 'Comment deleted successfully')
      } else {
        console.log('Comment not found or not updated')
        setToast('error', 'Failed to delete comment')
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      setToast('error', 'Failed to delete comment')
    }

    // soft delete when comment has replies
  } else {
    console.log("comment can't be deleted when it has replies")
    setToast('error', "Comment can't be deleted when it has replies")

    // chenge deleted flag to true
    // dont update comment or post children array:
    // comment was not perma deleted so no need
  }
  return { state: toastStatus, message: toastMessage }
}

export async function updateComment(commentId, postId, userInput) {
  const session = await getServerSession(authOptions)
  const comment = await getComment(commentId)
  const authorId = comment.user_id
  if (!session) redirect('/login')
  if (session.user.id !== authorId) {
    console.log(
      "Warning! During update comment operation user id doesn't match author id.",
    )
    return {
      state: 'error',
      message: 'Failed to update comment!',
      updatedCommentId: commentId,
    }
  }

  const content = validatePostContent(userInput)

  resetToast()

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

  revalidatePath(`/posts/post/${postId}`)
  return {
    state: toastStatus,
    message: toastMessage,
    updatedCommentId: commentId,
  }
}

export async function handleLikeClick(documentId, postId, collection) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  resetToast()

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
    setToast('error', 'Failed updating like')
    console.error('Error updating document:', error)
  }

  revalidatePath(`/posts/post/${postId}`)
  return {
    state: toastStatus,
    message: toastMessage,
    wasDisliked: alreadyDisliked,
  }

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
      setToast('error', 'Failed updating like')
      console.error('updateDocument called with invalid value of collection')
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
      console.log('Document not found or not updated')
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
    } catch {
      console.error('Error occurred while finding document:', error)
    }
  }
}

export async function handleDislikeClick(documentId, postId, collection) {
  const session = await getServerSession(authOptions)
  if (!session) signIn()

  resetToast()

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

  revalidatePath(`/posts/post/${postId}`)
  return {
    state: toastStatus,
    message: toastMessage,
    wasLiked: alreadyLiked,
  }

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

export async function getCommentsAndAuthors(postId) {
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

function setToast(status, message) {
  toastStatus = status
  toastMessage = message
}

function resetToast() {
  toastStatus = ''
  toastMessage = ''
}

function returnToast(status, message) {
  return { state: status, message: message }
}

export async function countUserPosts(userId) {
  console.log('Counting users posts...')
  try {
    const count = await Post.countDocuments({ user_id: userId })
    return count
  } catch (error) {
    console.error('Error occured while counting user posts:', error)
    return '-'
  }
}

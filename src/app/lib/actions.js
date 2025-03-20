'use server'

import Post from './models/Post'
import Comment from './models/Comment'
import User from './models/User'
import { redirect } from 'next/navigation'
import { connectToDatabase, getComment, getUser } from './db'
import { validatePostContent, validatePostTitle } from './validation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { isUUID } from 'validator'
import { toast, setToast, returnToast } from './toasts/ToastUtils'

export async function createPost(inputTitle, inputContent, uuid) {
  const session = await getServerSession(authOptions)
  const userId = session.user.id
  const isValidUUID = isUUID(uuid)
  if (!isValidUUID) {
    console.error('Invalid postId in createPost func')
    return returnToast('error', 'Failed to create post')
  }
  const title = validatePostTitle(inputTitle)
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
    setToast('success', 'Post created successfully!')
  } catch (error) {
    console.error('Error saving post:', error)
    setToast('error', 'Failed to create post')
  }
  return { ...toast, postId: uuid }
}

export async function updatePost(postId, formData) {
  const session = await getServerSession(authOptions)
  let oldPost
  try {
    oldPost = await Post.findOne({ _id: postId })
  } catch (error) {
    console.error('Error during fetching post for updatePost func:', error)
    return returnToast('error', 'Failed to update post')
  }

  if (session.user.id !== oldPost.user_id) {
    console.error(
      "Error updating post. User session Id doesn't match post author Id.",
    )
    return returnToast('error', 'Failed to update post')
  }
  const inputTitle = formData.title
  const title = validatePostTitle(inputTitle)
  const inputContent = formData.content
  const content = validatePostContent(inputContent)

  const updatedData = new Post({
    title: title,
    content: content,
  })

  try {
    await connectToDatabase()
    const result = await Post.updateOne({ _id: postId }, { $set: updatedData })

    if (result.modifiedCount === 1) {
      console.log('Post updated successfully')
      setToast('success', 'Post updated successfully!')
    } else {
      console.log('Post not found or not updated')
      setToast('error', 'Failed to update post')
    }
  } catch (error) {
    console.error('Error updating post:', error)
    setToast('error', 'Failed to update post')
  }
  return toast
}

export async function deletePost(postId) {
  if (!isUUID(postId)) {
    console.error('Invalid postId in deletePost func')
    return returnToast('error', 'Failed to delete post')
  }

  try {
    await connectToDatabase()
    const post = await Post.findOne({ _id: postId })
    if (!post) {
      console.error('Post not found')
      return returnToast('error', 'Failed to delete post')
    }
    if (post.comments && post.comments.length > 0) {
      console.error('Post with comments cannot be deleted')
      return returnToast('error', 'Post with comments cannot be deleted')
    }

    const deletedPost = await Post.findByIdAndDelete(postId)
    if (!deletedPost) {
      console.error('Post not found')
      setToast('error', 'Failed to delete post')
    }
    console.log('Post deleted successfully')
    setToast('success', 'Post deleted successfully!')
  } catch (error) {
    console.error('Error deleting post:', error)
    setToast('error', 'Failed to delete post')
  }
  return toast
}

export async function createComment(
  parentId,
  parentType,
  userInput,
  newCommentId,
) {
  const session = await getServerSession(authOptions)
  const content = validatePostContent(userInput)

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
  if (!session) {
    redirect('/login')
  }

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
        setToast('success', 'Comment deleted successfully')
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
  const comment = await getComment(commentId)
  const authorId = comment.user_id
  if (!session) redirect('/login')
  if (session.user.id !== authorId) {
    console.log(
      "Warning! During update comment operation user id doesn't match author id.",
    )
    setToast('error', 'Failed to update comment!')
    return { ...toast, updatedCommentId: commentId }
  }

  const content = validatePostContent(userInput)

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
      console.log('Document not found or not updated')
      setToast('error', 'Failed to update like')
    }
  }

  async function getDocument() {
    console.log('documentId:', documentId)
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
    console.log('documentId:', documentId)
    console.log('collection:', collection)
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
    const { _id, name, email, address, phone, about, avatar } = userObj

    await connectToDatabase()
    const user = await User.findById(_id)

    if (!user) {
      console.error('User with given _id not found')
      return returnToast('error', 'Failed to update user data')
    }

    user.name = name || user.name
    user.email = email || user.email
    user.address = address || user.address
    user.phone = phone || user.phone
    user.about = about || user.about
    user.avatar = avatar || user.avatar

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

export async function handlePostFavorites(postId) {
  if (postId !== 'about' && postId !== 'credits' && !isUUID(postId)) {
    console.error('Invalid postId in handleFavoritesClick func')
    return returnToast('error', 'Failed updating favorites')
  }

  const session = await getServerSession(authOptions)
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
      setToast('success', 'post added to favorites')
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

'use server'

import Post from './models/Post'
import Comment from './models/Comment'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDatabase, getComment } from './db'
import { validatePostContent, validatePostTitle } from './validation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

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
    'user-id': userId,
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
    'user-id': formData.get('user'),
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

export async function createComment(parentId, postId, userInput) {
  const session = await getServerSession(authOptions)
  const uuid = uuidv4().toString()
  const content = validatePostContent(userInput)
  const newCommentId = uuid
  const parentIsPost = parentId === postId

  const newComment = new Comment({
    _id: newCommentId,
    user_id: session.user.id,
    parent: {
      type: 'comment',
      _id: parentId,
    },
    content: content,
    replies: [],
  })

  console.log(parentIsPost)
  if (parentIsPost) newComment.parent.type = 'post'
  console.log(newComment)

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
      ? await Post.updateOne({ _id: parentId }, { $push: { comments: newCommentId } })
      : await Comment.updateOne({ _id: parentId }, { $push: { replies: newCommentId } })

    if (result.modifiedCount === 1) {
      console.log('Post/Comment updated successfully')
    } else {
      console.log('Post/Comment not found or not updated')
    }
  } catch (error) {
    console.error('Error updating post/comment:', error)
  }

  revalidatePath(`/posts/post/${postId}`)
  redirect(`/posts/post/${postId}`)
}

export async function deleteComment(commentId, postId) {
  const commentData = await getComment(commentId)
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
        console.error('Comment not found')
      }
      console.log('Comment deleted successfully')
    } catch (error) {
      console.error('Error deleting comment:', error)
    }

    //update parent children list
    try {
      await connectToDatabase()
      const result =
        parentType === 'comment'
          ? await Comment.updateOne({ _id: parentId }, { $pull: { replies: commentId } })
          : await Post.updateOne({ _id: parentId }, { $pull: { comments: commentId } })

      if (result.modifiedCount === 1) {
        console.log('Comment updated successfully')
      } else {
        console.log('Comment not found or not updated')
      }
    } catch (error) {
      console.error('Error updating comment:', error)
    }

    // soft delete when comment has replies
  } else {
    console.log("comment can't be deleted when it has replies")
    // chenge deleted flag to true
    // dont update comment or post children array:
    // comment was not perma deleted so no need
  }

  revalidatePath(`/posts/post/${postId}`)
  redirect(`/posts/post/${postId}`)
}

export async function updateComment(commentId, postId, userInput) {
  const content = validatePostContent(userInput)

  const updatedData = new Comment({
    _id: commentId,
    content: content,
  })

  try {
    await connectToDatabase()
    const result = await Comment.updateOne({ _id: commentId }, { $set: updatedData })

    if (result.modifiedCount === 1) {
      console.log('Comment updated successfully')
    } else {
      console.log('Comment not found or not updated')
    }
  } catch (error) {
    console.error('Error updating comment:', error)
  }

  revalidatePath(`/posts/post/${postId}`)
  redirect(`/posts/post/${postId}`)
}

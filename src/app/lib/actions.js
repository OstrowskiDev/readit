'use server'

import Post from './models/Post'
import Comment from './models/Comment'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDatabase } from './db'
import { validatePostContent, validatePostTitle } from './validation'

export async function createPost(formData) {
  const uuid = uuidv4().toString()
  const inputTitle = formData.get('title')
  const title = validatePostTitle(inputTitle)
  const inputContent = formData.get('content')
  const content = validatePostContent(inputContent)

  const newPost = new Post({
    _id: uuid,
    title: title,
    'user-id': formData.get('user'),
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

export async function createReply(parentId, postId, userInput) {
  const uuid = uuidv4().toString()
  const content = validatePostContent(userInput)
  const newReplyId = uuid

  const newReply = new Comment({
    _id: newReplyId,
    user_id: 'ad4fc3a1-0e2c-46e8-9d31-d3d2c66d9ac2',
    parent: {
      type: 'comment',
      _id: parentId,
    },
    content: content,
    replies: [],
  })
  try {
    await connectToDatabase()
    await newReply.save()
  } catch (error) {
    console.error('Error saving post:', error)
  }

  //update parent replies prop
  try {
    await connectToDatabase()
    const result = await Comment.updateOne({ _id: parentId }, { $push: { replies: newReplyId } })

    if (result.modifiedCount === 1) {
      console.log('Post updated successfully')
    } else {
      console.log('Post not found or not updated')
    }
  } catch (error) {
    console.error('Error updating post:', error)
  }

  revalidatePath(`/posts/post/${postId}`)
  redirect(`/posts/post/${postId}`)
}

export async function deleteComment(commentId, postId) {
  //delete comment
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
    const result = await Comment.updateOne({ _id: parentId }, { $pull: { replies: commentId } })

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

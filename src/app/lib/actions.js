'use server'

import Post from './models/Post'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDatabase } from './db'
import { validatePostTitle } from './validation'

export async function createPost(formData) {
  try {
    await connectToDatabase()
    const uuid = uuidv4().toString()

    const inputTitle = formData.get('title')
    const title = validatePostTitle(inputTitle)

    const newPost = new Post({
      _id: uuid,
      title: title,
      'user-id': formData.get('user'),
      content: formData.get('content'),
    })
    await newPost.save()
  } catch (error) {
    console.error('Error saving post:', error)
  }
  revalidatePath('/posts')
  redirect('/posts')
}

export async function updatePost(postId, formData) {
  const updatedData = new Post({
    title: formData.get('title'),
    'user-id': formData.get('user'),
    content: formData.get('content'),
  })

  try {
    await connectToDatabase()
    const result = await Post.updateOne({ _id: postId }, { $set: updatedData })

    if (result.nModified === 1) {
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

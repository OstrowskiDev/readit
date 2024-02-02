'use server'

import Post from './models/Post'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDatabase } from './db'

export async function createPost(formData) {
  try {
    await connectToDatabase()
    const uuid = uuidv4().toString()
    const newPost = new Post({
      _id: uuid,
      title: formData.get('title'),
      'user-id': formData.get('user'),
      content: formData.get('content'),
    })
    console.log(formData)
    console.log(newPost)
    await newPost.save()
    revalidatePath('/posts')
    redirect('/posts')
  } catch (error) {
    console.error('Error saving post:', error)
  }
}

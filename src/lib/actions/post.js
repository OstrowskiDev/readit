'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { isUUID } from 'validator'
import { connectToDatabase } from '../db'
import Post from '../models/Post'
import allowedPostIds from '../security/allowedPostIds'
import { getAuthCookies } from '../security/getAuthCookies'
import { hasErrors } from '../security/hasErrors'
import validateImageFileServer from '../security/validateImageFileServer'
import { validatePost } from '../security/validatePost'
import { returnToast, setToast, toast } from '../toasts/ToastUtils'

export async function createPost(inputTitle, inputContent, uuid, hasImage) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = session.user.id
  const isValidUUID = isUUID(uuid)
  if (!isValidUUID) {
    console.error('Invalid postId in createPost func')
    return returnToast('error', 'Failed to create post')
  }

  if (typeof hasImage != 'boolean') {
    return returnToast('error', 'Failed to create post.')
  }

  const postData = { title: inputTitle, content: inputContent }
  const validationResults = validatePost(postData)
  if (hasErrors(validationResults)) {
    return returnToast('error', 'Failed to create post.')
  }

  const title = validationResults.title.sanitized
  const content = validationResults.content.sanitized
  const newPost = new Post({
    _id: uuid,
    title: title,
    user_id: userId,
    content: content,
    has_image: hasImage,
    image_extension: 'webp',
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

export async function updatePost(postId, formData, imageData) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

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

  // text data validation

  const validationResults = validatePost(formData)
  if (hasErrors(validationResults)) {
    console.error('Post update data failed validation')
    return returnToast('error', 'Failed to update post')
  }

  const title = validationResults.title.sanitized
  const content = validationResults.content.sanitized

  // post image file handling

  const imageStatus = imageData.get('imageStatus')
  const file = imageData.get('file')
  console.log('typeof file:', typeof file)
  console.log('file instanceof File:', file instanceof File)
  console.log('file keys:', file && Object.keys(file))
  console.log('imageStatus from imageData:', imageStatus)
  console.log('file from imageData:', file)
  const cookieStorage = cookies()
  const cookieHeader = getAuthCookies(cookieStorage)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  if (imageStatus === 'new') {
    const results = await validateImageFileServer(file)
    console.log('🚀 ~ updatePost ~ file:', file)
    console.log('🚀 ~ updatePost ~ results:', results)
    console.log('🚀 ~ updatePost ~ results.type:', results?.type)
    console.log('🚀 ~ updatePost ~ results.size:', results?.size)
    if (!results.type || !results.size) {
      return returnToast('error', 'Failed to update post')
    }
    const imageUpdate = await fetch(`${baseUrl}/api/images/${postId}.webp`, {
      method: 'PUT',
      body: imageData,
      headers: {
        Cookie: cookieHeader,
      },
    })
    console.log('🚀 ~ updatePost ~ imageUpdate:', imageUpdate)
    console.log('🚀 ~ updatePost ~ imageUpdate.status:', imageUpdate.status)

    if (imageUpdate.status === 401) {
      return NextResponse.redirect(new URL(`${baseUrl}/login`))
    }

    if (imageUpdate.status !== 200) {
      console.error(
        'Failed to update image in R2 bucket, status:',
        imageUpdate.status,
      )
      return returnToast('error', 'Failed to update post')
    }
  }

  if (imageStatus === 'delete') {
    const imageUpdate = await fetch(`${baseUrl}/api/images/${postId}.webp`, {
      method: 'DELETE',
      headers: {
        Cookie: cookieHeader,
      },
    })
    if (imageUpdate.status === 401) {
      return NextResponse.redirect(new URL(`${baseUrl}/login`))
    }
    if (imageUpdate.status !== 200) {
      console.error(
        'Failed to delete image in R2 bucket, status:',
        imageUpdate.status,
      )
      return returnToast('error', 'Failed to update post')
    }
  }

  // Post mongoDB document update

  const hasImage = imageStatus !== 'delete' ? true : false
  const imageExtension = imageStatus !== 'delete' ? 'webp' : ''

  const updatedData = new Post({
    title: title,
    content: content,
    has_image: hasImage,
    image_extension: imageExtension,
  })

  try {
    await connectToDatabase()
    const result = await Post.updateOne({ _id: postId }, { $set: updatedData })

    if (result.modifiedCount === 1) {
      console.log('Post updated successfully')
      return returnToast('success', 'Post updated successfully!')
    } else {
      console.error('Post not found or not updated')
      return returnToast('error', 'Failed to update post')
    }
  } catch (error) {
    console.error('Error updating post:', error)
    return returnToast('error', 'Failed to update post')
  }
}

export async function deletePost(postId) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  if (!isUUID(postId) && !allowedPostIds.includes(postId)) {
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

    if (session.user.id !== post.user_id) {
      console.error("User session ID doesn't match post author ID.")
      return returnToast('error', 'Failed to delete post')
    }

    if (post.comments && post.comments.length > 0) {
      console.error('Post with comments cannot be deleted')
      return returnToast('error', 'Post with comments cannot be deleted')
    }

    if (post.has_image) {
      const cookieStorage = cookies()
      const cookieHeader = getAuthCookies(cookieStorage)
      const baseId = process.env.NEXT_PUBLIC_APP_URL
      const deleteImage = await fetch(`${baseId}/api/images/${postId}.webp`, {
        method: 'DELETE',
        headers: {
          cookie: cookieHeader,
        },
      })
      if (deleteImage.status !== 200) {
        console.error(
          'Error deleting image in R2 bucket, response:',
          deleteImage,
        )
        return returnToast('error', 'Failed to delete post')
      }
    }

    const deletedPost = await Post.findByIdAndDelete(postId)
    if (!deletedPost) {
      console.error('Post not found')
      return returnToast('error', 'Failed to delete post')
    }
    console.log('Post deleted successfully')
    return returnToast('success', 'Post deleted successfully!')
  } catch (error) {
    console.error('Error deleting post:', error)
    return returnToast('error', 'Failed to delete post')
  }
}

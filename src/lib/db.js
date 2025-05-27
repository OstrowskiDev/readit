import mongoose from 'mongoose'

const uri = process.env.DB_CONNECT
const apiUrl = process.env.NEXT_PUBLIC_APP_URL

export async function connectToDatabase() {
  if (mongoose.connections[0].readyState) return
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
    throw new Error('Error in connecting to mongodb')
  }
}

//!!!! change res.json to NextResponse
// api routes to check/delete:
// done: /api/posts/post/[postId]
// done: api/posts/[Id]/comments   // /api/posts/${postId}/comments
// done: /api/users/user/${userId}    // /api/users/user/[id]
// /api/users/user/private/${userId}    // /api/users/user/private/[id]

export async function getComment(commentId) {
  const res = await fetch(`${apiUrl}/api/comments/comment/${commentId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function getData() {
  try {
    const fetchedData = await Promise.all([getPosts(), getUsers()])
    return fetchedData
  } catch (error) {
    console.error('Error fetching posts and/or users:', error)
    return null
  }
}

export async function getPosts() {
  const res = await fetch('${apiUrl}/api/posts', {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function filterPosts(params) {
  const queryString = new URLSearchParams(params).toString()

  const res = await fetch(`/api/posts/filter?${queryString}`, {
    method: 'GET',
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function filterFavorites(params) {
  const queryString = new URLSearchParams(params).toString()

  const res = await fetch(`/api/posts/favorites/filter?${queryString}`, {
    method: 'GET',
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export async function getUsers() {
  const res = await fetch('${apiUrl}/api/users', {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

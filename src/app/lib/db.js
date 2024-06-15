import mongoose from 'mongoose'

const uri = process.env.DB_CONNECT
const apiUrl = process.env.NEXT_PUBLIC_APP_URL

async function connectToDatabase() {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
    throw new Error('Error in connecting to mongodb')
  }
}

async function getPost(postId) {
  console.log(`fetching post ${postId} from database...`)
  const res = await fetch(`${apiUrl}/api/posts/post/${postId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = await res.json()
  return json[0]
}

async function getPostData(postId) {
  console.log(`fetching post ${postId} from database...`)
  const res = await fetch(`${apiUrl}/api/posts/post/${postId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  const json = await res.json()
  return json[0]
}

async function getPostCommentsData(postId) {
  const res = await fetch(`${apiUrl}/api/posts/${postId}/comments`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getUser(userId) {
  const res = await fetch(`${apiUrl}/api/users/user/${userId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getUserPrivate(userId) {
  const res = await fetch(`${apiUrl}/api/users/user/private/${userId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getComment(commentId) {
  const res = await fetch(`${apiUrl}/api/comments/comment/${commentId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getUserByEmail(email) {
  const res = await fetch(`${apiUrl}/api/users/user/email/${email}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getData() {
  try {
    const fetchedData = await Promise.all([getPosts(), getUsers()])
    return fetchedData
  } catch (error) {
    console.error('Error fetching posts and/or users:', error)
    return null
  }
}

async function getPosts() {
  const res = await fetch('${apiUrl}/api/posts', {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function filterPosts(params) {
  const queryString = new URLSearchParams(params).toString()

  const res = await fetch(`/api/posts/filter?${queryString}`, {
    method: 'GET',
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function filterFavorites(params) {
  const queryString = new URLSearchParams(params).toString()

  const res = await fetch(`/api/posts/favorites/filter?${queryString}`, {
    method: 'GET',
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getUsers() {
  const res = await fetch('${apiUrl}/api/users', {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export {
  connectToDatabase,
  getPost,
  getPostData,
  getPostCommentsData,
  filterPosts,
  filterFavorites,
  getUser,
  getUserPrivate,
  getComment,
  getPosts,
  getUsers,
  getData,
  getUserByEmail,
}

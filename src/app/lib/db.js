import mongoose from 'mongoose'

const uri = process.env.DB_CONNECT

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
  const res = await fetch(`http://localhost:3000/api/posts/post/${postId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getUser(userId) {
  const res = await fetch(`http://localhost:3000/api/users/user/${userId}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getComment(commentId) {
  const res = await fetch(
    `http://localhost:3000/api/comments/comment/${commentId}`,
    {
      cache: 'no-store',
    },
  )
  if (!res.ok) return null
  return res.json()
}

async function getUserByEmail(email) {
  const res = await fetch(
    `http://localhost:3000/api/users/user/email/${email}`,
    {
      cache: 'no-store',
    },
  )
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
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export {
  connectToDatabase,
  getPost,
  getUser,
  getComment,
  getPosts,
  getUsers,
  getData,
  getUserByEmail,
}

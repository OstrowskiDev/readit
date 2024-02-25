import mongoose from 'mongoose'
import { notFound } from 'next/navigation'

const uri = process.env.DB_CONNECT

async function connectToDatabase() {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    throw new Error('Error in connecting to mongodb')
  }
}

async function getPost(postId) {
  const res = await fetch(`http://localhost:3000/api/posts/post/${postId}`, { cache: 'no-store' })
  if (!res.ok) return notFound()
  return res.json()
}

async function getUser(userId) {
  const res = await fetch(`http://localhost:3000/api/users/user/${userId}`, { cache: 'no-store' })
  if (!res.ok) return notFound()
  return res.json()
}

async function getUserByEmail(email) {
  const res = await fetch(`http://localhost:3000/api/users/user/email/${email}`, {
    cache: 'no-store',
  })
  if (!res.ok) return notFound()
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
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' })
  if (!res.ok) return notFound()
  return res.json()
}

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' })
  if (!res.ok) return notFound()
  return res.json()
}

export { connectToDatabase, getPost, getUser, getPosts, getUsers, getData, getUserByEmail }

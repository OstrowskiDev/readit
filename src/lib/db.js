'use server'

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

export async function filterFavorites(params) {
  const queryString = new URLSearchParams(params).toString()

  const res = await fetch(`/api/posts/favorites/filter?${queryString}`, {
    method: 'GET',
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

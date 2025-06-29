'use server'

import { connectToDatabase } from '../db'
import validator from 'validator'
import User from '../models/User'

export async function getUserForCredentialsAuth(email) {
  if (!validator.isEmail(email)) {
    console.error('Invalid email')
    return null
  }

  try {
    await connectToDatabase()
    const user = await User.findOne({ email: email })

    if (!user) return null
    return {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      password: user.password,
      is_active: user.is_active,
      status: user.status,
    }
  } catch (error) {
    console.error('Error in getUserForCredentialsAuth, error:', error)
    return null
  }
}

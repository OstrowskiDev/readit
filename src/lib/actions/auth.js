'use server'

import { connectToDatabase } from '../db'
import validator from 'validator'
import User from '../models/User'

export async function getUserByEmail(email) {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email')
  }

  await connectToDatabase()
  const user = await User.findOne({ email: email })

  if (!user) return null

  return {
    password: user.password,
    is_active: user.is_active,
    status: user.status,
  }
}

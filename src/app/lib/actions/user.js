'use server'

import { v4 as uuidv4 } from 'uuid'
import { connectToDatabase } from '@/app/lib/db'
import User from '@/app/lib/models/User'
import { validatePasswords } from '../security/validatePasswords'
import { hashPassword } from '../security/hashPassword'

export async function createUser({ name, email, hashedPassword }) {
  try {
    // validation is done on server before createUser is called
    const newUserId = uuidv4()
    const newActivationToken = uuidv4()

    const newUser = new User({
      _id: newUserId,
      activation_token: newActivationToken,
      token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      is_active: false,
      name,
      email,
      password: hashedPassword,
      address: '',
      phone: '',
      about: '',
      avatar: {
        seed: 'Jack', // Default avatar seed
        color: 'red', // Default avatar color
      },
      favorites: [],
    })

    await connectToDatabase()
    await newUser.save()
    console.log('User created successfully')
    return { state: 'success', activation_token: newActivationToken }
  } catch (error) {
    console.error('Error creating user:', error)
    return { state: 'error' }
  }
}

export async function activateAccount({ activation_token }) {
  if (!activation_token) {
    console.error('Activation token is missing')
    return
  }
  try {
    await connectToDatabase()
    const userAccount = await User.findOne({
      activation_token: activation_token,
    })
    if (!userAccount) {
      return
    }
    userAccount.is_active = true
    userAccount.activation_token = null
    userAccount.token_expires_at = null
    await userAccount.save()
    console.log('User account activated successfully')
  } catch (error) {
    console.error('Error activating user account:', error)
  }
}

export async function addRecoveryToken(email) {
  if (!email) {
    console.error('Email is missing in addRecoveryToken func call')
    return
  }
  try {
    await connectToDatabase()
    const userAccount = await User.findOne({ email: email })
    if (!userAccount) {
      console.error(`User account not found for provided email`)
      return
    }
    const recovery_token = uuidv4()
    const hourFromNow = new Date(Date.now() + 60 * 60 * 1000)
    userAccount.recovery_token = recovery_token
    userAccount.recovery_token_expires_at = hourFromNow
    await userAccount.save()
    return {
      name: userAccount.name,
      recovery_token: recovery_token,
    }
  } catch (error) {
    console.error('Error during adding recovery token:', error)
    return
  }
}

export async function resetPassword({
  password,
  repeatPassword,
  recoveryToken,
}) {
  try {
    if (!password || !repeatPassword || !recoveryToken) {
      console.error('Missing data in resetPassword func call')
      return
    }
    const validationResults = validatePasswords({ password, repeatPassword })
    const hasErrors = Object.values(validationResults).some(
      (field) => field.message.length > 0,
    )
    if (hasErrors) {
      console.error('Password validation failed')
      return
    }
    await connectToDatabase()
    const userAccount = await User.findOne({ recovery_token: recoveryToken })
    if (!userAccount) {
      console.error('User account not found for provided reset token')
      return
    }
    if (userAccount.recovery_token_expires_at < new Date()) {
      console.error('Reset token has expired')
      return
    }
    const hashedPassword = await hashPassword(password, 10)
    userAccount.password = hashedPassword
    userAccount.recovery_token = null
    userAccount.recovery_token_expires_at = null
    await userAccount.save()
    return 'success'
  } catch (error) {
    console.error('Error during password reset:', error)
    return
  }
}

'use server'

import { v4 as uuidv4 } from 'uuid'
import { connectToDatabase } from '@/app/lib/db'
import User from '@/app/lib/models/User'
import { validatePasswords } from '../security/validatePasswords'
import { hashPassword } from '../security/hashPassword'
import { toast, resetToast, setToast } from '../toasts/ToastUtils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

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
    return { state: 'error' }
  }
  try {
    await connectToDatabase()
    const userAccount = await User.findOne({
      activation_token: activation_token,
    })
    if (!userAccount) {
      return { state: 'error' }
    }
    userAccount.is_active = true
    userAccount.activation_token = null
    userAccount.token_expires_at = null
    await userAccount.save()
    console.log('User account activated successfully')
    return { state: 'success' }
  } catch (error) {
    console.error('Error activating user account:', error)
    return { state: 'error' }
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
    resetToast()
    const toastErrorMessage =
      'Password reset failed. Please request a new one recovery link.'

    if (!password || !repeatPassword || !recoveryToken) {
      console.error('Missing data in resetPassword func call')
      setToast('error', toastErrorMessage)
      return toast
    }
    const validationResults = validatePasswords({ password, repeatPassword })
    const hasErrors = Object.values(validationResults).some(
      (field) => field.message.length > 0,
    )
    if (hasErrors) {
      console.error('Password validation failed')
      setToast('error', toastErrorMessage)
      return toast
    }
    await connectToDatabase()
    const userAccount = await User.findOne({ recovery_token: recoveryToken })
    if (!userAccount) {
      console.error('User account not found for provided reset token')
      setToast('error', toastErrorMessage)
      return toast
    }
    if (userAccount.recovery_token_expires_at < new Date()) {
      setToast('error', toastErrorMessage)
      return toast
    }
    const hashedPassword = await hashPassword(password, 10)
    userAccount.password = hashedPassword
    userAccount.recovery_token = null
    userAccount.recovery_token_expires_at = null
    userAccount.status = 'ok'
    await userAccount.save()
    setToast('success', 'Password reset successful')
    return toast
  } catch (error) {
    console.error('Error during password reset:', error)
    setToast('error', toastErrorMessage)
    return toast
  }
}

export async function changePassword({ password, repeatPassword }) {
  try {
    resetToast()
    const toastErrorMessage = 'Failed to change password'

    const session = await getServerSession(authOptions)
    if (!session) {
      console.error('Unauthorized')
      setToast('error', toastErrorMessage)
    }

    if (!password || !repeatPassword) {
      console.error('Missing data in changePassword func call')
      setToast('error', toastErrorMessage)
      return toast
    }
    const validationResults = validatePasswords({ password, repeatPassword })
    const hasErrors = Object.values(validationResults).some(
      (field) => field.message.length > 0,
    )
    if (hasErrors) {
      console.error('Password validation failed')
      setToast('error', toastErrorMessage)
      return toast
    }
    await connectToDatabase()
    const userId = session.user.id
    const user = await User.findOne({ _id: userId })
    if (!user) {
      console.error('User account not found for provided user _id:', { userId })
      setToast('error', toastErrorMessage)
      return toast
    }

    const hashedPassword = await hashPassword(password, 10)
    user.password = hashedPassword
    await user.save()
    setToast('success', 'Password reset successful')
    return toast
  } catch (error) {
    console.error('Error during password reset:', error)
    setToast('error', toastErrorMessage)
    return toast
  }
}

export async function checkAccountState(email) {
  try {
    await connectToDatabase()
    const user = await User.findOne({ email: email })
    if (!user) return { error: "account doesn't exist" }
    if (user.locked) return { state: 'locked' }
    return { state: 'ok' }
  } catch (error) {
    console.error('Error checking account state:', error)
    return { error: 'error checking account state' }
  }
}

export async function handleFailedLogin(email) {
  try {
    await connectToDatabase()
    const user = await User.findOne({ email })
    if (!user) {
      console.error(`User with email: ${email} not found`)
      return
    }
    const currentDate = Date.now()
    const oneHourAgo = currentDate - 60 * 60 * 1000

    // Below for accounts that were created before adding blocking accounts after 5 failed login attempts:
    user.last_login_attempt = user.last_login_attempt || 0
    user.failed_login_attempts = user.failed_login_attempts || 0

    if (user.last_login_attempt > oneHourAgo) {
      user.failed_login_attempts += 1
    } else {
      user.failed_login_attempts = 1
    }
    if (user.failed_login_attempts > 4) {
      user.status = 'locked'
    }
    user.last_login_attempt = currentDate
    await user.save()
    const updatedUser = await User.findById(user._id)
  } catch (error) {
    console.error('Error handling failed login attempt:', error)
  }
}

export async function checkEmailAvailability(email) {
  try {
    await connectToDatabase()
    const user = await User.findOne({ email: email })
    const isEmailAvailable = user ? false : true
    return isEmailAvailable
  } catch (error) {
    console.error('Error checking email availability:', error)
  }
}

export async function deleteTestUser() {
  try {
    await connectToDatabase()
    const result = await User.deleteOne({ email: 'testuser@example.com' })
    if (result.deletedCount === 1) {
      return { state: 'success' }
    } else {
      return { state: 'error' }
    }
  } catch (error) {
    console.error('Error deleting test user:', error)
    return { state: 'error' }
  }
}

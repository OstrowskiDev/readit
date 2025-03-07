'use server'

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
      console.error(
        `User account was not found for activation_token: ${activation_token}`,
      )
      return
    }

    userAccount.is_active = true
    userAccount.activation_token = null
    userAccount.token_expires_at = null

    await userAccount.save()
    // !!!! brak logów mających miejsce faktycznie po otrzymaniu wiadomości o sukcesie aktywacji konta z mongoDB
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

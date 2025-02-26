import bcrypt from 'bcrypt'

export async function hashPassword(password, saltNo) {
  const salt = await bcrypt.genSalt(saltNo)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

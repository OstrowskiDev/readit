const bcrypt = require('bcrypt')

async function hashPasswords(passwords) {
  for (let password of passwords) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(`Plaintext: ${password}, Hashed: ${hashedPassword}`)
  }
}

function generatePassword() {
  const length = 12
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-'
  let password = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset[Math.floor(Math.random() * n)]
  }
  return password
}

let passwords = ['ThisIsASecurePassword@123']
// let passwords = []
// for (let i = 0; i < 6; i++) {
//   passwords.push(generatePassword())
// }

hashPasswords(passwords)

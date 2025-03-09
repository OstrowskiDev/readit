import validator from 'validator'
import { passwordRegex } from './passwordRegex'
import { validateField } from './validationUtils'

// !!!! add proper validation for user email and name (check if they are unique)
// const existingUser = await User.findOne({ $or: [{ email }, { name }] })
// if (existingUser) {
//   throw new Error('User with this email or name already exists')
// }

// !!!! uncomment rodo and bot detection validation and add required logic for it

export const validationObject = {
  name: { message: [] },
  email: { message: [] },
  password: { message: [] },
  fullName: { message: [] }, //honeypot field
  // acceptRodo: { message: [] },
  // jsEnabled: { message: [] },
}

export function validateSignUp(formData) {
  const {
    fullName,
    name,
    email,
    password,
    // acceptRodo,
    // jsEnabled,
  } = formData

  //crating deep copy of validationObject
  const validationResults = JSON.parse(JSON.stringify(validationObject))

  const fieldRequired = ['name', 'email', 'password']
  for (const field of fieldRequired) {
    validateField(
      validationResults,
      field,
      () => !formData[field],
      'This field is required.',
    )
  }

  validateField(
    validationResults,
    'name',
    () => !validator.matches(name, /^[a-zA-Z\s]*$/),
    'Name cannot contain numbers or special characters.',
  )

  validateField(
    validationResults,
    'fullName',
    () => !validator.isLength(name, { max: 16 }),
    'Name cannot be longer than 16 characters.',
  )

  validateField(
    validationResults,
    'email',
    () => !validator.isEmail(email),
    'Please enter valid email address.',
  )

  validateField(
    validationResults,
    'password',
    () => !passwordRegex.test(password),
    'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
  )

  // validateField(
  //   validationResults,
  //   "acceptRodo",
  //   () => acceptRodo !== "yes",
  //   "Aby wysłać wiadomość wymagana jest akceptacja warunków Polityki Prywatności.",
  // )

  // validateField("jsEnabled", () => jsEnabled !== "yes", "bot detected")

  validateField(
    validationResults,
    'fullName',
    () => fullName !== '',
    'bot detected',
  )

  return validationResults
}

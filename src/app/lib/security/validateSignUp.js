import validator from 'validator'

// !!!! add proper validation for user email and name
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

  function addMessage(field, messageText) {
    validationResults[field].message.push(messageText)
  }

  function removeMessage(field, messageText) {
    const filteredMessages = validationResults[field].message.filter(
      (msg) => msg !== messageText,
    )
    validationResults[field].message = filteredMessages
  }

  function validateField(field, validationFn, messageText) {
    if (validationFn()) {
      addMessage(field, messageText)
    } else {
      removeMessage(field, messageText)
    }
  }

  const fieldRequired = ['name', 'email', 'password']
  for (const field of fieldRequired) {
    validateField(field, () => !formData[field], 'This field is required.')
  }

  validateField(
    'name',
    () => !validator.matches(name, /^[a-zA-Z\s]*$/),
    'name cannot contain numbers or special characters.',
  )

  validateField(
    'fullName',
    () => !validator.isLength(name, { max: 16 }),
    'Name cannot be longer than 16 characters.',
  )

  validateField(
    'email',
    () => !validator.isEmail(email),
    'Proszę wprowadzić prawidłowy adres email.',
  )

  // Password regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

  validateField(
    'password',
    () => !passwordRegex.test(password),
    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  )

  // validateField(
  //   "acceptRodo",
  //   () => acceptRodo !== "yes",
  //   "Aby wysłać wiadomość wymagana jest akceptacja warunków Polityki Prywatności.",
  // )

  // validateField("jsEnabled", () => jsEnabled !== "yes", "bot detected")

  validateField('fullName', () => fullName !== '', 'bot detected')

  return validationResults
}

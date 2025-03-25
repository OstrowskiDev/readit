import { validateSignUp } from '../../src/app/lib/security/validateSignUp'

describe('validateSignUp function', () => {
  test('should return an error when fields are empty', () => {
    const formData = { name: '', email: '', password: '' }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain('This field is required.')
    expect(result.email.message).toContain('This field is required.')
    expect(result.password.message).toContain('This field is required.')
  })

  test('should validate correct email format', () => {
    const formData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Abc123!',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toContain('Please enter valid email address.')
  })

  test('should allow correct email format', () => {
    const formData = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'Abc123!',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toHaveLength(0)
  })

  test('should validate username characters', () => {
    const formData = {
      name: 'John123',
      email: 'test@example.com',
      password: 'Abc123!',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      'Name cannot contain numbers or special characters.',
    )
  })

  test('should validate username length', () => {
    const formData = {
      name: 'ThisIsAVeryLongNameExceedingLimit',
      email: 'test@example.com',
      password: 'Abc123!',
    }
    const result = validateSignUp(formData)

    expect(result.fullName.message).toContain(
      'Name cannot be longer than 16 characters.',
    )
  })

  test('should validate password strength', () => {
    const formData = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'weakpass',
    }
    const result = validateSignUp(formData)

    expect(result.password.message).toContain(
      'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
    )
  })

  test('should allow a strong password', () => {
    const formData = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'StrongPass1!',
    }
    const result = validateSignUp(formData)

    expect(result.password.message).toHaveLength(0)
  })
})

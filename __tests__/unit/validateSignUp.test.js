import { validateSignUp } from '../../src/app/lib/security/validateSignUp'

describe('validateSignUp function', () => {
  test('should return an error when fields are empty', () => {
    const formData = { name: '', email: '', password: '' }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain('This field is required.')
    expect(result.email.message).toContain('This field is required.')
    expect(result.password.message).toContain('This field is required.')
  })

  test('should require proper email format', () => {
    const formData = {
      name: 'Johnny',
      email: 'invalid-email',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toContain('Please enter valid email address.')
  })

  test('should not allow dot at the beginning of email address', () => {
    const formData = {
      name: 'Johnny',
      email: '.invalid@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toContain('Please enter valid email address.')
  })

  test('should not allow dot before @ in email address', () => {
    const formData = {
      name: 'Johnny',
      email: '.invalid@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toContain('Please enter valid email address.')
  })

  test('should not allow dot two or more @ in email address', () => {
    const formData = {
      name: 'Johnny',
      email: 'invalid@this@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toContain('Please enter valid email address.')
  })

  test('should not allow - in front of domain in email address', () => {
    const formData = {
      name: 'Johnny',
      email: 'invalid@-example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toContain('Please enter valid email address.')
  })

  test('should not allow - at the end of domain in email address', () => {
    const formData = {
      name: 'Johnny',
      email: 'invalid@example-.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toContain('Please enter valid email address.')
  })

  test('should allow correct email format', () => {
    const formData = {
      name: 'Johnny',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.email.message).toHaveLength(0)
  })

  test('should not allow username with numbers', () => {
    const formData = {
      name: 'John123',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      'Name cannot contain numbers or special characters.',
    )
  })

  test('should not allow username with special characters', () => {
    const formData = {
      name: 'Joh@nn@',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      'Name cannot contain numbers or special characters.',
    )
  })

  test('should allow using space inside username', () => {
    const formData = {
      name: 'John Frank',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toHaveLength(0)
  })

  test('should not allow username that starts with space character', () => {
    const formData = {
      name: ' John Frank',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      'Name cannot have spaces at the beginning or end.',
    )
  })

  test('should not allow username that ends with space character', () => {
    const formData = {
      name: 'John Frank ',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      'Name cannot have spaces at the beginning or end.',
    )
  })

  test('should not allow username that uses "admin" word', () => {
    const formData = {
      name: 'your admin',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      "Words 'admin', 'moderator' and 'root' are not allowed.",
    )
  })

  test('should not allow username that uses "moderator" word', () => {
    const formData = {
      name: 'main moderator',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      "Words 'admin', 'moderator' and 'root' are not allowed.",
    )
  })

  test('should not allow username that uses "root" word', () => {
    const formData = {
      name: 'sysroot',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      "Words 'admin', 'moderator' and 'root' are not allowed.",
    )
  })

  test('should validate username length', () => {
    const formData = {
      name: 'ThisIsAVeryLongNameExceedingLimit',
      email: 'test@example.com',
      password: 'pass123',
    }
    const result = validateSignUp(formData)

    expect(result.name.message).toContain(
      'Name cannot be longer than 16 characters.',
    )
  })

  test('should validate password length', () => {
    const formData = {
      name: 'Johnny',
      email: 'test@example.com',
      password: 'Short!1',
    }
    const result = validateSignUp(formData)

    expect(result.password.message).toContain(
      'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
    )
  })

  test('should validate password strength', () => {
    const formData = {
      name: 'Johnny',
      email: 'test@example.com',
      password: 'weak!1',
    }
    const result = validateSignUp(formData)

    expect(result.password.message).toContain(
      'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
    )
  })

  test('should allow a strong password', () => {
    const formData = {
      name: 'Johnny',
      email: 'test@example.com',
      password: 'StrongPass1!',
    }
    const result = validateSignUp(formData)

    expect(result.password.message).toHaveLength(0)
  })
})

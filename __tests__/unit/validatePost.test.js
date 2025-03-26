import {
  validatePostTitle,
  validatePostContent,
} from '../../src/app/lib/security/validatePost'

describe('validatePostTitle', () => {
  test('should return error if title is empty', () => {
    const result = validatePostTitle('')
    expect(result.error).toBe('Post title is required')
  })

  test('should return error if title is an object', () => {
    const result = validatePostTitle({ message: 'passing an object' })
    expect(result.error).toBe('Invalid Post title data')
  })

  test('should return error if title is boolean false', () => {
    const result = validatePostTitle(false)
    expect(result.error).toBe('Invalid Post title data')
  })

  test('should return error if title is boolean true', () => {
    const result = validatePostTitle(true)
    expect(result.error).toBe('Invalid Post title data')
  })

  test('should return error if title is NaN', () => {
    const result = validatePostTitle(NaN)
    expect(result.error).toBe('Invalid Post title data')
  })

  test('should return error if title is undefined', () => {
    const result = validatePostTitle(undefined)
    expect(result.error).toBe('Invalid Post title data')
  })

  test('should return error if title is null', () => {
    const result = validatePostTitle(null)
    expect(result.error).toBe('Invalid Post title data')
  })

  test('should return error if title consists of only spaces', () => {
    const result = validatePostTitle('     ')
    expect(result.error).toBe('Post title is required')
  })

  test('should return title if title is valid', () => {
    const result = validatePostTitle('ValidTitle123')
    expect(result.sanitizedString).toBe('ValidTitle123')
    expect(result.error).toBeNull()
  })

  test('should remove non-alphanumeric characters and return sanitized string', () => {
    const result = validatePostTitle('Invalid! Title@123')
    expect(result.sanitizedString).toBe('Invalid Title123')
    expect(result.error).toBeNull()
  })
})

describe('validatePostContent', () => {
  test('should return error if content is empty', () => {
    const result = validatePostContent('')
    expect(result.error).toBe('Post content is required')
  })

  test('should return error if content is an object', () => {
    const result = validatePostContent({ message: 'passing an object' })
    expect(result.error).toBe('Invalid Post content data')
  })

  test('should return error if content is a boolean', () => {
    const result = validatePostContent(true)
    expect(result.error).toBe('Invalid Post content data')
  })

  test('should return error if content is NaN', () => {
    const result = validatePostContent(NaN)
    expect(result.error).toBe('Invalid Post content data')
  })

  test('should return error if content is undefined', () => {
    const result = validatePostContent(undefined)
    expect(result.error).toBe('Invalid Post content data')
  })

  test('should return error if content is null', () => {
    const result = validatePostContent(null)
    expect(result.error).toBe('Invalid Post content data')
  })

  test('should return error if content consists of only spaces', () => {
    const result = validatePostContent('    ')
    expect(result.error).toBe('Post content is required')
  })

  test('should return input string when string is valid', () => {
    const result = validatePostContent('This is valid string.')
    expect(result.sanitizedString).toBe('This is valid string.')
    expect(result.error).toBeNull()
  })
})

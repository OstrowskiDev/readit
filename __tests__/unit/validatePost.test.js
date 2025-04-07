import {
  validatePostTitle,
  validatePostContent,
} from '../../src/app/lib/security/validatePost'

describe('validatePostTitle', () => {
  test('should return error if title is empty', () => {
    const result = validatePostTitle('')
    expect(result.error).toBe('Post title is required.')
  })

  test.each([false, true, NaN, undefined, null, {}, []])(
    'should return error for invalid title input: %p',
    (input) => {
      const result = validatePostTitle(input)
      expect(result.error).toBe('Invalid Post title data')
    },
  )

  test('should return error if title consists of only spaces', () => {
    const result = validatePostTitle('     ')
    expect(result.error).toBe('Post title is required.')
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

  test.each([false, true, NaN, undefined, null, {}, []])(
    'should return error for invalid content input: %p',
    (input) => {
      const result = validatePostContent(input)
      expect(result.error).toBe('Invalid Post content data')
    },
  )

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

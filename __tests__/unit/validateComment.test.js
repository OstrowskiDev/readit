import { validateCommentContent } from '../../src/lib/security/validateComment'

describe('validateCommentContent', () => {
  test('should return error if content is empty', () => {
    const result = validateCommentContent('')
    expect(result.error).toBe('Comment content is required')
  })

  test.each([false, true, NaN, undefined, null, {}, []])(
    'should return error for invalid content input: %p',
    (input) => {
      const result = validateCommentContent(input)
      expect(result.error).toBe('Invalid Comment content data')
    },
  )

  test('should return error if content consists of only spaces', () => {
    const result = validateCommentContent('    ')
    expect(result.error).toBe('Comment content is required')
  })

  test('should return input string when string is valid', () => {
    const result = validateCommentContent('This is valid string.')
    expect(result.error).toBeNull()
    expect(result.sanitizedString).toBe('This is valid string.')
  })
})

import { validatePasswords } from '../../src/app/lib/security/validatePasswords'

describe('validatePasswords func', () => {
  test('should return error message when form fields are empty', () => {
    const formData = { password: '', repeatPassword: '' }
    const result = validatePasswords(formData)
    expectErrorMessages(result, 'This field is required.')
  })

  test.each([false, true, NaN, undefined, null, {}, []])(
    'should return error for invalid data input: %p',
    (input) => {
      const formData = { password: input, repeatPassword: input }
      const result = validatePasswords(formData)
      expectErrorMessages(result, 'Invalid data.')
    },
  )

  test('should return error message when password is weak', () => {
    const formData = { password: 'weak1!', repeatPassword: 'weak1!' }
    const result = validatePasswords(formData)
    const expectedMessage =
      'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.'
    expect(
      result.password.message.some((message) => message === expectedMessage),
    ).toBe(true)
  })

  test("should return error message when passwords don't match", () => {
    const formData = { password: 'jfd#*SDIU149', repeatPassword: 'nopperS#129' }
    const result = validatePasswords(formData)
    expect(
      result.repeatPassword.message.some(
        (message) => message === 'Passwords do not match',
      ),
    )
  })

  test('should not return error for strong passwords that match', () => {
    const formData = {
      password: 'jfd#*SDIU149',
      repeatPassword: 'jfd#*SDIU149',
    }
    const result = validatePasswords(formData)
    expect(result.password.message).toStrictEqual([])
    expect(result.repeatPassword.message).toStrictEqual([])
  })
})

function expectErrorMessages(result, expectedMessage) {
  expect(
    result.password.message.some((message) => message === expectedMessage),
  ).toBe(true)
  expect(
    result.repeatPassword.message.some(
      (message) => message === expectedMessage,
    ),
  ).toBe(true)
}

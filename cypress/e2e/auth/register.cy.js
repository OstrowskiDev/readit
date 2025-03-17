describe('User Registration', () => {
  const userName = Cypress.env('TEST_USER_NAME')
  const userPasswrod = Cypress.env('TEST_USER_PASSWORD')
  const userEmail = Cypress.env('TEST_USER_EMAIL')
  const baseUrl = Cypress.env('BASE_URL')
  beforeEach(() => {
    cy.visit(`${baseUrl}/register`)
  })

  it('should show validation errors for empty fields', () => {
    cy.get("button[type='submit']").click()

    cy.get('.register-name-error').should('contain', 'This field is required.')
    cy.get('.register-email-error').should('contain', 'This field is required.')
    cy.get('.register-password-error').should(
      'contain',
      'This field is required.',
    )
  })

  it('should show error for name that contains numbers', () => {
    cy.get('#name').type('johnny2222')
    cy.get("button[type='submit']").click()
    cy.get('.register-name-error').should(
      'contain',
      'Name cannot contain numbers or special characters.',
    )
  })

  it('should show error for name that contains special characters', () => {
    cy.get('#name').type('johnny!@$')
    cy.get("button[type='submit']").click()
    cy.get('.register-name-error').should(
      'contain',
      'Name cannot contain numbers or special characters.',
    )
  })

  it('should show error for invalid email format', () => {
    cy.get('#email').type('invalid-email')
    cy.get("button[type='submit']").click()
    cy.get('.register-email-error').should(
      'contain',
      'Please enter valid email address.',
    )
  })

  it('should show error for password not meeting criteria', () => {
    cy.get('#password').type('short')
    cy.get("button[type='submit']").click()
    cy.get('.register-password-error').should(
      'contain',
      'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
    )
  })

  it('should delte test user', () => {
    const testUserSecret = Cypress.env('TEST_USER_SECRET')
    cy.request({
      method: 'DELETE',
      url: '/api/tests/delete-test-user',
      body: { secret: testUserSecret },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.include('User deleted')
    })
  })

  it('should successfully register a new user', () => {
    cy.get('#name').type(userName)
    cy.get('#email').type(userEmail)
    cy.get('#password').type(userPasswrod)
    cy.get("button[type='submit']").click()

    cy.url({ timeout: 8000 }).should(
      'include',
      '/account/activation-email-send',
    )
  })

  it('should show error if email is already taken', () => {
    cy.get('#name').type(userName)
    cy.get('#email').type(userEmail)
    cy.get('#password').type(userPasswrod)
    cy.get("button[type='submit']").click()

    cy.get('.register-email-already-taken').should(
      'contain',
      'An account with this email already exists',
    )
  })
})

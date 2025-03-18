describe('Login Page', () => {
  const baseUrl = Cypress.env('BASE_URL')
  const userPasswrod = Cypress.env('TEST_USER_PASSWORD')
  const userEmail = Cypress.env('TEST_USER_EMAIL')

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
  })

  it('should display the login form', () => {
    cy.get('.login-title').should('contain', 'Login')
    cy.get('.login-email-input').should('be.visible')
    cy.get('.login-password-input').should('be.visible')
    cy.get('.login-submit-button').should('be.visible')
  })

  it('should show error message for empty form submission', () => {
    cy.get('.login-submit-button').click()
    cy.get('.login-error-text').should('contain', 'Invalid email or password')
  })

  it('should show error message for incorrect credentials', () => {
    cy.get('.login-email-input').type('wrong@example.com')
    cy.get('.login-password-input').type('wrongpassword')
    cy.get('.login-submit-button').click()
    cy.get('.login-error-text').should('contain', 'Invalid email or password')
  })

  it('should redirect to posts page after successful login', () => {
    cy.get('.login-email-input').type(userEmail)
    cy.get('.login-password-input').type(userPasswrod)
    cy.get('.login-submit-button').click()
    cy.url().should('include', `${baseUrl}/posts`)
  })

  it('should navigate to forgot password page', () => {
    cy.get('.forgot-password-container a').click()
    cy.url().should('include', `${baseUrl}/account/forgot-password`)
  })

  it('should navigate to register page', () => {
    cy.get('.register-container a').click()
    cy.url().should('include', `${baseUrl}/register`)
  })
})

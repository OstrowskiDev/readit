Cypress.Commands.add('login', () => {
  const baseUrl = Cypress.env('BASE_URL')
  const userEmail = Cypress.env('TEST_USER_EMAIL')
  const userPasswrod = Cypress.env('TEST_USER_PASSWORD')

  cy.visit(`${baseUrl}/login`)
  cy.get('.login-email-input').type(userEmail)
  cy.get('.login-password-input').type(userPasswrod)
  cy.get('.login-submit-button').click()
  cy.url({ timeout: 6000 }).should('include', '/posts')
})

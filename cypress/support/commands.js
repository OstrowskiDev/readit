Cypress.Commands.add('login', () => {
  const baseUrl = Cypress.env('BASE_URL')
  const userEmail = Cypress.env('TEST_USER_EMAIL')
  const userPassword = Cypress.env('TEST_USER_PASSWORD')

  cy.visit(`${baseUrl}/login`)
  cy.get('.login-email-input').type(userEmail)
  cy.get('.login-password-input').type(userPassword)
  cy.get('.login-submit-button').click()
  cy.url({ timeout: 6000 }).should('include', '/posts')
})

Cypress.Commands.add('findReply', () => {
  cy.get('.comment-replies').children('.comment-container')
})

Cypress.Commands.add('expectToast', (toastStatus, toastMessage) => {
  cy.get('.toast-text-state').should('have.text', toastStatus)
  cy.get('.toast-text-message').should('have.text', toastMessage)
})

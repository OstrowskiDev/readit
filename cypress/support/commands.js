import { postTitle, postContent } from '../support/mock'

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

Cypress.Commands.add('createTestPost', () => {
  const userSecret = Cypress.env('TEST_USER_SECRET')
  cy.request({
    method: 'POST',
    url: '/api/tests/create-test-post',
    body: {
      title: postTitle,
      content: postContent,
      postId: 'cypress-test-post',
      secret: userSecret,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('deleteTestUser', () => {
  const baseUrl = Cypress.env('BASE_URL')
  const testUserSecret = Cypress.env('TEST_USER_SECRET')

  cy.request({
    method: 'DELETE',
    url: `${baseUrl}/api/tests/delete-test-user`,
    body: { secret: testUserSecret },
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('createActivatedTestUser', () => {
  const baseUrl = Cypress.env('BASE_URL')
  const testUserSecret = Cypress.env('TEST_USER_SECRET')

  cy.request({
    method: 'POST',
    url: `${baseUrl}/api/tests/create-activated-test-user`,
    body: { secret: testUserSecret },
  }).then((response) => {
    expect(response.status).to.eq(201)
  })
})

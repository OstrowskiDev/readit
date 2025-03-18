const baseUrl = Cypress.env('BASE_URL')
const userEmail = Cypress.env('TEST_USER_EMAIL')
const userPasswrod = Cypress.env('TEST_USER_PASSWORD')
const postTitle = 'Cypress Tests Post'
const postContent =
  'This is a test post created by Cypress. It will be deleted after the test.'

describe('Posts CRUD + Likes Tests', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should create a new post', () => {
    cy.get('.create-new-post-button').click()
    cy.get('.post-title-input').type(postTitle)
    cy.get('.post-content-input').type(postContent)
    cy.get('.post-reply-submit-btn').click()
    cy.get('.toast-text-state').should('be.visible')
    cy.get('.toast-text-message').should('be.visible')
  })

  it('should edit the post', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitle) {
        cy.wrap($el).parents('.post-container').find('.edit-post-btn').click()
      }
    })
    cy.url({ timeout: 6000 }).should('include', '/posts/post')
    cy.url().should('include', '?editPost=true')
    cy.get('.post-title-input').clear().type(`${postTitle} - Edited`)
    cy.get('.post-content-input').clear().type(`${postContent} - Edited`)
    cy.get('.post-edit-submit-btn').click()
    cy.get('.toast-text-state').should('be.visible')
    cy.get('.toast-text-message').should('be.visible')
    cy.get('.post-title').should('contain', `${postTitle} - Edited`)
    cy.get('.post-content').should('contain', `${postContent} - Edited`)
  })
})

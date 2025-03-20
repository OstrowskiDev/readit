const baseUrl = Cypress.env('BASE_URL')
const userEmail = Cypress.env('TEST_USER_EMAIL')
const userPasswrod = Cypress.env('TEST_USER_PASSWORD')
const postTitle = 'Cypress Tests Post'
const postContent =
  'This is a test post created by Cypress. It will be deleted after the test. Tests include creating, editing, and deleting posts. Also liking and unliking posts.'
const postTitleEdited = `${postTitle} Edited`
const postContentEdited = `${postContent} (Edited)`

describe('Posts create, update, like, dislike and delete tests.', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should create a new post', () => {
    cy.get('.create-new-post-button').click()
    cy.get('.post-title-input').type(postTitle)
    cy.get('.post-content-input').type(postContent)
    cy.get('.post-reply-submit-btn').click()
    cy.get('.toast-text-state').should('be.visible')
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should('be.visible')
    cy.get('.toast-text-message').should(
      'have.text',
      'Post created successfully!',
    )
  })

  it('should edit the post', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitle) {
        cy.wrap($el).parents('.post-container').find('.edit-post-btn').click()
      }
    })
    cy.url({ timeout: 6000 }).should('include', '/posts/post')
    cy.url().should('include', '?editPost=true')
    cy.get('.post-title-input').clear().type(postTitleEdited)
    cy.get('.post-content-input').clear().type(postContentEdited)
    cy.get('.post-edit-submit-btn').click()
    cy.get('.toast-text-state').should('be.visible')
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should('be.visible')
    cy.get('.toast-text-message').should(
      'have.text',
      'Post updated successfully!',
    )
    cy.get('.post-title').should('contain', postTitleEdited)
    cy.get('.post-content').should('contain', postContentEdited)
  })

  it('should like the post', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitleEdited) {
        cy.wrap($el).parents('.post-container').click()
      }
    })
    cy.url({ timeout: 6000 }).should('include', '/posts/post')
    cy.get('.post-like-count').should('contain', '0')
    cy.get('.post-like-button').click()
    cy.get('.toast-text-state').should('be.visible')
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should('be.visible')
    cy.get('.toast-text-message').should(
      'have.text',
      'Like added successfully!',
    )
    cy.get('.post-like-count').should('contain', '1')
  })

  it('should dislike the post', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitleEdited) {
        cy.wrap($el).parents('.post-container').click()
      }
    })
    cy.url({ timeout: 6000 }).should('include', '/posts/post')
    cy.get('.post-like-count').should('contain', '1')
    cy.get('.post-dislike-button').click()
    cy.get('.toast-text-state').should('be.visible')
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should('be.visible')
    cy.get('.toast-text-message').should(
      'have.text',
      'Dislike added successfully!',
    )
    cy.get('.post-like-count').should('contain', '-1')
  })

  it('should delete the post via /posts page delete-btn', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitleEdited) {
        cy.wrap($el).parents('.post-container').find('.delete-post-btn').click()
      }
    })
    cy.get('.toast-text-state').should('be.visible')
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should('be.visible')
    cy.get('.toast-text-message').should(
      'have.text',
      'Post deleted successfully!',
    )
  })
})

describe('Delete post via /posts/post page delete-btn', () => {
  before(() => {
    cy.visit(`${baseUrl}/posts`)
    cy.get('.create-new-post-button').click()
    cy.get('.post-title-input').type(postTitle)
    cy.get('.post-content-input').type(postContent)
    cy.get('.post-reply-submit-btn').click()
    cy.get('.toast-text-state').should('be.visible')
  })
  it('should create and delete post', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitle) {
        cy.wrap($el).parents('.post-container').click()
      }
    })
    cy.url({ timeout: 6000 }).should('include', '/posts/post')
    cy.get('.delete-post-btn').click()
    cy.get('.toast-text-message').should('be.visible')
    cy.get('.toast-text-message').should(
      'have.text',
      'Post deleted successfully!',
    )
    cy.url({ timeout: 6000 }).should('eq', `${baseUrl}/posts`)
  })
})

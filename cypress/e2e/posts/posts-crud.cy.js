const baseUrl = Cypress.env('BASE_URL')
import {
  postTitle,
  postContent,
  postTitleEdited,
  postContentEdited,
} from '../../support/mock'

describe('Create new post', () => {
  cy.login()
  cy.get('.create-new-post-button').click()
  cy.get('.post-title-input').type(postTitle)
  cy.get('.post-content-input').type(postContent)
  cy.get('.post-reply-submit-btn').click()
  cy.expectToast('Success!', 'Post created successfully!')
})

describe('Prepare environment for rest of the tests', () => {
  it('should remove created post', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitle) {
        cy.wrap($el).parents('.post-container').find('.delete-post-btn').click()
      }
    })
    cy.expectToast('Success!', 'Post deleted successfully!')
  })

  it('should create post dedicated for tests via hidden API route', () => {
    cy.login()
    cy.createTestPost()
  })
})

describe('Posts create, update, like, dislike and delete tests.', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should edit the post via /posts page', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitle) {
        cy.wrap($el).parents('.post-container').find('.edit-post-btn').click()
      }
    })
    cy.url({ timeout: 6000 }).should('include', '?editPost=true')
    cy.get('.post-title-input').clear().type(postTitleEdited)
    cy.get('.post-content-input').clear().type(postContentEdited)
    cy.get('.post-edit-submit-btn').click()
    cy.expectToast('Success!', 'Post updated successfully!')
    cy.get('.post-title').should('contain', postTitleEdited)
    cy.get('.post-content').should('contain', postContentEdited)
  })

  it('should edit the post via /posts/post/[id] page', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.edit-post-btn').click()
    cy.get('.post-title-input').clear().type(postTitle)
    cy.get('.post-content-input').clear().type(postContent)
    cy.get('.post-edit-submit-btn').click()
    cy.expectToast('Success!', 'Post updated successfully!')
    cy.get('.post-title').should('contain', postTitle)
    cy.get('.post-content').should('contain', postContent)
  })

  it('should add/remove like from the post', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.post-like-count').should('contain', '0')
    cy.get('.post-like-button').click()
    cy.expectToast('Success!', 'Like added successfully!')
    cy.get('.post-like-count').should('contain', '1')
    cy.get('.post-like-button').click()
    cy.expectToast('Success!', 'Like removed successfully!')
    cy.get('.post-like-count').should('contain', '0')
  })

  it('should add/remove dislike from the post', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.post-like-count').should('contain', '0')
    cy.get('.post-dislike-button').click()
    cy.expectToast('Success!', 'Dislike added successfully!')
    cy.get('.post-like-count').should('contain', '-1')
    cy.get('.post-dislike-button').click()
    cy.expectToast('Success!', 'Dislike removed successfully!')
    cy.get('.post-like-count').should('contain', '0')
  })

  it('should delete the post via /posts page delete-btn', () => {
    cy.get('.post-title').each(($el) => {
      if ($el.text() === postTitle) {
        cy.wrap($el).parents('.post-container').find('.delete-post-btn').click()
      }
    })
    cy.expectToast('Success!', 'Post deleted successfully!')
  })

  it('should delete post via /posts/post/[id] page', () => {
    cy.createTestPost()
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.delete-post-btn').click()
    cy.expectToast('Success!', 'Post deleted successfully!')
    cy.url({ timeout: 6000 }).should('not.include', `/post/`)
  })
})

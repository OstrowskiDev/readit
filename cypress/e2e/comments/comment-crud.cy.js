const baseUrl = Cypress.env('BASE_URL')
import {
  commentContent,
  commentContentEdited,
  replyContent,
  replyContentEdited,
} from '../../support/mock'

describe('Prepare tests environment', () => {
  it('should create test post', () => {
    cy.login()
    cy.createTestPost()
  })
})

describe('Top-level comments: create, update, like, dislike, likeCount tests.', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
  })

  it('should create comment for post', () => {
    cy.get('.post-container').should('be.visible')
    cy.get('.create-comment-btn-container').click()
    cy.get('.post-reply-input').type(commentContent)
    cy.get('.post-reply-submit-btn').click()
    cy.expectToast('Success!', 'Comment created successfully!')
  })

  it('should edit comment', () => {
    cy.get('.comment-container').should('be.visible')
    cy.get('.comment-menu-btn').click()
    cy.get('.menu-opt-edit-btn').click()
    cy.get('.comment-edit-input').clear().type(commentContentEdited)
    cy.get('.comment-edit-submit-btn').click()
    cy.expectToast('Success!', 'Comment updated successfully!')
  })

  it('should add/remove like to comment and display proper like count', () => {
    cy.get('.comment-container').should('be.visible')
    cy.get('.comment-like-count').should('contain', '0')
    cy.get('.comment-like-btn').click()
    cy.expectToast('Success!', 'Like added successfully!')
    cy.get('.comment-like-count').should('contain', '1')
    cy.get('.comment-like-btn').click()
    cy.expectToast('Success!', 'Like removed successfully!')
    cy.get('.comment-like-count').should('contain', '0')
  })

  it('should add/remove dislike to comment and display proper like count', () => {
    cy.get('.comment-container').should('be.visible')
    cy.get('.comment-like-count').should('contain', '0')
    cy.get('.comment-dislike-btn').click()
    cy.expectToast('Success!', 'Dislike added successfully!')
    cy.get('.comment-like-count').should('contain', '1')
    cy.get('.comment-dislike-btn').click()
    cy.expectToast('Success!', 'Dislike removed successfully!')
    cy.get('.comment-like-count').should('contain', '0')
  })
})

describe('Reply-level comment create, edit, like, dislike, likeCount tests', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
  })

  it('should create reply-level comment', () => {
    cy.get('.comment-reply-btn').click()
    cy.get('.comment-reply-input').type(replyContent)
    cy.get('.comment-reply-submit-btn').click()
    cy.expectToast('Success!', 'Comment created successfully!')
  })

  it('should edit reply-level comment', () => {
    cy.get('.comment-replies')
      .children('.comment-container')
      .find('.comment-menu-btn-icon')
      .click()
    cy.get('.menu-opt-edit-btn').click()
    cy.get('.comment-edit-input').clear().type(replyContentEdited)
    cy.get('.comment-edit-submit-btn').click()
    cy.expectToast('Success!', 'Comment updated successfully!')
  })

  it('should add/remove like to reply-level comment', () => {
    cy.findReply().find('.comment-like-count').should('contain', '0')
    cy.findReply().find('.comment-like-btn').click()
    cy.expectToast('Success!', 'Like added successfully!')
    cy.findReply().find('.comment-like-count').should('contain', '1')
    cy.findReply().find('.comment-like-btn').click()
    cy.expectToast('Success!', 'Like removed successfully!')
    cy.findReply().find('.comment-like-count').should('contain', '0')
  })

  it('should add/remove dislike to reply-level comment', () => {
    cy.findReply().find('.comment-like-count').should('contain', '0')
    cy.findReply().find('.comment-dislike-btn').click()
    cy.expectToast('Success!', 'Dislike added successfully!')
    cy.findReply().find('.comment-like-count').should('contain', '1')
    cy.findReply().find('.comment-dislike-btn').click()
    cy.expectToast('Success!', 'Dislike removed successfully!')
    cy.findReply().find('.comment-like-count').should('contain', '0')
  })
})

describe('Top-level and Reply-level comments delete tests', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
  })

  it('should delete reply-level comment', () => {
    cy.findReply().find('.comment-menu-btn').click()
    cy.get('.menu-opt-delete-btn').click()
    cy.expectToast('Success!', 'Comment deleted successfully!')
  })

  it('should delete top-level comment', () => {
    cy.get('.comment-menu-btn').click()
    cy.get('.menu-opt-delete-btn').click()
    cy.expectToast('Success!', 'Comment deleted successfully!')
  })
})

describe('Clean up after tests', () => {
  it('should delete test post', () => {
    cy.login()
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.delete-post-btn').click()
    cy.expectToast('Success!', 'Post deleted successfully!')
  })
})

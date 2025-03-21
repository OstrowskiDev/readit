const baseUrl = Cypress.env('BASE_URL')
const userSecret = Cypress.env('TEST_USER_SECRET')
import {
  postTitle,
  postContent,
  commentContent,
  newCommentContent,
  replyContent,
  newReplyContent,
} from '../../support/mock'

// !!!! add functionality to create new post that will hard reload /posts page, so newly created post will be displayed on top

describe('Prepare tests environment', () => {
  it('should create test post', () => {
    cy.login()
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
    cy.get('.comment-edit-input').clear().type(newCommentContent)
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
    cy.get('.comment-edit-input').clear().type(newReplyContent)
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

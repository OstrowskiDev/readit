const baseUrl = Cypress.env('BASE_URL')
const userEmail = Cypress.env('TEST_USER_EMAIL')
const userPasswrod = Cypress.env('TEST_USER_PASSWORD')
const userSecret = Cypress.env('TEST_USER_SECRET')
const postTitle = 'Cypress Tests Post'
const postContent =
  'This is a test post created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also liking and unliking top-level comments.'
const commentContent =
  'This is a test top-level comment created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also liking and unliking top-level comments.'
const newCommentContent = `${commentContent} Edited`
const replyContent =
  'This is a test reply-level comment created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting reply-level comments. Also liking and unliking reply-level comments.'
const newReplyContent = `${replyContent} Edited`

describe('Top-level comments: create, update, like, dislike and delete tests.', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should create test post', () => {
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

  it('should create comment for post', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.post-container').should('be.visible')
    cy.get('.create-commnet-btn-container').click()
    cy.get('.post-reply-input').type(commentContent)
    cy.get('.post-reply-submit-btn').click()
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should(
      'have.text',
      'Comment created successfully!',
    )
  })

  it('should edit comment', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.comment-container').should('be.visible')
    cy.get('.comment-menu-btn').click()
    cy.get('.menu-opt-edit-btn').click()
    cy.get('.comment-edit-input').clear().type(newCommentContent)
    cy.get('.comment-edit-submit-btn').click()
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should(
      'have.text',
      'Comment updated successfully!',
    )
  })

  it('should add/remove like to comment', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.comment-container').should('be.visible')
    cy.get('.comment-like-count').should('contain', '0')
    cy.get('.comment-like-btn').click()
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should(
      'have.text',
      'Like added successfully!',
    )
    cy.get('.comment-like-count').should('contain', '1')
    cy.get('.comment-like-btn').click()
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should(
      'have.text',
      'Like removed successfully!',
    )
    cy.get('.comment-like-count').should('contain', '0')
  })

  it('should add/remove dislike to comment', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.comment-container').should('be.visible')
    cy.get('.comment-like-count').should('contain', '0')
    cy.get('.comment-dislike-btn').click()
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should(
      'have.text',
      'Dislike added successfully!',
    )
    cy.get('.comment-like-count').should('contain', '1')
    cy.get('.comment-dislike-btn').click()
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should(
      'have.text',
      'Dislike removed successfully!',
    )
    cy.get('.comment-like-count').should('contain', '0')
  })

  it('should create comment for top-level comment', () => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    cy.get('.comment-reply-btn').click()
    cy.get('.comment-reply-input').type(replyContent)
    cy.get('.comment-reply-submit-btn').click()
    cy.get('.toast-text-state', { timeout: 5000 }).should(
      'have.text',
      'Success!',
    )
    cy.get('.toast-text-message').should(
      'have.text',
      'Comment created successfully!',
    )
  })

  // after(() => {
  //   cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
  //   delete test comments
  //   delete post
  // })

  // it('should create new comment', () => {
  //   cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
  //   cy.url().should('include', 'cypress-test-post')
  // })
})

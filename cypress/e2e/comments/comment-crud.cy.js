const baseUrl = Cypress.env('BASE_URL')
const userEmail = Cypress.env('TEST_USER_EMAIL')
const userPasswrod = Cypress.env('TEST_USER_PASSWORD')
const userSecret = Cypress.env('TEST_USER_SECRET')
const postTitle = 'Cypress Tests Post'
const postContent =
  'This is a test post created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also liking and unliking top-level comments.'
const commentContent =
  'This is a test top-level comment created by Cypress. It will be deleted after the test. Tests include creating, editing, deleting and commenting top-level comments. Also liking and unliking top-level comments.'

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

  it('should create comment', () => {
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

  after(() => {
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
    // delete test comments
    // delete post
  })

  // it('should create new comment', () => {
  //   cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
  //   cy.url().should('include', 'cypress-test-post')
  // })
})

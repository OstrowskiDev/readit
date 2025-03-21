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
})

describe('reply-evel comment create, edit, like, dislike, likeCount tests', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
  })

  it('should create reply-level comment', () => {
    cy.get('.comment-reply-btn').click()
    cy.get('.comment-reply-input').type(replyContent)
    cy.get('.comment-reply-submit-btn').click()
    cy.get('.toast-text-state').should('have.text', 'Success!')
    cy.get('.toast-text-message').should(
      'have.text',
      'Comment created successfully!',
    )
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

// after(() => {
//   cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
//   delete test comments
//   delete post
// })

// it('should create new comment', () => {
//   cy.visit(`${baseUrl}/posts/post/cypress-test-post`)
//   cy.url().should('include', 'cypress-test-post')
// })

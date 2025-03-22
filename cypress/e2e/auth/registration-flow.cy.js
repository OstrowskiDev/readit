describe('User Registration/Password Recovery Flow', () => {
  const baseUrl = Cypress.env('BASE_URL')
  const userName = Cypress.env('TEST_USER_NAME')
  const userEmail = Cypress.env('TEST_USER_EMAIL')
  const userPassword = Cypress.env('TEST_USER_PASSWORD')
  const userNewPassword = Cypress.env('TEST_USER_NEW_PASSWORD')
  const testUserSecret = Cypress.env('TEST_USER_SECRET')

  before(() => {
    cy.log('Delete test user before starting the test')
    cy.deleteTestUser()
  })

  it('should successfully register a new user', () => {
    cy.visit(`${baseUrl}/register`)
    cy.get('#name').type(userName)
    cy.get('#email').type(userEmail)
    cy.get('#password').type(userPassword)
    cy.get("button[type='submit']").click()
    cy.url({ timeout: 6000 }).should(
      'include',
      '/account/activation-email-send',
    )
    cy.contains(
      'Please check your email and click the link to activate your account.',
    ).should('be.visible')
  })

  it('should activate the account via API', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/tests/activate-test-user`,
      body: { secret: testUserSecret },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should log in and log out after activation', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#email').type(userEmail)
    cy.get('#password').type(userPassword)
    cy.get('.login-submit-button').click()
    cy.url({ timeout: 6000 }).should('include', '/posts')
    cy.get('.sign-out-button ').click()
    cy.url().should('include', '/goodbye')
  })

  it('should navigate to forgot password page and request password reset', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get('.forgot-password-container a').click()
    cy.url().should('include', '/account/forgot-password')
    cy.get('#email').type(userEmail)
    cy.get('.password-recovery-submit-button').click()
    cy.url({ timeout: 6000 }).should('include', '/account/forgot-password')
    cy.contains('Email Sent').should('be.visible')
  })

  it('should activate the password reset link via API', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/tests/reset-test-user-password`,
      body: { secret: testUserSecret },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('should change the password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/tests/get-test-user-reset-token`,
      body: { secret: testUserSecret },
    }).then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body.recovery_token).as('recovery_token')
    })

    cy.get('@recovery_token').then((recovery_token) => {
      cy.visit(
        `${baseUrl}/account/reset-password?recovery_token=${recovery_token}`,
      )
      cy.get('#password').type(userNewPassword)
      cy.get('#repeatPassword').type(userNewPassword)
      cy.get('.password-change-submit-button').click()
      cy.url().should('include', '/account/password-changed')
      cy.contains('password has been changed successfully').should('be.visible')
    })
  })

  it('should log in with the new password', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#email').type(userEmail)
    cy.get('#password').type(userNewPassword)
    cy.get('.login-submit-button').click()
    cy.url({ timeout: 6000 }).should('include', '/posts')
  })
})

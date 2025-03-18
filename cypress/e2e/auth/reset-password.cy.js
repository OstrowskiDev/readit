describe('Reset Password Page', () => {
  const baseUrl = Cypress.env('BASE_URL')
  const password = Cypress.env('TEST_USER_PASSWORD')
  const newPassword = Cypress.env('TEST_USER_NEW_PASSWORD')
  const userEmail = Cypress.env('TEST_USER_EMAIL')
  const testUserSecret = Cypress.env('TEST_USER_SECRET')

  describe('Render And Validation Errors Tests', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/account/reset-password`)
    })

    it('should render reset password page', () => {
      cy.get('.password-change-new-password-input').should('be.visible')
      cy.get('.password-change-repeat-password-input').should('be.visible')
      cy.get('.password-change-submit-button').should('be.visible')
    })

    it('should show error message when password filed is empty', () => {
      cy.get('.password-change-submit-button').click()
      cy.contains('This field is required.').should('be.visible')
    })

    it('should show error message when passwords are not matching', () => {
      cy.get('.password-change-new-password-input').type(newPassword)
      cy.get('.password-change-repeat-password-input').type(password)
      cy.get('.password-change-submit-button').click()
      cy.contains('Passwords do not match').should('be.visible')
    })

    it('should show error message when password is invalid', () => {
      cy.get('.password-change-new-password-input').type('password')
      cy.get('.password-change-repeat-password-input').type('password')
      cy.get('.password-change-submit-button').click()
      cy.contains(
        'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
      ).should('be.visible')
    })
  })

  describe('Changing Password Test', () => {
    it('should navigate to forgot password page adn request password reset', () => {
      cy.visit(`${baseUrl}/account/forgot-password`)
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

    it('should successfully change password', () => {
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
        cy.get('.password-change-new-password-input').type(newPassword)
        cy.get('.password-change-repeat-password-input').type(newPassword)
        cy.get('.password-change-submit-button').click()
        cy.url({ timeout: 6000 }).should(
          'includes',
          '/account/password-changed',
        )
      })
    })

    after(() => {
      cy.log('clean up: reset password')
      sendPasswordResetRequest()
      activatePasswordResetLink()
      resetPassword()

      function sendPasswordResetRequest() {
        cy.visit(`${baseUrl}/account/forgot-password`)
        cy.get('#email').type(userEmail)
        cy.get('.password-recovery-submit-button').click()
        cy.url({ timeout: 6000 }).should('include', '/account/forgot-password')
        cy.contains('Email Sent').should('be.visible')
      }

      function activatePasswordResetLink() {
        cy.request({
          method: 'POST',
          url: `${baseUrl}/api/tests/reset-test-user-password`,
          body: { secret: testUserSecret },
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
      }

      function resetPassword() {
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
          cy.get('.password-change-new-password-input').type(password)
          cy.get('.password-change-repeat-password-input').type(password)
          cy.get('.password-change-submit-button').click()
          cy.url({ timeout: 6000 }).should(
            'includes',
            '/account/password-changed',
          )
        })
      }
    })
  })
})

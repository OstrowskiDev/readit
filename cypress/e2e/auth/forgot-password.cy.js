describe('Forgot Password Page', () => {
  const baseUrl = Cypress.env('BASE_URL')
  beforeEach(() => {
    cy.visit(`${baseUrl}/account/forgot-password`)
  })

  it('should render input field and submit button', () => {
    cy.get('#email').should('be.visible')
    cy.get('.password-recovery-submit-button').should('be.visible')
  })

  it('should display validation message for invalid email', () => {
    cy.get('#email').type('invalid-email')
    cy.get('form').submit()
    cy.contains('Please enter valid email address.').should('be.visible')
  })

  it('should submit form successfully with a valid email', () => {
    cy.intercept('POST', '/api/recovery-email', { statusCode: 200 }).as(
      'recoveryRequest',
    )
    cy.get('#email').type('test@example.com')
    cy.get('form').submit()
    cy.wait('@recoveryRequest')
    cy.url().should('include', '/account/recovery-email-send')
  })
})

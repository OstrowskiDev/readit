const baseUrl = Cypress.env('BASE_URL')

describe('Prepare environment before tests.', () => {
  it('should delete testUser', () => {
    cy.deleteTestUser()
  })
  it('should create active testUser', () => {
    cy.createActivatedTestUser()
  })
})

describe('Update users profile', () => {
  beforeEach(() => {
    cy.login()
    cy.visit(`${baseUrl}/my-profile`)
  })

  it('should render my-profile page', () => {
    cy.get('.profile-label-about').should('be.visible')
    cy.get('.avatar-container').should('be.visible')
    cy.get('.profile-about').should('be.visible')
    cy.get('.profile-my-data').should('be.visible')
    cy.get('.profile-settings').should('be.visible')
    cy.get('.avatar-edit-btn').should('be.visible')
    cy.get('.about-edit-btn').should('be.visible')
    cy.get('.my-data-edit-btn').should('be.visible')
  })

  it('should change users avatar', () => {
    cy.get('.avatar-edit-btn').click()
    cy.wait(2000)
    cy.get('.avatar-seed-annie').click()
    cy.get('.avatar-color-yellow').click()
    cy.get('.form-submit-button').click()
    cy.wait(2000)
    cy.get('.avatar-annie-yellow').should('be.visible')
  })
})

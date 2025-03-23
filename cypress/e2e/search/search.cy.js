const baseUrl = Cypress.env('BASE_URL')

describe('Search Bar And Filter Options Tests', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/posts`)
  })

  it('should render search bar and filter options', () => {
    cy.get('.filter-btn').click()
    cy.get('.filter-title-input').should('be.visible')
    cy.get('.filter-author-input').should('be.visible')
    cy.get('.filter-content-input').should('be.visible')
    cy.get('.filter-sort-by-input').should('be.visible')
    cy.get('.filter-sort-order-input').should('be.visible')
    cy.get('.post-reply-submit-btn').should('be.visible')
  })

  it('should find Welcome post', () => {
    cy.get('.filter-btn').click()
    cy.get('.filter-title-input').type('Welcome')
    cy.get('.filter-author-input').type('Marcin Ostrowski')
    cy.get('.post-reply-submit-btn').click()
    cy.url().should(
      'include',
      '?title=Welcome&author=Marcin+Ostrowski&sortBy=time&sortOrder=descending',
    )
    cy.get('.header-author').should('contain', 'Marcin Ostrowski')
    cy.get('.post-title').should('contain', 'Welcome')
  })

  it('should find Bob Smith posts and sort them properly', () => {
    cy.get('.filter-btn').click()
    cy.get('.filter-author-input').type('Bob Smith')
    cy.get('.filter-sort-by-input').select('activity')
    cy.get('.filter-sort-order-input').select('descending')
    cy.get('.post-reply-submit-btn').click()
  })
})

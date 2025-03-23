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

  it('should sort posts by activity in ascending/descending order', () => {
    cy.get('.filter-btn').click()
    cy.get('.filter-author-input').type('Bob Smith')
    cy.get('.filter-sort-by-input').select('activity')
    cy.get('.filter-sort-order-input').select('descending')
    cy.get('.filter-options-submit-btn').click()
    cy.get('.post-container')
      .first()
      .find('.post-title')
      .should('contain', 'Nostrud Exercitation Minim Veniam')
    cy.get('.filter-sort-order-input').select('ascending')
    cy.get('.filter-options-submit-btn').click()
    cy.get('.post-container')
      .first()
      .find('.post-title')
      .should('contain', 'Ullamco Laboris Nisi Consectetur')
  })

  it('should sort posts by popularity in ascending/descending order', () => {
    cy.get('.filter-btn').click()
    cy.get('.filter-author-input').type('Bob Smith')
    cy.get('.filter-sort-by-input').select('popularity')
    cy.get('.filter-sort-order-input').select('descending')
    cy.get('.filter-options-submit-btn').click()
    cy.get('.post-container')
      .first()
      .find('.post-title')
      .should('contain', 'Nostrud Exercitation Minim Veniam')
    cy.get('.filter-sort-order-input').select('ascending')
    cy.get('.filter-options-submit-btn').click()
    cy.get('.post-container')
      .first()
      .find('.post-title')
      .should('contain', 'Loading implementation tests incoming')
  })
})

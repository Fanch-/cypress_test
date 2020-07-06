/// <reference types="cypress" />

describe('FILE 1', () => {
  beforeEach(() => {
    cy.server()
    cy.task('log','before each of file 1')
    cy.visit('https://example.cypress.io/commands/location')
  })

  afterEach(() => {
    cy.task('log','after each of file 1 ******')
  })

  it('file 1 test 1', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty')
  })

  it('file 1 test 2', () => {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
    })
  })

  it('file 1 test 3', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', 'https://example.cypress.io/commands/location')
  })
})

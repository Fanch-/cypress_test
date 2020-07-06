/// <reference types="cypress" />

describe('FILE 2', () => {
  beforeEach(() => {
    cy.task('log','before each of file 2')
    //no cy.visit here
  })

  afterEach(() => {
    cy.task('log','after each of file 2')
  })

  it('file 2 test 1', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top')
  })

  it('file 2 test 2', () => {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('file 2 test 3', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink')
  })
})

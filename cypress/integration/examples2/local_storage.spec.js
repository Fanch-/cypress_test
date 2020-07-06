/// <reference types="cypress" />

describe('CONTEXT Local Storage test', () => {

  it('IT clear all data in local storage', () => {

    cy.get('.ls-btn').click().should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red')
      expect(localStorage.getItem('prop2')).to.eq('blue')
      expect(localStorage.getItem('prop3')).to.eq('magenta')
    })
  })
})

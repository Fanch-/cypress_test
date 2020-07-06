// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

/**
 * Don't care about
 * @returns {string}
 */


beforeEach(function(){
    cy.task('log', Cypress.env('qaeApi'))
    if (Cypress.env('qaeApi') === 'true') {
        cy.startTest(this.currentTest.title, 'cypress')
    }
})

afterEach(function(){
    if (Cypress.env('qaeApi') === 'true') {
        let body = ''
        if (this.currentTest.state  === 'failed') {
            body = {errorMessage: this.currentTest.err.stack, ft: 'IDENTITY'}
        }
        cy.stopTest(this.currentTest.state, body)
    }
});

// require('./commands')

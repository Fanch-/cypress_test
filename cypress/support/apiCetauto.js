/**********************************************************************************************
 * SWAGGER : http://mac-lab.leboncoin.lan:4567/
 **********************************************************************************************/

import {CETAUTOMATIX} from "../../config";

/**
 * startTest
 */
Cypress.Commands.add('startTest', (testName, ft) => {
  const options = {
    method: 'POST',
    url: `${CETAUTOMATIX}/test/start/${Cypress.env('reportId')}`,
    body: {
      testName,
      className : ft
    }
  }
  cy.request(options).then( (response) => {
    Cypress.env('testId', response.body)
  })
})

/**
 * stopTest
 */
Cypress.Commands.add('stopTest', (status, body) => {
  const endPoint = status === 'passed' ? '/success' : '/fail';
  const options = {
    method: 'PUT',
    url: `${CETAUTOMATIX}/test/${Cypress.env('testId')}${endPoint}`,
    body
  }
  cy.request(options)
})
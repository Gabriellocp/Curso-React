import * as Helpers from '../support/helpers'

describe('Private Routes', () => {
   it('Shoulg logout if survey-listy has no token',()=>{
    cy.visit('')
    Helpers.testUrl('/login')
   })
})
import * as Helpers from '../utils/helpers'
describe('Private Routes', () => {
   it('Shoulg logout if survey-listy has no token',()=>{
    cy.visit('')
    Helpers.testUrl('/login')
   })
   it('Shoulg logout if survey-result has no token',()=>{
      cy.visit('/surveys/any_id')
      Helpers.testUrl('/login')
     })
})
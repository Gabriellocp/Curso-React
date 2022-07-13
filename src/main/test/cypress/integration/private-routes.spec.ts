import * as Helpers from '../utils/helpers'
describe('Private Routes', () => {
   it('Shoulg logout if survey-listy has no token',()=>{
    cy.visit('')
    Helpers.testUrl('/login')
   })
})
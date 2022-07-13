import faker from 'faker'
import * as Http from '../support/survey-list-mocks'
import * as Helpers from '../support/helpers'
const minPassLength: number = 5

const simulateValidSubmit = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
}
describe('SurveyList', () => {
    beforeEach(() => {
        Helpers.setLocalStorageItem('account',{accessToken:faker.random.uuid(), name: faker.name.findName()})
        cy.visit('')
    })
    it('Should present error on UnexpectedError', () => {
        Http.mockUnexpectedError()
        //If some type of error occurs, put cy.visit('') here
        cy.getByTestId('error').should('contain.text','Aconteceu algo inesperado...')
    })
    it('Should logout on AccessDeniedError', () => {
        Http.mockAccessDeniedError()
        //If some type of error occurs, put cy.visit('') here
        Helpers.testUrl('/login')
    })
})
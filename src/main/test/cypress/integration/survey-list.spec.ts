import faker from 'faker'
import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'
const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path)

describe('SurveyList', () => {
    beforeEach(() => {
        cy.fixture('account').then(account=>{
            Helpers.setLocalStorageItem('account',account)
        })
        cy.visit('')
    })
    it('Should present error on UnexpectedError', () => {
        mockUnexpectedError()
        //If some type of error occurs, put cy.visit('') here
        cy.getByTestId('error').should('contain.text','Aconteceu algo inesperado...')
    })
    it('Should logout on AccessDeniedError', () => {
        mockAccessDeniedError()
        //If some type of error occurs, put cy.visit('') here
        Helpers.testUrl('/login')
    })
    it('Should present correct username', () => {
        mockUnexpectedError()
        //If some type of error occurs, put cy.visit('') here
        const {name} = Helpers.getLocalStorageItem('account')
        cy.getByTestId('username').should('contain.text',name)
    })
    it('Should logout when button is clicked', () => {
        mockUnexpectedError()
        //If some type of error occurs, put cy.visit('') here
        cy.getByTestId('logout').click()
        Helpers.testUrl('/login')
    })
})
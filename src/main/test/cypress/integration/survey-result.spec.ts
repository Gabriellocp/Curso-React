import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'
const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockSuccess = () : void => Http.mockOk(path, 'survey-result')
const mockAccessDeniedError = ():void => Http.mockForbiddenError(path)
describe('SurveyResult', () => {
    beforeEach(() => {
        cy.fixture('account').then(account=>{
            Helpers.setLocalStorageItem('account',account)
        })
    })
    it('Should present error on UnexpectedError', () => {
        cy.visit('/surveys/any_id')
        mockUnexpectedError()
        cy.getByTestId('error').should('contain.text','Aconteceu algo inesperado...')
    })
    it('Should reload page when button is clicked', () => {
        cy.visit('/surveys/any_id')
        mockUnexpectedError()
        cy.getByTestId('error').should('contain.text','Aconteceu algo inesperado...')
        mockSuccess()
        cy.getByTestId('reload').click()
        cy.getByTestId('question').should('exist')
    })
    it('Should logout on AccessDeniedError', () => {
        cy.visit('/surveys/any_id')
        mockAccessDeniedError()
        Helpers.testUrl('/login')
    })
    
})
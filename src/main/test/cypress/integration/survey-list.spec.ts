import faker from 'faker'
import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'
const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path,'survey-list', 'GET')
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
        mockSuccess()
        cy.getByTestId('reload').click()
        cy.get('li:not(:empty)').should('have.length',2)
    })
    it('Should reload on button click', () => {
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
    it('Should present survey items', () => {
        mockSuccess()
        //If some type of error occurs, put cy.visit('') here
        cy.get('li:empty').should('have.length',4)
        cy.get('li:not(:empty)').should('have.length',2)
        cy.get('li:nth-child(1)').then(li=>{
            assert.equal(li.find('[data-testid="day"]').text(),'03')
            assert.equal(li.find('[data-testid="month"]').text(),'fev')
            assert.equal(li.find('[data-testid="year"]').text(),'2018')
            assert.equal(li.find('[data-testid="question"]').text(),'Question 01')
            assert.equal(li.find('[data-testid="icon"]').text(),'👍')

        })
        cy.get('li:nth-child(2)').then(li=>{
            assert.equal(li.find('[data-testid="day"]').text(),'03')
            assert.equal(li.find('[data-testid="month"]').text(),'fev')
            assert.equal(li.find('[data-testid="year"]').text(),'2020')
            assert.equal(li.find('[data-testid="question"]').text(),'Question 02')
            assert.equal(li.find('[data-testid="icon"]').text(),'👎')

        })

    })
})
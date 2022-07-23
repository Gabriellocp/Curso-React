import faker from 'faker'
import * as FormHelper from '../utils/form-helper'
import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'
const minPassLength: number = 5

const path = /login/
const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path)
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockSuccess = (): void =>  Http.mockOk(path,'account')
const simulateValidSubmit = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
}
describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
    it('Should load with correct initial state', () => {
        cy.getByTestId('email')
            .should('have.attr', 'readOnly')
        FormHelper.helperInputStatus('email', 'Campo obrigatório')
        cy.getByTestId('password')
            .should('have.attr', 'readOnly')
        FormHelper.helperInputStatus('password', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.helperInputStatus('email', 'email inválido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(2))
        FormHelper.helperInputStatus('password', `Campo deve ter ${minPassLength} caracteres`)
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.helperInputStatus('email')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        FormHelper.helperInputStatus('password')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error if invalid credentials are provided (ERROR 401)', () => {
        mockInvalidCredentialsError()
        simulateValidSubmit()
        FormHelper.testMainError('Credenciais inválidas')
        Helpers.testUrl('/login')

    })
    it('Should present unexpected error (ERROR 400)', () => {
        mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Aconteceu algo inesperado...')
        Helpers.testUrl('/login')
    })
    it('Should present save AccessToken if valid credentials are provided', () => {
        mockSuccess()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.exist')
        Helpers.testUrl('/')
        Helpers.testLocalStorageItem('account')
    })

    it('Should prevent multiple submits', () => {
        mockSuccess()
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').dblclick()
        Helpers.testUrl('/')
        cy.wait('@request')
        Helpers.testHttpCallsCount(1)
    })
    it('Should prevent invalid form on submit', () => {
        mockSuccess()
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        Helpers.testHttpCallsCount(0)
    })


})
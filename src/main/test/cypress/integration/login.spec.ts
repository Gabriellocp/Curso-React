import faker from 'faker'
import * as FormHelper from '../support/form-helper'
import * as HttpMock from '../support/login-mocks'
const minPassLength: number = 5

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
        FormHelper.helperInputStatus('email')
        FormHelper.helperInputStatus('password')
        simulateValidSubmit()
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error if invalid credentials are provided (ERROR 401)', () => {
        HttpMock.mockInvalidCredentialsError()
        simulateValidSubmit()
        FormHelper.testMainError('Credenciais inválidas')
        FormHelper.testUrl('/login')

    })
    it('Should present unexpected error (ERROR 400)', () => {
        HttpMock.mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Aconteceu algo inesperado...')
        FormHelper.testUrl('/login')
    })
    it('Should present error if invalid property is returned', () => {
        HttpMock.mockInvalidData()
        simulateValidSubmit()
        FormHelper.testMainError('Aconteceu algo inesperado...')
        FormHelper.testUrl('/login')
    })

    it('Should present save AccessToken if valid credentials are provided', () => {
        HttpMock.mockOk()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.exist')
        FormHelper.testUrl('/')
        FormHelper.testLocalStorageItem('accessToken')
    })

    it('Should prevent multiple submits', () => {
        HttpMock.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').dblclick()
        FormHelper.testUrl('/')
        FormHelper.testLocalStorageItem('accessToken')
        FormHelper.testHttpCallsCount(1)
    })
    it('Should prevent invalid form on submit', () => {
        HttpMock.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        FormHelper.testHttpCallsCount(0)
    })


})
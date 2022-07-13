import * as FormHelper from '../utils/form-helper'
import * as Http from '../utils/http-mocks'
import * as Helpers from '../utils/helpers'
import faker from 'faker'

const minPassLength: number = 5
const minNameLength: number = 2
const path = /signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path)
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockSuccess = (): void => Http.mockOk(path, 'account')

const simulateValidSubmit = (): void => {
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)
    cy.getByTestId('submit').click()
}
describe('Signup', () => {
    beforeEach(() => {
        cy.visit('signup')
    })
    it('Should load with correct initial state', () => {
        cy.getByTestId('name')
            .should('have.attr', 'readOnly')
        FormHelper.helperInputStatus('name', 'Campo obrigatório')
        cy.getByTestId('email')
            .should('have.attr', 'readOnly')
        FormHelper.helperInputStatus('email', 'Campo obrigatório')
        cy.getByTestId('password')
            .should('have.attr', 'readOnly')
        FormHelper.helperInputStatus('password', 'Campo obrigatório')
        cy.getByTestId('passwordConfirmation')
            .should('have.attr', 'readOnly')
        FormHelper.helperInputStatus('passwordConfirmation', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error state if form is invalid', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(1))
        FormHelper.helperInputStatus('name', `Campo deve ter ${minNameLength} caracteres`)
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.helperInputStatus('email', 'email inválido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(2))
        FormHelper.helperInputStatus('password', `Campo deve ter ${minPassLength} caracteres`)
        cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
        FormHelper.helperInputStatus('passwordConfirmation', `Campo deve ter ${minPassLength} caracteres`)
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present valid state if form is valid', () => {
        const password = faker.random.alphaNumeric(5)
        cy.getByTestId('name').focus().type(faker.name.findName())
        FormHelper.helperInputStatus('name')
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.helperInputStatus('email')
        cy.getByTestId('password').focus().type(password)
        FormHelper.helperInputStatus('password')
        cy.getByTestId('passwordConfirmation').focus().type(password)
        FormHelper.helperInputStatus('passwordConfirmation')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present EmailInUse error (ERROR 403)', () => {
        mockEmailInUseError()
        simulateValidSubmit()
        FormHelper.testMainError('E-mail já está sendo usado')
        Helpers.testUrl('/signup')

    })
    it('Should present unexpected error (ERROR 400)', () => {
        mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Aconteceu algo inesperado...')
        Helpers.testUrl('/signup')
    })
    it('Should present save Account if valid credentials are provided', () => {
        mockSuccess()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.exist')
        Helpers.testUrl('/')
        Helpers.testLocalStorageItem('account')
    })
    it('Should prevent multiple submits', () => {
        const password = faker.random.alphaNumeric(5)
        mockSuccess()
        cy.getByTestId('name').focus().type(faker.name.findName())
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(password)
        cy.getByTestId('passwordConfirmation').focus().type(password)
        cy.getByTestId('submit').dblclick()
        Helpers.testUrl('/')
        Helpers.testHttpCallsCount(1)
    })
    it('Should prevent invalid form on submit', () => {
        mockSuccess()
        cy.getByTestId('name').focus().type(faker.name.findName()).type('{enter}')
        Helpers.testHttpCallsCount(0)
    })
}
)
import * as FormHelper from '../support/form-helper'
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

}
)
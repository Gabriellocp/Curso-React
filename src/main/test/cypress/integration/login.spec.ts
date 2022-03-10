import faker from 'faker'
describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
    const minPassLength = 5
    it('Should load with correct initial state', () => {
        cy.getByTestId('emailStatus')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '😭')
        cy.getByTestId('passwordStatus')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '😭')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        cy.getByTestId('emailStatus')
            .should('have.attr', 'title', 'email inválido')
            .should('contain.text', '😭')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(2))
        cy.getByTestId('passwordStatus')
            .should('have.attr', 'title', `Campo deve ter ${minPassLength} caracteres`)
            .should('contain.text', '😭')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

})
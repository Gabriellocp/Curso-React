import faker from 'faker'
const minPassLength = 5
const baseUrl: string = Cypress.config().baseUrl
describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
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
    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('emailStatus')
            .should('have.attr', 'title', 'Tudo certo')
            .should('contain.text', '😎')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('passwordStatus')
            .should('have.attr', 'title', 'Tudo certo')
            .should('contain.text', '😎')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error if invalid credentials are provided', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('error-wrap')
            .getByTestId('spinner').should('exist')
            .getByTestId('mainError').should('not.exist')
            .getByTestId('spinner').should('not.exist')
            .getByTestId('mainError').should('contain.text', 'Credenciais inválidas')
        cy.url().should('eq', `${baseUrl}/login`)
    })

})
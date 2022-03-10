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
})
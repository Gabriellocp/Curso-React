import faker from 'faker'
const minPassLength = 5
const baseUrl: string = Cypress.config().baseUrl
describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
    it('Should load with correct initial state', () => {
        cy.getByTestId('email-wrap')
            .should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('email')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('have.attr', 'readOnly')
        cy.getByTestId('email-label')
            .should('have.attr', 'title', 'Campo obrigatório')
        cy.getByTestId('password-wrap')
            .should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('password')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('have.attr', 'readOnly')
        cy.getByTestId('password-label')
            .should('have.attr', 'title', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        cy.getByTestId('email-wrap')
            .should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('email')
            .should('have.attr', 'title', 'email inválido')
        cy.getByTestId('email-label')
            .should('have.attr', 'title', 'email inválido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(2))
        cy.getByTestId('password-wrap')
            .should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('password')
            .should('have.attr', 'title', `Campo deve ter ${minPassLength} caracteres`)
        cy.getByTestId('password-label')
            .should('have.attr', 'title', `Campo deve ter ${minPassLength} caracteres`)

        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('email-wrap')
            .should('have.attr', 'data-status', 'valid')
        cy.getByTestId('email')
            .should('not.have.attr', 'title')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('password-wrap')
            .should('have.attr', 'data-status', 'valid')
        cy.getByTestId('password')
            .should('not.have.attr', 'title')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })
    it('Should present error if invalid credentials are provided (ERROR 401)', () => {
        cy.intercept(/login/, {
            statusCode: 401,
            error: faker.random.words()

        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('error-wrap')
            .getByTestId('spinner').should('not.exist')
            .getByTestId('mainError').should('contain.text', 'Credenciais inválidas')
        cy.url().should('eq', `${baseUrl}/login`)
    })
    it('Should present unexpected error (ERROR 400)', () => {
        cy.intercept(/login/, {
            statusCode: 400,
            error: faker.random.words()

        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('error-wrap')
            .getByTestId('spinner').should('not.exist')
            .getByTestId('mainError').should('contain.text', 'Aconteceu algo inesperado...')
        cy.url().should('eq', `${baseUrl}/login`)
    })
    it('Should present error if invalid property is returned', () => {
        cy.intercept(/login/, {
            statusCode: 200,
            body: {
                invalidProperty: faker.random.uuid(),
                error: faker.random.words()
            }

        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('mainError').should('exist')
        cy.getByTestId('spinner').should('not.exist')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('Should present save AccessToken if valid credentials are provided', () => {
        cy.intercept(/login/, {
            statusCode: 200,
            body: {
                accessToken: faker.random.uuid(),
                error: faker.random.words()
            }

        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').click()
        cy.getByTestId('mainError').should('not.exist')
        cy.getByTestId('spinner').should('not.exist')
        cy.url().should('eq', `${baseUrl}/`)
        cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
    })

    it('Should prevent multiple submits', () => {
        cy.intercept(/login/, {
            statusCode: 200,
            body: {
                accessToken: faker.random.uuid(),
                error: faker.random.words()
            }

        }).as('mockedResponse')
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('submit').dblclick()
        cy.url().should('eq', `${baseUrl}/`)
        cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
        cy.get('@mockedResponse.all').should('have.length', 1)
    })
    it('Should prevent invalid form on submit', () => {
        cy.intercept(/login/, {
            statusCode: 200,
            body: {
                accessToken: faker.random.uuid(),
                error: faker.random.words()
            }

        }).as('mockedResponse')
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        cy.get('@mockedResponse.all').should('have.length', 0)
    })


})
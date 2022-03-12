import faker from 'faker'
export const mockInvalidCredentialsError = (pathUrl: RegExp): void => {
    cy.intercept(pathUrl, {
        statusCode: 401,
        error: faker.random.words()

    }).as('request')
}

export const mockUnexpectedError = (pathUrl: RegExp): void => {
    cy.intercept(pathUrl, {
        statusCode: faker.helpers.randomize([400, 404, 500]),
        error: faker.random.words()

    }).as('request')
}

export const mockOk = (pathUrl: RegExp, response: any): void => {
    cy.intercept(pathUrl, {
        statusCode: 200,
        body: response
    }).as('request')
}

export const mockEmailInUseError = (pathUrl: RegExp): void => {
    cy.intercept(pathUrl, {
        statusCode: 403,
        error: faker.random.words()

    }).as('request')
}
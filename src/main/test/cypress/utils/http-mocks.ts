import faker from 'faker'
export const mockUnauthorizedError = (pathUrl: RegExp, method: string): void => {
    cy.intercept({method, url:pathUrl}, {
        statusCode: 401,
        error: faker.random.words()

    }).as('request')
}

export const mockServerError = (pathUrl: RegExp, method: string): void => {
    cy.intercept({method, url:pathUrl}, {
        statusCode: faker.helpers.randomize([400, 404, 500]),
        error: faker.random.words()

    }).as('request')
}

export const mockOk = (pathUrl: RegExp, response: any, method: string): void => {
    cy.fixture(response).then(
        resp=>{
            cy.intercept({method,url:pathUrl}, {
                statusCode: 200,
                body: resp
            }).as('request')
        }
    )
   
}

export const mockForbiddenError = (pathUrl: RegExp, method: string): void => {
    cy.intercept({method, url:pathUrl}, {
        statusCode: 403,
        error: faker.random.words()

    }).as('request')
}
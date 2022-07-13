const baseUrl: string = Cypress.config().baseUrl

export const testHttpCallsCount = (count: number): void => {
    cy.get('@request.all').should('have.length', count)
}

export const testUrl = (pathUrl: string): void => {
    cy.url().should('eq', `${baseUrl}${pathUrl}`)

}

export const testLocalStorageItem = (key: string): void => {
    cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))

}
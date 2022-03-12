import * as Helper from '../support/http-mocks'
import faker from 'faker'
export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/)
export const mockOk = (): void => Helper.mockOk(/login/, {
    accessToken: faker.random.uuid(),
    error: faker.random.words()
})

export const mockInvalidData = (): void => Helper.mockOk(/login/, {
    invalidProperty: faker.random.uuid(),
    error: faker.random.words()
})
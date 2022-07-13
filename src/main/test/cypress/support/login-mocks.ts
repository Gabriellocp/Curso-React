import * as Helper from './http-mocks'
import faker from 'faker'
export const mockInvalidCredentialsError = (): void => Helper.mockUnauthorizedError(/login/)
export const mockUnexpectedError = (): void => Helper.mockServerError(/login/)
export const mockOk = (): void => Helper.mockOk(/login/, {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
    error: faker.random.words()
})
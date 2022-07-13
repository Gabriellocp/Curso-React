import * as Helper from './http-mocks'
import faker from 'faker'
export const mockEmailInUseError = (): void => Helper.mockForbiddenError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockServerError(/signup/)
export const mockOk = (): void => Helper.mockOk(/signup/, {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
    error: faker.random.words()
})
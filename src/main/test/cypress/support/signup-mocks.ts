import * as Helper from './http-mocks'
import faker from 'faker'
export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/)
export const mockInvalidData = (): void => Helper.mockOk(/signup/, {
    invalidProperty: faker.random.uuid(),
    error: faker.random.words()
})
export const mockOk = (): void => Helper.mockOk(/signup/, {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
    error: faker.random.words()
})
import * as Helper from './http-mocks'
import faker from 'faker'
export const mockUnexpectedError = (): void => Helper.mockServerError(/surveys/)

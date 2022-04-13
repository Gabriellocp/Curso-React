import faker from 'faker'
import { AddAccount } from '../usecases'
import { mockAccountModel } from './mock-account'

export const mockAddAccount = (): AddAccount.Params => {
    const password = faker.internet.password()
    return {
        email: faker.internet.email(),
        password,
        passwordConfirmation: password,
        name: faker.name.findName()
    }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()
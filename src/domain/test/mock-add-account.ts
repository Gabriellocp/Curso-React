import faker from 'faker'
import { AddAccountParams } from '../usecases/add-account'

export const mockAddAccount = (): AddAccountParams => {
    const password = faker.internet.password()
    return {
        email: faker.internet.email(),
        password,
        passwordConfirmation: password,
        name: faker.name.findName()
    }
}

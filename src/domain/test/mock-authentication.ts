import { mockAccountModel } from "@/domain/test"
import { Authentication } from "@/domain/usecases"
import faker from 'faker'
export class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: Authentication.Params
    callsCount = 0
    async auth(params: Authentication.Params): Promise<Authentication.Model> {
        this.params = params
        this.callsCount++
        return this.account
    }

}

export const mockAuthentication = (): Authentication.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()

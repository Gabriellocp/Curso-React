import { HttpPostClientSpy } from "@/data/test"
import faker from 'faker'
import { AccountModel } from "@/domain/models"
import { mockAccountModel, mockAddAccount } from "@/domain/test"
import { RemoteAddAccount } from "./remote-add-account"
import { HttpStatusCode } from "@/data/protocols/http"
import { EmailInUseError, UnexpectedError } from "@/domain/errors"

type SutType = {
    httpPostClientSpy: HttpPostClientSpy<AccountModel>
    sut: RemoteAddAccount
}

const makeSut = (url: string = faker.internet.url()): SutType => {
    const httpPostClientSpy = new HttpPostClientSpy<AccountModel>()
    const sut = new RemoteAddAccount(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}
describe('RemoteAddAccount', () => {
    test('Should call HttpClient with correct URL', async () => {

        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)
        await sut.add(mockAddAccount())
        expect(httpPostClientSpy.url).toBe(url)
    })
    test('Should call HttpClient with correct body', async () => {
        const addAccountParams = mockAddAccount()
        const { sut, httpPostClientSpy } = makeSut()
        await sut.add(addAccountParams)
        expect(httpPostClientSpy.body).toEqual(addAccountParams)
    })
    test('Should throw email in use error if HttpClient returns 403', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new EmailInUseError())
    })
    test('Should throw unexpected error if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw unexpected error if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw unexpected error if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should return AccountModel if HttpPostClient returns 200 (OK!)', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const account = await sut.add(mockAddAccount())
        expect(account).toEqual(httpResult)
    })
})

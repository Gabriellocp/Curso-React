import { HttpClientSpy } from "@/data/test"
import faker from 'faker'
import { mockAddAccountModel, mockAddAccount } from "@/domain/test"
import { RemoteAddAccount } from "./remote-add-account"
import { HttpStatusCode } from "@/data/protocols/http"
import { EmailInUseError, UnexpectedError } from "@/domain/errors"

type SutType = {
    httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
    sut: RemoteAddAccount
}

const makeSut = (url: string = faker.internet.url()): SutType => {
    const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
    const sut = new RemoteAddAccount(url, httpClientSpy)
    return {
        sut,
        httpClientSpy
    }
}
describe('RemoteAddAccount', () => {
    test('Should call HttpClient with correct values', async () => {

        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        const addAccountParams = mockAddAccount()
        await sut.add(addAccountParams)
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('post')
        expect(httpClientSpy.body).toEqual(addAccountParams)     
    })
    test('Should throw email in use error if HttpClient returns 403', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new EmailInUseError())
    })
    test('Should throw unexpected error if HttpPostClient returns 400', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw unexpected error if HttpPostClient returns 500', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw unexpected error if HttpPostClient returns 404', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.add(mockAddAccount())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should return AccountModel if HttpPostClient returns 200 (OK!)', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpResult = mockAddAccountModel()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const account = await sut.add(mockAddAccount())
        expect(account).toEqual(httpResult)
    })
})

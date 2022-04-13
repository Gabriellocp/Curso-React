import { HttpGetParams } from "@/data/protocols/http"
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from "@/data/test"
import { mockAccountModel } from "@/domain/test"
import { AuthorizeHttpClientDecorator } from "@/main/decorators"
import faker from 'faker'
type SutTypes = {
    sut: AuthorizeHttpClientDecorator
    getStorageSpy: GetStorageSpy
    httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpGetClientSpy)
    return {
        sut,
        getStorageSpy,
        httpGetClientSpy
    }
}

describe('AuthorizeHttpClientDecorator', () => {
    test('Should call GetStorage with correct value', async () => {
        const { sut, getStorageSpy } = makeSut()
        await sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })
    test('Should NOT add headers if getStorage is invalid', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        const httpRequestMock: HttpGetParams = {
            url: faker.internet.url(),
            headers: {
                field: faker.random.words()
            }
        }
        await sut.get(httpRequestMock)
        expect(httpGetClientSpy.url).toBe(httpRequestMock.url)
        expect(httpGetClientSpy.headers).toEqual(httpRequestMock.headers)
    })
    test('Should add headers to HttpGetClient', async () => {
        const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
        getStorageSpy.value = mockAccountModel()
        const httpRequestMock: HttpGetParams = {
            url: faker.internet.url()
        }
        await sut.get(httpRequestMock)
        expect(httpGetClientSpy.url).toBe(httpRequestMock.url)
        expect(httpGetClientSpy.headers).toEqual({
            'x-access-token': getStorageSpy.value.accessToken
        })
    })
    test('Should merge headers to HttpGetClient', async () => {
        const field = faker.random.words()
        const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
        getStorageSpy.value = mockAccountModel()
        const httpRequestMock: HttpGetParams = {
            url: faker.internet.url(),
            headers: {
                field: field
            }
        }
        await sut.get(httpRequestMock)
        expect(httpGetClientSpy.url).toBe(httpRequestMock.url)
        expect(httpGetClientSpy.headers).toEqual({
            field: field,
            'x-access-token': getStorageSpy.value.accessToken
        })
    })
})
import { HttpRequest } from "@/data/protocols/http"
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from "@/data/test"
import { mockAccountModel } from "@/domain/test"
import { AuthorizeHttpClientDecorator } from "@/main/decorators"
import faker from 'faker'
type SutTypes = {
    sut: AuthorizeHttpClientDecorator
    getStorageSpy: GetStorageSpy
    httpGetClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const httpGetClientSpy = new HttpClientSpy()
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
        await sut.request(mockHttpRequest())
        expect(getStorageSpy.key).toBe('account')
    })
    test('Should NOT add headers if getStorage is invalid', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        const httpRequestMock: HttpRequest = {
            url: faker.internet.url(),
            method: faker.random.arrayElement(['get','post','delete', 'put']),
            headers: {
                field: faker.random.words()
            }
        }
        await sut.request(httpRequestMock)
        expect(httpGetClientSpy.url).toBe(httpRequestMock.url)
        expect(httpGetClientSpy.headers).toEqual(httpRequestMock.headers)
    })
    test('Should add headers to HttpClient', async () => {
        const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
        getStorageSpy.value = mockAccountModel()
        const httpRequestMock: HttpRequest = {
            url: faker.internet.url(),
            method: faker.random.arrayElement(['get','post','delete', 'put'])
        }
        await sut.request(httpRequestMock)
        expect(httpGetClientSpy.url).toBe(httpRequestMock.url)
        expect(httpGetClientSpy.headers).toEqual({
            'x-access-token': getStorageSpy.value.accessToken
        })
    })
    test('Should merge headers to HttpClient', async () => {
        const field = faker.random.words()
        const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
        getStorageSpy.value = mockAccountModel()
        const httpRequestMock: HttpRequest = {
            url: faker.internet.url(),
            method: faker.random.arrayElement(['get','post','delete', 'put']),
            headers: {
                field: field
            }
        }
        await sut.request(httpRequestMock)
        expect(httpGetClientSpy.url).toBe(httpRequestMock.url)
        expect(httpGetClientSpy.headers).toEqual({
            field: field,
            'x-access-token': getStorageSpy.value.accessToken
        })
    })
    test('Should return same result as HttpClient', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        const httpResponse = await sut.request(mockHttpRequest())
        expect(httpResponse).toBe(httpGetClientSpy.response)

    })
})
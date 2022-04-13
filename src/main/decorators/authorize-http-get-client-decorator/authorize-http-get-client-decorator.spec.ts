import { GetStorageSpy, mockGetRequest } from "@/data/test"
import { AuthorizeHttpClientDecorator } from "@/main/decorators"

type SutTypes = {
    sut: AuthorizeHttpClientDecorator
    getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpClientDecorator(getStorageSpy)
    return {
        sut,
        getStorageSpy
    }
}

describe('AuthorizeHttpClientDecorator', () => {
    test('Should call GetStorage with correct value', () => {
        const { sut, getStorageSpy } = makeSut()
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })

})
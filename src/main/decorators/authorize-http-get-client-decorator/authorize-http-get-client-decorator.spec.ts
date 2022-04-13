import { GetStorageSpy, mockGetRequest } from "@/data/test"
import { AuthorizeHttpClientDecorator } from "@/main/decorators"

describe('AuthorizeHttpClientDecorator', () => {
    test('Should call GetStorage with correct value', () => {
        const getStorageSpy = new GetStorageSpy()
        const sut = new AuthorizeHttpClientDecorator(getStorageSpy)
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })
})
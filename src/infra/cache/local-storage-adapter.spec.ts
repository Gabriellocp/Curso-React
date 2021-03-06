import { AccountModel } from '@/domain/models'
import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => {
    return new LocalStorageAdapter()
}

describe('LocalStorageAdapter', () => {
    beforeEach(() => {
        localStorage.clear()
    })
    test('Should call localStorage.setItem with correct values', async () => {
        const key = faker.database.column()
        const value = faker.random.objectElement<AccountModel>()
        const sut = makeSut()
        sut.set(key, value)
        expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
    })
    test('Should call localStorage.getItem with correct values', async () => {
        const key = faker.database.column()
        const value = faker.random.objectElement<AccountModel>()
        const sut = makeSut()
        const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
        const object = sut.get(key)
        expect(object).toEqual(value)
        expect(getItemSpy).toHaveBeenCalledWith(key)
    })
    test('Should call localStorage.removeItem if value is null', async () => {
        const key = faker.database.column()
        const sut = makeSut()
        sut.set(key, undefined)
        expect(localStorage.removeItem).toHaveBeenCalledWith(key)
    })

})

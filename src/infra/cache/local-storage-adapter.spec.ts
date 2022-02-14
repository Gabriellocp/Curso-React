import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

describe('LocalStorageAdapter', () => {
    beforeEach(() => {
        localStorage.clear()
    })
    test('Should call localStorage with correct values', async () => {
        const key = faker.database.column()
        const value = faker.random.word()
        const sut = new LocalStorageAdapter()
        await sut.set(key, value)
        expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
    })
})

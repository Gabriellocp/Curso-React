import { SetStorageMock } from '@/data/test'
import { LocalUpdateCurrentAccount } from './local-update-current-account'
import faker from 'faker'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
    sut: LocalUpdateCurrentAccount
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalUpdateCurrentAccount(setStorageMock)
    return {
        sut,
        setStorageMock: setStorageMock
    }

}

describe('LocalUpdateCurrentAccount', () => {
    test('Should call SetStorage with correct value', async () => {
        const account = mockAccountModel()
        const { sut, setStorageMock } = makeSut()
        await sut.save(account)
        expect(setStorageMock.key).toBe('account')
        expect(setStorageMock.value).toBe(JSON.stringify(account))
    })
    test('Should throw if setStorage throws an exception', async () => {
        const { sut, setStorageMock } = makeSut()
        jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.save(mockAccountModel())
        await expect(promise).rejects.toThrow(new Error())
    })
    test('Should throw accessToken is falsy', async () => {
        const { sut, setStorageMock } = makeSut()
        const promise = sut.save(undefined)
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})

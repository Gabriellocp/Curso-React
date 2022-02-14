import { HttpPostClientSpy } from "@/data/test"
import faker from 'faker'
import { AddAccountParams } from "@/domain/usecases"
import { AccountModel } from "@/domain/models"
import { mockAddAccount } from "@/domain/test"
import { RemoteAddAccount } from "./remote-add-account"

type SutType = {
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
    sut: RemoteAddAccount
}

const makeSut = (url: string = faker.internet.url()): SutType => {
    const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
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
})

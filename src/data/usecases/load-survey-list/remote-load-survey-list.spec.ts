import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
    sut: RemoteLoadSurveyList
    httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    return {
        sut,
        httpGetClientSpy
    }
}

describe('RemoteLoadSurveyList', () => {
    test('Should call HttpGetClient with correct url', async () => {
        const url = faker.internet.url()
        const { sut, httpGetClientSpy } = makeSut(url)
        await sut.loadAll()
        expect(httpGetClientSpy.url).toBe(url)
    })
    test('Should throw UnexpectedError HttpClient returns 403', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.loadAll()
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
})
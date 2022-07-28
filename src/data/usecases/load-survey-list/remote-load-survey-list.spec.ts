import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
    sut: RemoteLoadSurveyList
    httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>()
    const sut = new RemoteLoadSurveyList(url, httpClientSpy)
    return {
        sut,
        httpClientSpy
    }
}

describe('RemoteLoadSurveyList', () => {
    test('Should call HttpGetClient with correct url and method', async () => {
        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        await sut.loadAll()
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('get')
    })
    test('Should throw UnexpectedError HttpClient returns 403', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new AccessDeniedError())
    })
    test('Should throw UnexpectedError HttpClient returns 404', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw UnexpectedError HttpClient returns 500', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should return a list of SurveyModels if HttpGetClient returns 200', async () => {
        const { sut, httpClientSpy } = makeSut()
        const httpResult = mockRemoteSurveyListModel(3)
        httpClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual(httpResult)
    })
    test('Should return an empty list if HttpGetClient returns 204', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.noContent,
            body: []
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual([])
    })
})
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type SutTypes = {
    sut: RemoteLoadSurveyList
    httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
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
        await expect(promise).rejects.toThrow(new AccessDeniedError())
    })
    test('Should throw UnexpectedError HttpClient returns 404', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw UnexpectedError HttpClient returns 500', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.loadAll()
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should return a list of SurveyModels if HttpGetClient returns 200', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        const httpResult = mockRemoteSurveyListModel(3)
        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual(httpResult)
    })
    test('Should return an empty list if HttpGetClient returns 204', async () => {
        const { sut, httpGetClientSpy } = makeSut()
        httpGetClientSpy.response = {
            statusCode: HttpStatusCode.noContent,
            body: []
        }
        const surveyList = await sut.loadAll()
        expect(surveyList).toEqual([])
    })
})
import { HttpClientSpy } from "@/data/test"
import { RemoteAuthentication } from "./remote-authentication"
import { mockAuthenticationModel, mockAuthentication } from "@/domain/test"
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors"
import { HttpStatusCode } from "@/data/protocols/http"
import { AccountModel } from "@/domain/models/account-model"
import faker from 'faker'

type SutType = {
  httpClientSpy: HttpClientSpy<AccountModel>
  sut: RemoteAuthentication
}

const makeSut = (url: string = faker.internet.url()): SutType => {
  const httpClientSpy = new HttpClientSpy<AccountModel>()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {

    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const authenticationparams = mockAuthentication()
    await sut.auth(authenticationparams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(authenticationparams)

  })
  test('Should throw invalid credentials if HttpClient returns 401 (unauthorized)', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw unexpected error if HttpPostClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw unexpected error if HttpPostClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw unexpected error if HttpPostClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return AccountModel if HttpPostClient returns 200 (OK!)', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAuthenticationModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})

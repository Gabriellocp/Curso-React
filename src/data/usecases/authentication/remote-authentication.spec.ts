import { HttpPostClientSpy } from "@/data/test"
import { RemoteAuthentication } from "./remote-authentication"
import { mockAccountModel, mockAuthentication } from "@/domain/test"
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors"
import { HttpStatusCode } from "@/data/protocols/http"
import { AccountModel } from "@/domain/models/account-model"
import faker from 'faker'

type SutType = {
  httpPostClientSpy: HttpPostClientSpy<AccountModel>
  sut: RemoteAuthentication
}

const makeSut = (url: string = faker.internet.url()): SutType => {
  const httpPostClientSpy = new HttpPostClientSpy<AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {

    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test('Should call HttpClient with correct body', async () => {
    const authenticationparams = mockAuthentication()
    const { sut, httpPostClientSpy } = makeSut()
    await sut.auth(authenticationparams)
    expect(httpPostClientSpy.body).toEqual(authenticationparams)
  })
  test('Should throw invalid credentials if HttpClient returns 401 (unauthorized)', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw unexpected error if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw unexpected error if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw unexpected error if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return AccountModel if HttpPostClient returns 200 (OK!)', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})

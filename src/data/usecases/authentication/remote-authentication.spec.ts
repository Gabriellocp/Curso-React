import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import faker from 'faker'
import { mockAuthentication } from "../../../domain/test/mock-authentication";
type SutType = {
    httpPostClientSpy : HttpPostClientSpy
    sut : RemoteAuthentication
}

const makeSut = (url: string = faker.internet.url()): SutType => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}


describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {

    const url = faker.internet.url()
    const {sut, httpPostClientSpy} = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  });
  test('Should call HttpClient with correct URL', async () => {
    const authenticationparams = mockAuthentication()
    const {sut, httpPostClientSpy} = makeSut()
    await sut.auth(authenticationparams)
    expect(httpPostClientSpy.body).toEqual(authenticationparams)
  });
  
});

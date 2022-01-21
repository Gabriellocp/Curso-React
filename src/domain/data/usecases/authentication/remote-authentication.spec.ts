import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";

type SutType = {
    httpPostClientSpy : HttpPostClientSpy
    sut : RemoteAuthentication
}

const makeSut = (url: string = 'any_url'): SutType => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}


describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {

    const url = 'other_url'
    const {sut, httpPostClientSpy} = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  });
  
});

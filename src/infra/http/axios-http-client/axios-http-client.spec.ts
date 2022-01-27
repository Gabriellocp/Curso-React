import { AxiosHttpClient } from "./axios-http-client";
import faker, { fake } from 'faker'
import { HttpPostParams } from "@/data/protocols/http";
import { mockAxios} from "@/infra/test";
import axios from 'axios'
import { mockPostRequest } from "@/data/test";
jest.mock('axios')


type SutTypes = {
    sut: AxiosHttpClient,
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
   const sut = new AxiosHttpClient()
   const mockedAxios = mockAxios()
   return {sut, mockedAxios}
}


describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values', async () => {
    const request = mockPostRequest()
    const {sut, mockedAxios} = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('Should return the correct StatusCode and Body', async () => {
    
    const {sut, mockedAxios} = makeSut()
    const promise = sut.post(mockPostRequest())
    // mockedAxios.post.mock.results get all results (rejecteds and resolveds)
    // Index 0 gets all resolved values
    // In this case, it'll return the value mockedResults from "mockAxios()" method
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
});

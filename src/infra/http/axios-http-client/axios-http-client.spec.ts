import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"
import { mockAxios, mockHttpResponse } from "@/infra/test"
import axios from 'axios'
import { mockHttpRequest } from "@/data/test"
jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  describe('Testing methods', () => {
    test('Should call Axios with correct values', async () => {
      const request = mockHttpRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.request(request)
      expect(mockedAxios.request).toHaveBeenCalledWith({url:request.url, data:request.body, method:request.method, headers:request.headers})
    })
    test('Should return the correct StatusCode and Body', async () => {

      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.request(mockHttpRequest())
      const axiosResponse = await mockedAxios.request.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })
    test('Should return the correct StatusCode and Body on failure', async () => {


      const { sut, mockedAxios } = makeSut()
      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.request(mockHttpRequest())
      expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
  })
  
})

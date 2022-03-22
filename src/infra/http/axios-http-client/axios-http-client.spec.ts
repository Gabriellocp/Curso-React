import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client"
import { mockAxios, mockHttpResponse } from "@/infra/test"
import axios from 'axios'
import { mockGetRequest, mockPostRequest } from "@/data/test"
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
  describe('Testing POST method', () => {
    test('Should call Axios POST with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })
    test('Should return the correct StatusCode and Body on POST', async () => {

      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
    test('Should return the correct StatusCode and Body on failure on POST', async () => {

      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
  describe('Testing GET', () => {
    test('Should call Axios GET with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })
  })
})

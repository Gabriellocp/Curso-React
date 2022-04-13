import { HttpGetClient, HttpGetParams, HttpResponse, HttpStatusCode } from "../protocols/http"
import faker from 'faker'
export const mockGetRequest = (): HttpGetParams => ({
    url: faker.internet.url(),
    headers: faker.random.objectElement()
})
export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
    url: string
    headers?: any
    response: HttpResponse<R> = {
        statusCode: HttpStatusCode.ok
    }
    async get(params: HttpGetParams): Promise<HttpResponse<R>> {
        this.url = params.url
        this.headers = params.headers
        return this.response
    }
}
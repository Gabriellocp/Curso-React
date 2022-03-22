import { HttpGetClient, HttpGetParams, HttpResponse, HttpStatusCode } from "../protocols/http"
import faker from 'faker'
export const mockGetRequest = (): HttpGetParams => ({
    url: faker.internet.url(),
})
export class HttpGetClientSpy<R> implements HttpGetClient<R> {
    url: string
    response: HttpResponse<R> = {
        statusCode: HttpStatusCode.ok
    }
    async get(params: HttpGetParams): Promise<HttpResponse<R>> {
        this.url = params.url
        return this.response
    }
}
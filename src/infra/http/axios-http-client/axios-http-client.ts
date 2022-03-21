import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http"
import axios from "axios"

export class AxiosHttpClient implements HttpPostClient {

    async post(params: HttpPostParams): Promise<HttpResponse> {
        try {
            const httpResponse = await axios.post(params.url, params.body)
            return {
                statusCode: httpResponse.status,
                body: httpResponse.data
            }
        } catch (error) {
            return {
                statusCode: error.response.status,
                body: error.response.data
            }
        }
    }
}

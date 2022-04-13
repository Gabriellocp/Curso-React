import { GetStorage } from "@/data/protocols/cache";
import { HttpGetClient, HttpGetParams, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpClientDecorator implements HttpGetClient {
    constructor(
        private readonly getStorage: GetStorage,
        readonly httpGetClient: HttpGetClient
    ) { }
    async get(params: HttpGetParams): Promise<HttpResponse> {
        this.getStorage.get('account')
        await this.httpGetClient.get(params)
        return null
    }
} 
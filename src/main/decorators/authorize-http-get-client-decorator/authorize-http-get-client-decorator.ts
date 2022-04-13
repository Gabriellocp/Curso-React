import { GetStorage } from "@/data/protocols/cache";
import { HttpGetClient, HttpGetParams, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpClientDecorator implements HttpGetClient {
    constructor(private readonly getStorage: GetStorage) { }
    async get(params: HttpGetParams): Promise<HttpResponse> {
        this.getStorage.get('account')
        return null
    }
}
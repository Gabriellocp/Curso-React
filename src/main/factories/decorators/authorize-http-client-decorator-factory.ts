import { HttpClient } from "@/data/protocols/http";
import { AuthorizeHttpClientDecorator } from "@/main/decorators";
import { makeLocalStorageAdapter } from "../cache/local-storage-adapter-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
    return new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
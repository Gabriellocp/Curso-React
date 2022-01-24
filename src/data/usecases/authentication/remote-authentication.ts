import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { HttpPostClient } from "../../protocols/http/http-post-client";

export class RemoteAuthentication{
    constructor (
        private readonly url: string,
        private readonly httpClient:HttpPostClient
        ){}

    async auth (params:AuthenticationParams) : Promise<void>{
       const httpResponse =  await this.httpClient.post({url:this.url, body: params})
       switch (httpResponse.statusCode){
           case HttpStatusCode.unauthorized:
               throw new InvalidCredentialsError()
       }
    }
}
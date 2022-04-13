import { AccountModel } from '@/domain/models'


export interface Authentication {
    auth(params: Authentication.Params): Promise<AccountModel>
}

export namespace Authentication {
    export type Params = {
        email: string
        password: string

    }
    export type Model = AccountModel
}
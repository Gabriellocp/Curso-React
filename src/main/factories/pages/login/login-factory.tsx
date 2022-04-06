import React from "react"
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory"
import { makeLoginValidators } from "./validators-login-factory"
import { makeLocalUpdateCurrentAccount } from "@/main/factories/usecases/save-access-token/local-update-current-account-factory"
export const makeLogin: React.FC = () => {

    return (

        <Login
            authentication={makeRemoteAuthentication()}
            validation={makeLoginValidators()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    )
}

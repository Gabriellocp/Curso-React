import React from "react";
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLoginValidators } from "./validators-login-factory";
export const makeLogin: React.FC = () => {

    return (

        <Login
            authentication={makeRemoteAuthentication()}
            validation={makeLoginValidators()}
        />
    )
} 
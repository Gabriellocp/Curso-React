import React from "react"
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/save-access-token/local-save-access-token-factory"
import Signup from "@/presentation/pages/signup/signup"
import { makeSignUpValidators } from "./validators-signup-factory"
import { makeRemoteAddAccount } from "../../usecases/add-account/remote-add-account"
export const makeSignUp: React.FC = () => {

    return (

        <Signup
            addAccount={makeRemoteAddAccount()}
            validation={makeSignUpValidators()}
            saveAccessToken={makeLocalSaveAccessToken()}
        />
    )
}

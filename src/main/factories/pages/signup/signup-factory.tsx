import React from "react"
import { makeLocalUpdateCurrentAccount } from "@/main/factories/usecases/save-access-token/local-update-current-account-factory"
import Signup from "@/presentation/pages/signup/signup"
import { makeSignUpValidators } from "./validators-signup-factory"
import { makeRemoteAddAccount } from "../../usecases/add-account/remote-add-account"
export const makeSignUp: React.FC = () => {

    return (

        <Signup
            addAccount={makeRemoteAddAccount()}
            validation={makeSignUpValidators()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    )
}

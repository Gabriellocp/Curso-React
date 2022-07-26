import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from "@/presentation/contexts"
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from "../adapters/current-account-adapter"
import { PrivateRoute } from "@/presentation/components"
import { makeSurveyList } from "../factories/pages/survey-list/survey-list-factory"
import { makeSurveyResult } from "../factories/pages/survey-result/survey-result-factory"
// type Factory = {
//     makeLogin: React.FC
//     makeSignup: React.FC
// }


const Router: React.FC = () => {
    return (
        <ApiContext.Provider
            value={{
                setCurrentAccount: setCurrentAccountAdapter,
                getCurrentAccount: getCurrentAccountAdapter

            }}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' exact component={makeLogin} />
                    <Route path='/signup' exact component={makeSignUp} />
                    <PrivateRoute path='/' exact component={makeSurveyList} />
                    <PrivateRoute path='/surveys/:id' exact component={makeSurveyResult} />
                    
                </Switch>

            </BrowserRouter>
        </ApiContext.Provider>
    )
}

export default Router

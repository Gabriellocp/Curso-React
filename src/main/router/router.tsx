import { SurveyList } from "@/presentation/pages"
import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
// type Factory = {
//     makeLogin: React.FC
//     makeSignup: React.FC
// }
const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={makeLogin} />
                <Route path='/signup' exact component={makeSignUp} />
                <Route path='/' exact component={SurveyList} />

            </Switch>

        </BrowserRouter>
    )
}

export default Router
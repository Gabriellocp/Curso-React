import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
    const [state] = useState({
        isLoading: false,


    })
    const [errorState] = useState({
        main: '',
        email: 'Campo obrigatório',
        password: 'Campo obrigatório'
    })

    return (
        <div className={Styles.login}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state, errorState }}>
                <form className={Styles.form}>
                    <h2> Login </h2>
                    <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                    <Input type="password" name="password" placeholder='Digite sua senha'></Input>
                    <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Criar conta</span>
                    <FormStatus></FormStatus>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Login
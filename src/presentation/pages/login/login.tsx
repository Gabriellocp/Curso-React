import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
    validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        mainError: '',
        emailError: '',
        passwordError: 'Campo obrigatório'


    })

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email)
        })
        console.log(` Teste ${state.emailError}`)
    }, [state.email])
    useEffect(() => {
        validation.validate('password', state.password)
    }, [state.password])

    return (
        <div className={Styles.login}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state, setState }}>
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
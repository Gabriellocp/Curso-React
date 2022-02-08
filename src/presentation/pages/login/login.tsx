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
        passwordError: ''


    })

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email)
        })
    }, [state.email])
    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            passwordError: validation.validate('password', state.password),
        }));
    }, [state.password, validation]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        setState({ ...state, isLoading: true })
    }

    return (
        <div className={Styles.login}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state, setState }}>
                <form className={Styles.form} onSubmit={handleSubmit}>
                    <h2> Login </h2>
                    <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                    <Input type="password" name="password" placeholder='Digite sua senha'></Input>
                    <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Criar conta</span>
                    <FormStatus ></FormStatus>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Login
import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, UpdateCurrentAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import SubmitButton from '@/presentation/components/submit-button/submit-button'

type Props = {
    validation: Validation
    authentication: Authentication
    updateCurrentAccount: UpdateCurrentAccount
}

const Login: React.FC<Props> = ({ validation, authentication, updateCurrentAccount }: Props) => {
    const history = useHistory()
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        email: '',
        password: '',
        mainError: '',
        emailError: '',
        passwordError: ''
    })

    useEffect(() => {
        const { email } = state
        const formData = { email }
        const emailError = validation.validate('email', formData)
        setState({
            ...state,
            emailError,
            isFormInvalid: !!emailError || !!state.passwordError

        })
    }, [state.email])
    useEffect(() => {
        const { password } = state
        const formData = { password }
        const passwordError = validation.validate('password', formData)
        setState(oldState => ({
            ...oldState,
            passwordError,
            isFormInvalid: !!state.emailError || !!passwordError
        }))
    }, [state.password, validation])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            setState({ ...state, isLoading: true })
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            })
            await updateCurrentAccount.save(account)
            history.replace('/')
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    return (
        <div className={Styles.login}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state, setState }}>
                <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
                    <h2> Login </h2>
                    <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                    <Input type="password" name="password" placeholder='Digite sua senha'></Input>
                    <SubmitButton text="Entrar"></SubmitButton>
                    <Link to="/signup" data-testid='register' className={Styles.link}>Criar conta</Link>
                    <FormStatus ></FormStatus>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Login

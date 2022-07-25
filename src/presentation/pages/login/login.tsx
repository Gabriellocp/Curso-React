import React, { useState, useEffect, useContext } from 'react'
import Styles from './login-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import SubmitButton from '@/presentation/components/submit-button/submit-button'

type Props = {
    validation: Validation
    authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
    const { setCurrentAccount } = useContext(ApiContext)
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

    useEffect(() => {validate('email')}, [state.email])
    useEffect(() => {validate('password')}, [state.password])

    const validate = (field: string): void =>{
        const { email,password } = state
        const formData = { email , password }
        setState(old=>({...old, [`${field}Error`]: validation.validate(field, formData)})
        )
        setState(old=>({...old, isFormInvalid: !!old.emailError || !!old.passwordError})
        )
    }
   

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            setState(old =>({ ...old, isLoading: true }))
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            })
            setCurrentAccount(account)
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

            <FormContext.Provider value={{ state, setState }}>
                <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
                    <h2> Login </h2>
                    <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                    <Input type="password" name="password" placeholder='Digite sua senha'></Input>
                    <SubmitButton text="Entrar"></SubmitButton>
                    <Link to="/signup" data-testid='register' className={Styles.link}>Criar conta</Link>
                    <FormStatus ></FormStatus>
                </form>
            </FormContext.Provider>

            <Footer />
        </div>
    )
}

export default Login

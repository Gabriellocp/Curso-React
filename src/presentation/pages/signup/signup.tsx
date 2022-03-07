import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import SubmitButton from '@/presentation/components/submit-button/submit-button'
type Props = {
    validation: Validation
    addAccount: AddAccount
    saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }) => {
    const history = useHistory()
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        mainError: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        emailError: '',
        passwordError: '',
        passwordConfirmationError: '',
        nameError: ''
    })

    useEffect(() => {
        const nameError = validation.validate('name', state.name)
        const emailError = validation.validate('email', state.email)
        const passwordError = validation.validate('password', state.password)
        const passwordConfirmationError = validation.validate('passwordConfirmation', state.password)

        setState({
            ...state,
            nameError,
            emailError,
            passwordError,
            passwordConfirmationError,
            isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
        })
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            setState({ ...state, isLoading: true })
            const account = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmation: state.passwordConfirmation
            })
            await saveAccessToken.save(account.accessToken)
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
        <div className={Styles.signup}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state, setState }}>
                <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
                    <h2> Signup </h2>
                    <Input type="text" name="name" placeholder='Digite seu nome'></Input>
                    <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                    <Input type="password" name="password" placeholder='Digite sua senha'></Input>
                    <Input type="password" name="passwordConfirmation" placeholder='Confirme sua senha'></Input>
                    <SubmitButton text="Cadastrar"></SubmitButton>
                    <Link data-testid="login" replace to="/login" className={Styles.link}>Voltar para Login</Link>
                    <FormStatus ></FormStatus>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Signup

import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
type Props = {
    validation: Validation
    addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }) => {

    const [state, setState] = useState({
        isLoading: false,
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
        setState({
            ...state,
            nameError: validation.validate('name', state.name),
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password),
            passwordConfirmationError: validation.validate('passwordConfirmation', state.password)
        })
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        if (state.isLoading) {
            return
        }
        setState({ ...state, isLoading: true })
        await addAccount.add({
            name: state.name,
            email: state.email,
            password: state.password,
            passwordConfirmation: state.passwordConfirmation
        })
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
                    <Input type="passwordConfirmation" name="passwordConfirmation" placeholder='Confirme sua senha'></Input>
                    <button data-testid="submit" disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Voltar para Login</span>
                    <FormStatus ></FormStatus>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Signup

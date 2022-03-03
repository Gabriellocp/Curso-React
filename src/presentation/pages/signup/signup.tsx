import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
type Props = {
    validation: Validation
}

const Signup: React.FC<Props> = ({ validation }) => {

    const [state, setState] = useState({
        isLoading: false,
        mainError: '',
        name: '',
        email: '',
        emailError: '',
        passwordError: 'Campo obrigatório',
        passwordConfirmationError: 'Campo obrigatório',
        nameError: ''
    })

    useEffect(() => {
        setState({
            ...state,
            nameError: validation.validate('name', state.name),
            emailError: validation.validate('email', state.email)
        })
    }, [state.name, state.email])

    return (
        <div className={Styles.signup}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state, setState }}>
                <form data-testid='form' className={Styles.form} >
                    <h2> Signup </h2>
                    <Input type="text" name="name" placeholder='Digite seu nome'></Input>
                    <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                    <Input type="password" name="password" placeholder='Digite sua senha'></Input>
                    <Input type="passwordConfirmation" name="passwordConfirmation" placeholder='Confirme sua senha'></Input>
                    <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Voltar para Login</span>
                    <FormStatus ></FormStatus>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Signup

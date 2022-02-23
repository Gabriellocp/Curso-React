import React, { useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const Signup: React.FC = () => {
    const [state] = useState({
        isLoading: false,
        mainError: '',
        emailError: 'Campo obrigatório',
        passwordError: 'Campo obrigatório',
        passwordConfirmationError: 'Campo obrigatório',
        nameError: 'Campo obrigatório'
    })

    return (
        <div className={Styles.signup}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state }}>
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

import React from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Link } from 'react-router-dom'

const Signup: React.FC = () => {

    return (
        <div className={Styles.login}>
            <LoginHeader></LoginHeader>

            <Context.Provider value={{ state: {} }}>
                <form data-testid='form' className={Styles.form} >
                    <h2> Signup </h2>
                    <Input type="text" name="email" placeholder='Digite seu nome'></Input>
                    <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                    <Input type="password" name="email" placeholder='Digite sua senha'></Input>
                    <Input type="password" name="password" placeholder='Confirme sua senha'></Input>
                    <button className={Styles.submit} type="submit">Entrar</button>
                    <Link to="/login" className={Styles.link}>Voltar para Login</Link>
                    <FormStatus ></FormStatus>
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Signup

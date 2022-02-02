import React from 'react'
import Styles from './login-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
const Login: React.FC = () => {

    return (
        <div className={Styles.login}>
            <LoginHeader></LoginHeader>
            <form className={Styles.form}>
                <h2> Login </h2>
                <Input type="email" name="email" placeholder='Digite seu e-mail'></Input>
                <Input type="password" name="senha" placeholder='Digite sua senha'></Input>
                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>
                <FormStatus></FormStatus>
            </form>
            <Footer />
        </div>
    )
}

export default Login
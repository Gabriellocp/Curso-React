import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/form-status/form-label'

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
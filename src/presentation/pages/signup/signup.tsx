import React, { useContext, useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import SubmitButton from '@/presentation/components/submit-button/submit-button'
import { ApiContext } from '@/presentation/contexts'
type Props = {
    validation: Validation
    addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }) => {
    const { setCurrentAccount } = useContext(ApiContext)
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

    // useEffect(() => {
    //     const { name, email, password, passwordConfirmation } = state
    //     const formData = { name, email, password, passwordConfirmation }
    //     const nameError = validation.validate('name', formData)
    //     const emailError = validation.validate('email', formData)
    //     const passwordError = validation.validate('password', formData)
    //     const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    //     setState({
    //         ...state,
    //         nameError,
    //         emailError,
    //         passwordError,
    //         passwordConfirmationError,
    //         isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    //     })
    // }, [state.name, state.email, state.password, state.passwordConfirmation])
    useEffect(()=>{validate('name')},[state.name])
    useEffect(()=>{validate('email')},[state.email])
    useEffect(()=>{validate('password')},[state.password])
    useEffect(()=>{validate('passwordConfirmation')},[state.passwordConfirmation])

    const validate = (field: string): void =>{
        const { name, email, password, passwordConfirmation } = state
        const formData = { name, email, password, passwordConfirmation }
        setState(old=>({...old, [`${field}Error`]: validation.validate(field, formData)})
        )
        setState(old=>({...old, isFormInvalid: !!old.emailError || !!old.passwordError || !!old.nameError || !!old.passwordConfirmationError})
        )
    }
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
            await setCurrentAccount(account)
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

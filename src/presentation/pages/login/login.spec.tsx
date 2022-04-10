import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, waitFor, screen } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationSpy, AuthenticationSpy, Helper } from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'
type SutTypes = {
    validationSpy: ValidationSpy
    authenticationSpy: AuthenticationSpy
    setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    const authenticationSpy = new AuthenticationSpy()
    const setCurrentAccountMock = jest.fn()
    validationSpy.errorMessage = params?.validationError
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
            <Router history={history}>
                <Login
                    validation={validationSpy}
                    authentication={authenticationSpy}
                ></Login>
            </Router>
        </ApiContext.Provider>
    )
    return {
        validationSpy,
        authenticationSpy,
        setCurrentAccountMock
    }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {

    Helper.populateField('email', email)
    populatePassField(password)
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

const populatePassField = (password = faker.internet.password()): void => {
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

}

describe('Login Component', () => {

    test('Should start with initial components disabled', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
        expect(screen.getByTestId('submit')).toBeDisabled()
        Helper.testStatusForFields('email', validationError)
        Helper.testStatusForFields('password', validationError)

    })

    test('Should call Validation with correct value', () => {
        const email = faker.internet.email()
        const { validationSpy } = makeSut()
        Helper.populateField('email', email)
        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe(email)

    })

    test('Should call Validation with correct password', () => {
        const password = faker.internet.password()
        const { validationSpy } = makeSut()
        validationSpy.errorMessage = faker.random.words()
        populatePassField(password)
        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe(password)

    })
    test('Should show email error if validation fails', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        Helper.populateField('email')
        Helper.testStatusForFields('email', validationError)
    })

    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        makeSut({ validationError })
        const passwordInput = screen.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        Helper.testStatusForFields('password', validationError)
    })

    test('Should show valid email state if Validation succeeds', () => {
        makeSut()
        Helper.populateField('email')
        Helper.testStatusForFields('email')
    })
    test('Should show valid password state if Validation succeeds', () => {
        makeSut()
        populatePassField()
        Helper.testStatusForFields('password')
    })
    test('Should enable submit button if form is valid', () => {
        makeSut()

        Helper.populateField('email')
        Helper.populateField('password')
        expect(screen.getByTestId('submit')).toBeEnabled()
    })
    test('Should show loading spinner on submit', async () => {
        makeSut()
        await simulateValidSubmit()
        expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    })

    test('Should call Authentication with correct values', async () => {
        const { authenticationSpy } = makeSut()
        const password = faker.internet.password()
        const email = faker.internet.email()
        await simulateValidSubmit(email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })

    test('Should call Authentication only once', async () => {
        const { authenticationSpy } = makeSut()
        await simulateValidSubmit()
        await simulateValidSubmit()
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('Should not call Authentication if form is invalid', () => {
        const validationError = faker.random.words()
        const { authenticationSpy } = makeSut({ validationError })
        Helper.populateField('email')
        fireEvent.submit(screen.getByTestId('form'))
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if Authentication fails', async () => {
        const { authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit()
        expect(screen.getByTestId('mainError')).toHaveTextContent(error.message)
        expect(screen.getByTestId('error-wrap').children).toHaveLength(1)


    })
    test('Should call UpdateCurrentAccount on success', async () => {
        const { authenticationSpy, setCurrentAccountMock } = makeSut()
        await simulateValidSubmit()
        expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })



    test('Should go to signup page', () => {
        makeSut()
        const register = screen.getByTestId('register')
        fireEvent.click(register)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })

})

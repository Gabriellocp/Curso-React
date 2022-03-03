import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationSpy, AuthenticationSpy, SaveAccessTokenMock, Helper } from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'
type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
    authenticationSpy: AuthenticationSpy
    saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    const authenticationSpy = new AuthenticationSpy()
    const saveAccessTokenMock = new SaveAccessTokenMock()
    validationSpy.errorMessage = params?.validationError
    const sut = render(
        <Router history={history}>
            <Login
                validation={validationSpy}
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
            ></Login>
        </Router>
    )
    return {
        sut,
        validationSpy,
        authenticationSpy,
        saveAccessTokenMock
    }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {

    Helper.populateField(sut, 'email', email)
    populatePassField(sut, password)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

const populatePassField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

}

const testElementText = (sut: RenderResult, name: string, text: string): void => {
    const el = sut.getByTestId(name)
    expect(el.textContent).toBe(text)
}

describe('Login Component', () => {
    afterEach(cleanup)

    test('Should start with initial components disabled', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.testChildCount(sut, 'error-wrap', 0)
        Helper.testButtonIsDisabled(sut, 'submit', true)
        Helper.testStatusForFields(sut, 'email', validationError)
        Helper.testStatusForFields(sut, 'password', validationError)

    })

    test('Should call Validation with correct value', () => {
        const email = faker.internet.email()
        const { sut, validationSpy } = makeSut()
        Helper.populateField(sut, 'email', email)
        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe(email)

    })

    test('Should call Validation with correct password', () => {
        const password = faker.internet.password()
        const { sut, validationSpy } = makeSut()
        validationSpy.errorMessage = faker.random.words()
        populatePassField(sut, password)
        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe(password)

    })
    test('Should show email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        Helper.populateField(sut, 'email')
        Helper.testStatusForFields(sut, 'email', validationError)
    })

    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        Helper.testStatusForFields(sut, 'password', validationError)
    })

    test('Should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()
        Helper.populateField(sut, 'email')
        Helper.testStatusForFields(sut, 'email')
    })
    test('Should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()
        populatePassField(sut)
        Helper.testStatusForFields(sut, 'password')
    })
    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        Helper.populateField(sut, 'email')
        Helper.populateField(sut, 'password')
        Helper.testButtonIsDisabled(sut, 'submit', false)
    })
    test('Should show loading spinner on submit', async () => {
        const { sut } = makeSut()
        await simulateValidSubmit(sut)
        Helper.testElementExists(sut, 'spinner')
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut()
        const password = faker.internet.password()
        const email = faker.internet.email()
        await simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    })

    test('Should call Authentication only once', async () => {
        const { sut, authenticationSpy } = makeSut()
        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('Should not call Authentication if form is invalid', () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })
        Helper.populateField(sut, 'email')
        fireEvent.submit(sut.getByTestId('form'))
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if Authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit(sut)
        testElementText(sut, 'mainError', error.message)
        Helper.testChildCount(sut, 'error-wrap', 1)

    })
    test('Should call SaveAccessToken on success', async () => {
        const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

        await simulateValidSubmit(sut)
        expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    test('Should present error if SaveAccessToken fails', async () => {
        const { sut, saveAccessTokenMock } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit(sut)
        testElementText(sut, 'mainError', error.message)
        Helper.testChildCount(sut, 'error-wrap', 1)

    })

    test('Should go to signup page', () => {
        const { sut } = makeSut()
        const register = sut.getByTestId('register')
        fireEvent.click(register)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })

})

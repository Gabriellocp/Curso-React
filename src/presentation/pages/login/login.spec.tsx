import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationSpy, AuthenticationSpy, SaveAccessTokenMock } from '@/presentation/test'
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

    populateEmailField(sut, email)
    populatePassField(sut, password)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

}

const populatePassField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

}

const testStatusForFields = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const statusField = sut.getByTestId(`${fieldName}Status`)
    expect(statusField.title).toBe(validationError || 'Tudo certo')
    expect(statusField.textContent).toBe(validationError ? '😭' : '😎')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, name: string): void => {
    const el = sut.getByTestId(name)
    expect(el).toBeTruthy()
}

const testElementText = (sut: RenderResult, name: string, text: string): void => {
    const el = sut.getByTestId(name)
    expect(el.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, name: string, isDisabled: boolean): void => {
    const el = sut.getByTestId(name) as HTMLButtonElement
    expect(el.disabled).toBe(isDisabled)
}

describe('Login Component', () => {
    afterEach(cleanup)

    test('Should start with initial components disabled', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        testErrorWrapChildCount(sut, 0)
        testButtonIsDisabled(sut, 'submit', true)
        testStatusForFields(sut, 'email', validationError)
        testStatusForFields(sut, 'password', validationError)

    })

    test('Should call Validation with correct value', () => {
        const email = faker.internet.email()
        const { sut, validationSpy } = makeSut()
        populateEmailField(sut, email)
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
        populateEmailField(sut)
        testStatusForFields(sut, 'email', validationError)
    })

    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        testStatusForFields(sut, 'password', validationError)
    })

    test('Should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        testStatusForFields(sut, 'email')
    })
    test('Should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()
        populatePassField(sut)
        testStatusForFields(sut, 'password')
    })
    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        populateEmailField(sut)
        populatePassField(sut)
        testButtonIsDisabled(sut, 'submit', false)
    })
    test('Should show loading spinner on submit', async () => {
        const { sut } = makeSut()
        await simulateValidSubmit(sut)
        testElementExists(sut, 'spinner')
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
        populateEmailField(sut)
        fireEvent.submit(sut.getByTestId('form'))
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if Authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        await simulateValidSubmit(sut)
        testElementText(sut, 'mainError', error.message)
        testErrorWrapChildCount(sut, 1)

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
        testErrorWrapChildCount(sut, 1)

    })

    test('Should go to signup page', () => {
        const { sut } = makeSut()
        const register = sut.getByTestId('register')
        fireEvent.click(register)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })

})

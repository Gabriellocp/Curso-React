import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'
import faker from 'faker'
type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}


const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    const authenticationSpy = new AuthenticationSpy()
    // validationSpy.errorMessage = faker.random.words()
    validationSpy.errorMessage = params?.validationError
    const sut = render(<Login validation={validationSpy} authentication={authenticationSpy}></Login>)
    return {
        sut,
        validationSpy,
        authenticationSpy
    }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {


    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    populateEmailField(sut, email)
    populatePassField(sut, password)
    fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

}

const populatePassField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

}

const simulateStatusForFields = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const statusField = sut.getByTestId(`${fieldName}Status`)
    expect(statusField.title).toBe(validationError || 'Tudo certo')
    expect(statusField.textContent).toBe(validationError ? '😭' : '😎')
}


describe('Login Component', () => {
    afterEach(cleanup)
    test('Should start with initial components disabled', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const button = sut.getByTestId('submit') as HTMLButtonElement
        expect(button.disabled).toBe(true)
        simulateStatusForFields(sut, 'email', validationError)
        simulateStatusForFields(sut, 'password', validationError)

    });
    test('Should call Validation with correct value', () => {
        const validationError = faker.random.words()
        const email = faker.internet.email()
        const { sut, validationSpy } = makeSut()
        populateEmailField(sut, email)
        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe(email)

    });

    test('Should call Validation with correct password', () => {
        const password = faker.internet.password()
        const { sut, validationSpy } = makeSut()
        validationSpy.errorMessage = faker.random.words()
        populatePassField(sut, password)
        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe(password)

    });
    test('Should show email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        simulateStatusForFields(sut, 'email', validationError)
    });

    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        simulateStatusForFields(sut, 'password', validationError)
    });

    test('Should show valid email state if Validation succeeds', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut()
        populateEmailField(sut)
        simulateStatusForFields(sut, 'email')
    });
    test('Should show valid password state if Validation succeeds', () => {
        const { sut, } = makeSut()
        populatePassField(sut)
        simulateStatusForFields(sut, 'password')
    });
    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        populateEmailField(sut)
        populatePassField(sut)
        expect(submitButton.disabled).toBe(false)
    });
    test('Should show loading spinner on submit', () => {
        const { sut } = makeSut()
        simulateValidSubmit(sut)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    });

    test('Should call Authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const password = faker.internet.password()
        const email = faker.internet.email()
        simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        })
    });

});


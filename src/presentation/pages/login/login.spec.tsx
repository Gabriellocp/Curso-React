import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'
type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

type SutParams = {
    validationError: string
}


const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    // validationSpy.errorMessage = faker.random.words()
    validationSpy.errorMessage = params?.validationError
    const sut = render(<Login validation={validationSpy}></Login>)
    return {
        sut,
        validationSpy
    }
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
        const emailStatus = sut.getByTestId('emailStatus')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('😭')
        const passwordStatus = sut.getByTestId('passwordStatus')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('😭')

    });
    test('Should call Validation with correct value', () => {
        const validationError = faker.random.words()
        const email = faker.internet.email()
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: email } })
        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe(email)

    });

    test('Should call Validation with correct password', () => {
        const password = faker.internet.password()
        const { sut, validationSpy } = makeSut()
        validationSpy.errorMessage = faker.random.words()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: password } })
        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe(password)

    });
    test('Should show email error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('emailStatus')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('😭')
    });

    test('Should show password error if validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('passwordStatus')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('😭')
    });

    test('Should show valid email state if Validation succeeds', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        const emailStatus = sut.getByTestId('emailStatus')
        expect(emailStatus.title).toBe('Tudo certo')
        expect(emailStatus.textContent).toBe('😎')
    });
    test('Should show valid password state if Validation succeeds', () => {
        const { sut, } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        const passwordStatus = sut.getByTestId('passwordStatus')
        expect(passwordStatus.title).toBe('Tudo certo')
        expect(passwordStatus.textContent).toBe('😎')
    });
    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        const passwordInput = sut.getByTestId('password')
        const emailInput = sut.getByTestId('email')
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
        expect(submitButton.disabled).toBe(false)
    });

});


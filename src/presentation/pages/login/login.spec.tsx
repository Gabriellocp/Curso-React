import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
    errorMessage: string
    fieldName: string
    fieldValue: string
    validate(fieldName: string, fieldValue: string): string {
        this.fieldName = fieldName
        this.fieldValue = fieldValue
        return this.errorMessage
    }
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy}></Login>)
    return {
        sut,
        validationSpy
    }
}
describe('Login Component', () => {
    afterEach(cleanup)
    test('Should start with initial components disabled', () => {
        const { sut } = makeSut()
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const button = sut.getByTestId('submit') as HTMLButtonElement
        expect(button.disabled).toBe(true)
        const emailStatus = sut.getByTestId('emailStatus')
        expect(emailStatus.title).toBe('Campo obrigatório')
        expect(emailStatus.textContent).toBe('👌')
        const passwordStatus = sut.getByTestId('passwordStatus')
        expect(passwordStatus.title).toBe('Campo obrigatório')
        expect(passwordStatus.textContent).toBe('👌')

    });
    test('Should call Validation with correct value', () => {
        const { sut, validationSpy } = makeSut()
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe('any_email')

    });

    test('Should call Validation with correct password', () => {
        const { sut, validationSpy } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, { target: { value: 'any_pass' } })
        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe('any_pass')

    });


});


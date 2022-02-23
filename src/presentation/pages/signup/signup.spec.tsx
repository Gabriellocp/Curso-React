import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import Signup from './signup'

type SutTypes = {
    sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(<Signup />)
    return { sut }
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
    const el = sut.getByTestId(fieldName)
    expect(el.childElementCount).toBe(count)
}
const testButtonIsDisabled = (sut: RenderResult, name: string, isDisabled: boolean): void => {
    const el = sut.getByTestId(name) as HTMLButtonElement
    expect(el.disabled).toBe(isDisabled)
}

const testStatusForFields = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const statusField = sut.getByTestId(`${fieldName}Status`)
    expect(statusField.title).toBe(validationError || 'Tudo certo')
    expect(statusField.textContent).toBe(validationError ? '😭' : '😎')
}
describe('Signup Component', () => {

    test('Should start with initial components disabled', () => {
        const validationError = 'Campo obrigatório'
        const { sut } = makeSut()
        testChildCount(sut, 'error-wrap', 0)
        testButtonIsDisabled(sut, 'submit', true)
        testStatusForFields(sut, 'name', validationError)
        testStatusForFields(sut, 'email', validationError)
        testStatusForFields(sut, 'password', validationError)
        testStatusForFields(sut, 'passwordConfirmation', validationError)

    })
})

import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
    sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(<Login></Login>)
    return {
        sut
    }
}
describe('Login Component', () => {
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

});


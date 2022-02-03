import React from 'react'
import { getByTestId, render } from '@testing-library/react'
import Login from './login'
describe('Login Component', () => {
    test('Should start with initial components disabled', () => {
        const { getByTestId } = render(<Login></Login>)
        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const button = getByTestId('submit') as HTMLButtonElement
        expect(button.disabled).toBe(true)
        const emailStatus = getByTestId('emailStatus')
        expect(emailStatus.title).toBe('Campo obrigatório')
        expect(emailStatus.textContent).toBe('👌')
        const passwordStatus = getByTestId('passwordStatus')
        expect(passwordStatus.title).toBe('Campo obrigatório')
        expect(passwordStatus.textContent).toBe('👌')

    });

});


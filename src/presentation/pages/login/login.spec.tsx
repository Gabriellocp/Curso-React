import React from 'react'
import { getByTestId, render } from '@testing-library/react'
import Login from './login'
describe('Login Component', () => {
    test('Loading and error components can\'t be rendered at screen\'s creation', () => {
        const { getByTestId } = render(<Login></Login>)
        const errorWrap = getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
    });
    test('Enter button not rendered at screen\'s creation', () => {
        const { getByTestId } = render(<Login></Login>)
        const button = getByTestId('submit') as HTMLButtonElement
        expect(button.disabled).toBe(true)
    });

});


import React from "react"
import { render, RenderResult } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
    return render(
        <Context.Provider value={{ state: {} }}>
            <Input name='field'></Input>
        </Context.Provider>
    )
}

describe('Input Component', () => {
    test('Should begin with read only', () => {
        const sut = makeSut()
        const input = sut.getByTestId('field') as HTMLInputElement
        expect(input.readOnly).toBe(true)
    })
})